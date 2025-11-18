// Main page: [[User:SuperGrey/gadgets/VGTNTool]]

(function () {
    'use strict';

    const VGTNTool = {
        api: new mw.Api({userAgent: 'VGTNTool/1.0.2'}),  // MediaWiki API 實例
        editorContainerId: 'vgtn-editor',  // 標記當次 hook 是否完成載入的 pseudo 元素
        messageNoChanges: '無差異。',  // 無差異時顯示的訊息
        addedSections: [],  // 儲存新增的章節

        /**
         * 程式入口。
         */
        init: function () {
            if (mw.config.get('wgPageName') !== 'WikiProject:电子游戏/译名表') return;
            mw.loader.load('mediawiki.diff.styles');
            mw.loader.getScript('https://cdnjs.cloudflare.com/ajax/libs/jquery.tablesorter/2.32.0/js/jquery.tablesorter.min.js').then(() => {
                console.log("[VGTNTool] 小工具已載入。");

                // Add CSS stylesheet
                mw.util.addCSS(`
                    .vgtn-section-removed {
                        color: var(--lt-color-text-very-light, #8f96a3) !important;
                        text-decoration: line-through;
                    }
                    .vgtn-section-removed .mw-editsection {
                        color: var(--color-base, #202122) !important;
                        display: inline-block;
                    }
                    .vgtn-record-label {
                        font-size: small;
                    }
                    .vgtn-editable-remove-row-bundle {
                        font-size: smaller;
                        white-space: nowrap;
                    }
                    .vgtn-editable-span {
                        padding-left: 0.2em;
                        padding-right: 0.2em;
                        border-bottom: 2px solid var(--lt-color-border-dark, #c2c9d6);
                    }
                    .vgtn-editable-span:focus {
                        border-bottom: none;
                    }
                    .vgtn-editable-code {
                        font-size: smaller;
                        white-space: nowrap;
                    }
                    [contenteditable="plaintext-only"]:empty:before{
                        content: attr(placeholder);
                        pointer-events: none;
                        color: var(--lt-color-text-very-light, #8f96a3);
                    }
                    .wikitable tbody tr th,
                    .wikitable tbody tr td:nth-last-child(1) {
                        max-width: 15em;
                    }
                    .vgtn-row-removed th .vgtn-editable-field:before {
                        content: "✘";
                        color: red;
                        font-size: larger;
                    }
                    .vgtn-table-footer {
                        font-size: smaller;
                    }
                    .tablesorter-headerUnSorted:not(.sorter-false) {
                        background-image: url(/w/resources/src/jquery.tablesorter.styles/images/sort_both.svg);
                        cursor: pointer;
                        background-repeat: no-repeat;
                        background-position: center right;
                        padding-right: 21px;
                    }
                    .tablesorter-headerAsc:not(.vgtn-table-footer) {
                        background-image: url(/w/resources/src/jquery.tablesorter.styles/images/sort_up.svg);
                        cursor: pointer;
                        background-repeat: no-repeat;
                        background-position: center right;
                        padding-right: 21px;
                    }
                    .tablesorter-headerDesc:not(.vgtn-table-footer) {
                        background-image: url(/w/resources/src/jquery.tablesorter.styles/images/sort_down.svg);
                        cursor: pointer;
                        background-repeat: no-repeat;
                        background-position: center right;
                        padding-right: 21px;
                    }
                    .mw-heading2.vgtn-sort-asc .mw-editsection::after {
                        content: url(/w/resources/src/jquery.tablesorter.styles/images/sort_up.svg);
                        display: inline-block;
                        width: 16px;
                        position: relative;
                        top: -.2em;
                    }
                    .mw-heading2.vgtn-sort-desc .mw-editsection::after {
                        content: url(/w/resources/src/jquery.tablesorter.styles/images/sort_down.svg);
                        display: inline-block;
                        width: 16px;
                        position: relative;
                        top: -.2em;
                    }
                    .vgtn-diff-dialog-diff {
                        padding: 10px;
                        overflow-x: auto;
                    }
                `);

                // Initialize diff dialog
                VGTNTool.initDiffDialog();

                // Add edit buttons to each section when the content is loaded
                mw.hook('wikipage.content').add($content => VGTNTool.addEditButtons($content));
            });
        },

        /**
         * 從 Module:Vgtn/data 獲取 JSON 格式的資料（expandtemplates）。
         * @returns {Promise<Object>} 返回解析後的 JSON 資料。
         */
        fetchModuleData: async function () {
            const res = await this.api.get({
                action: 'expandtemplates', text: '{{#invoke:Vgtn/data|toJSON}}', prop: 'wikitext', format: 'json'
            });
            try {
                return JSON.parse(res.expandtemplates.wikitext);
            } catch (e) {
                console.error("[VGTNTool] 解析 JSON 時出錯：", e);
                alert("無法載入資料，請稍後再試。");
                console.log("[VGTNTool]", res.expandtemplates.wikitext);
                throw e; // Re-throw error to force exit
            }
        },

        /**
         * 從 Module:Vgtn/data 獲取模組的完整文本。
         * @returns {Promise<Object>} 返回包含模組的起始時間戳、基礎時間戳和完整文本的物件。時間戳有助於處理編輯衝突。
         */
        fetchModuleText: async function () {
            const res = await this.api.get({
                action: 'query',
                titles: 'Module:Vgtn/data',
                curtimestamp: 1,
                prop: 'revisions',
                indexpageids: 1,
                rvprop: ['timestamp', 'content'],
                rvslots: 'main',
            });
            const rev = res.query.pages[res.query.pageids[0]].revisions[0];
            return {
                start: rev.curtimestamp, base: rev.timestamp, fulltext: rev.slots.main['*'],
            };
        },

        /**
         * 獲取差異視圖的 HTML。
         * @param {string} oldText - 舊文本。
         * @param {string} newText - 新文本。
         * @return {Promise<jQuery>} 返回包含差異視圖的 jQuery 物件。
         */
        fetchDiffHtml: async function (oldText, newText) {
            const res = await this.api.postWithToken('csrf', {
                action: 'compare',
                fromslots: 'main',
                'fromtext-main': oldText,
                fromtitle: 'Module:Vgtn/data',
                frompst: 'true',
                toslots: 'main',
                'totext-main': newText,
                totitle: 'Module:Vgtn/data',
                topst: 'true',
            });
            return res.compare['*'] ? $('<table>').addClass('diff').append($('<colgroup>').append($('<col>').addClass('diff-marker'), $('<col>').addClass('diff-content'), $('<col>').addClass('diff-marker'), $('<col>').addClass('diff-content'))).append(res.compare['*']) : this.messageNoChanges;
        },

        /**
         * 初始化差異對話框。
         * @returns {Promise<boolean>} 返回是否成功初始化差異對話框。
         */
        saveModuleText: async function () {
            const res = await this.api.postWithToken('csrf', {
                action: 'edit',
                title: 'Module:Vgtn/data',
                text: this.diffText,
                summary: '[[User:SuperGrey/gadgets/VGTNTool|編輯資料]]',
                starttimestamp: this.startTimestamp,
                basetimestamp: this.baseTimestamp,
            });
            if (res.edit && res.edit.result === 'Success') {
                console.log("[VGTNTool] 資料已成功儲存。");
                mw.notify('資料已成功儲存。', {type: 'success', autoHide: true, autoHideSeconds: 3});
                refreshPage();
                return false;
            } else if (res.error && res.error.code === 'editconflict') {
                console.error("[VGTNTool] 儲存資料時發生編輯衝突：", res);
                mw.notify('儲存資料時發生編輯衝突。請稍後再試。', {type: 'error', autoHide: true, autoHideSeconds: 3});
                return true;
            } else {
                console.error("[VGTNTool] 儲存資料時出錯：", res, '擬儲存的資料:', this.diffText);
                mw.notify('儲存資料時出錯。請稍後再試。', {type: 'error', autoHide: true, autoHideSeconds: 3});
                return true;
            }
        },

        /**
         * 獲取預覽 HTML。
         * @param text {string} - 要解析的文本。
         * @returns {Promise<string>} 返回解析後的 HTML 字串。
         */
        fetchPreviewHtml: async function (text) {
            const res = await this.api.postWithToken('csrf', {
                action: 'parse',
                text: text,
                prop: 'text',
                pst: 'true',
                disablelimitreport: true,
                disableeditsection: true,
                disabletoc: true,
                contentmodel: 'wikitext',
            });
            return res.parse.text['*'] || '';
        },

        /**
         * 在 2 秒後刷新頁面，以展示最新的變更。
         */
        refreshPage: function () {
            setTimeout(function () {
                window.location.reload();
            }, 2000);  // Wait for 2 seconds before refreshing
        },

        /**
         * 建立空白的可編輯表格。首次調用時會創建一個模板，後續調用則克隆此模板。
         * @returns {jQuery} 返回包含可編輯表格的 jQuery 物件。
         */
        buildTable: function () {
            if (!this.$tableTemplate) {
                this.$tableTemplate = $('<table>')
                    .addClass('wikitable vgtn-editable-table tablesorter')
                    .append($('<thead>')
                        .append($('<tr>')
                            .append($('<th>').attr('scope', 'col').text('原名'))
                            .append($('<th>').attr('scope', 'col').data('sorter', false).text('相關連結'))
                            .append($('<th>').attr('scope', 'col').data('sorter', false).text('中文名'))
                            .append($('<th>').attr('scope', 'col').data('sorter', false).text('備註'))))
                    .append($('<tbody>'));
            }
            const $table = this.$tableTemplate.clone(true);
            this.setTableFooter($table);
            return $table;
        },

        /**
         * 在指定的 tbody 中添加一行表格，並填充記錄數據。
         * @param $tbody {jQuery} - 要添加行的 tbody 元素。
         * @param record {Object} - 包含行數據的記錄對象。
         * @return {jQuery} 返回添加的行元素。
         */
        setTableRow: function ($tbody, record = {}) {
            const $row = $('<tr>').addClass('vgtn-editable-row');
            $row.append($('<th>')
                .attr('scope', 'row')
                .css({
                    'font-weight': 'normal', 'text-align': 'left'
                })
                .html(this.EntryNameField(record)));
            $row.append($('<td>').html(this.LinkVariableField(record)));
            $row.append($('<td>').html(this.LocaleVariableField(record)));
            $row.append($('<td>').html(this.CommentField(record)));

            $tbody.append($row);
            return $row;
        },

        /**
         * 在表格底部添加一個 footer，包含新增行的按鈕。
         * @param $table {jQuery} - 包含可編輯表格的元素。
         */
        setTableFooter: function ($table) {
            const $tfoot = $('<tfoot>');
            const $tfootRow = $('<tr>');
            const $tfootCell = $('<td>')
                .attr('colspan', 4)
                .css({'text-align': 'center'})
                .addClass('vgtn-table-footer');
            const $addRowButton = $('<a>')
                .addClass('vgtn-add-row-btn')
                .attr('href', 'javascript:void(0)')
                .text('新增行')
                .on('click', e => {
                    e.preventDefault();
                    const $newRow = this.setTableRow($table.find('tbody'), {});
                    $table.trigger("addRows", [$newRow]);
                });
            $tfootCell.append($addRowButton);
            $tfootRow.append($tfootCell);
            $tfoot.append($tfootRow);
            $table.append($tfoot);
        },

        /**
         * 在 mw-heading2 元素後添加一個新的章節。
         * @param $mwHeading2 {jQuery} - 要添加新章節的 mw-heading2 元素。
         */
        addSection: function ($mwHeading2) {
            const $table = this.buildTable();
            this.setTableRow($table.find('tbody'));

            // Build section header
            const $newHeadingSpan = $('<span>')
                .addClass('vgtn-editable-span vgtn-new-section-name')
                .attr('contenteditable', 'plaintext-only')
                .attr('placeholder', '(新章節)');
            const $h3 = $('<h3>')
                .addClass('vgtn-new-section')
                .append($newHeadingSpan);
            const $mwHeading3 = $('<div>')
                .addClass('mw-heading mw-heading3')
                .append($h3);
            this.setHeading3EditingButtons($mwHeading3, null, $table);
            $mwHeading2.after($mwHeading3);
            $mwHeading3.after($table);

            this.addedSections.push({$h2: $mwHeading2.find('h2'), $h3: $h3});
            this.setEditable($table);
        },

        /**
         * 處理 mw-heading3 元素的刪除章節操作。
         * @param $mwHeading3 {jQuery} - 包含 mw-heading3 的元素。
         */
        removeSection: function ($mwHeading3) {
            const $h3 = $mwHeading3.find('h3');
            if ($h3.hasClass('vgtn-section-removed')) {
                // If the section is already marked as removed, restore it
                $h3.removeClass('vgtn-section-removed');
                const $removeSectionButton = $mwHeading3.find('.mw-editsection .vgtn-remove-section-btn');
                $removeSectionButton.text('刪除章節');
            } else {
                $h3.addClass('vgtn-section-removed');
                const $removeSectionButton = $mwHeading3.find('.mw-editsection .vgtn-remove-section-btn');
                $removeSectionButton.text('取消刪除章節');
            }
        },

        /**
         * 將 mw-heading3 對應的表格改成可編輯狀態。
         * @param $mwHeading3 {jQuery} - 包含 mw-heading3 的元素。
         * @returns {Promise<void>} 返回一個 Promise，表示操作完成。
         */
        // load JSON, build entries[name] = [ ...records ], and make the matching section editable
        editSection: async function ($mwHeading3) {
            const sectionTitle = $mwHeading3.find('h3').attr('id');

            // Get the section data from [[Module:Vgtn/data]]
            const allData = await this.fetchModuleData();
            const entries = {};
            for (const mainIdx in allData) {
                const group = allData[mainIdx];
                if (typeof group !== 'object' || !group.name) continue; // skip non-object or missing name
                for (const key in group) {
                    if (key === 'name') continue;
                    const sub = group[key];
                    // gather numeric entries into an array
                    const arr = [];
                    for (const idx in sub) {
                        if (idx === 'name') continue;
                        arr.push(sub[idx]);
                    }
                    entries[sub.name.replace(/\s/g, '_')] = arr;
                }
            }
            if (!entries[sectionTitle]) {
                mw.notify(`無法找到段落「${sectionTitle}」。請確認段落名稱是否正確。`, {
                    type: 'error', autoHide: true, autoHideSeconds: 3
                });
                return;
            }

            // Make the wikitable editable
            const $ogTable = $mwHeading3.next('table.wikitable');
            const $table = this.buildTable();
            $table.data('vgtn-section', sectionTitle);
            $ogTable.hide();  // Hide the original table
            $mwHeading3.after($table);  // Insert the cloned table after the heading
            const $tbody = $table.find('tbody');
            for (let i = 0; i < entries[sectionTitle].length; i++) {
                let record = entries[sectionTitle][i];
                if (Array.isArray(record)) record = {"1": record[0]};  // convert Lua array (grammar fault) to object
                this.setTableRow($tbody, record);
            }

            this.setHeading3EditingButtons($mwHeading3, $ogTable, $table);
            this.setEditable($table);
        },

        /**
         * 1. 調整 contenteditable 的行為，避免用戶換行，避免用戶在粘貼時添加多餘的 HTML 標籤。
         * 2. 初始化表格排序功能。
         * @param $table {jQuery} - 包含可編輯表格的元素。
         */
        setEditable: function ($table) {
            $('[contenteditable]').on('paste', function (e) {
                const $self = $(this);
                setTimeout(function () {
                    $self.html($self.text());  // Strips elements added to the editable tag when pasting
                }, 0);
            }).on('keypress', function (e) {
                return e.which !== 13;  // Ignores Enter key
            });
            $table.tablesorter({
                sortReset: true,
                sortStable: true,
                emptyTo: 'bottom',
                textSorter: {0: $.tablesorter.sortText},
                textExtraction: {
                    0: (node, table, cellIndex) => {
                        return $(node).find('.vgtn-record-name').text().trim().replace(/[\s_]/g, '').toLowerCase();  // Sort by name without spaces or underscores
                    }
                }
            });
        },

        /**
         * 整理所有可編輯的表格中的變更，打開差異對話框以便用戶確認。
         * @returns {Promise<void>} 返回一個 Promise，表示操作完成。
         */
        // Save changes made in the editable table
        saveChanges: async function () {
            const {start, base, fulltext: oldText} = await this.fetchModuleText();

            // Find all vgtn-editable-table elements
            const $editableTables = $('.vgtn-editable-table');
            if ($editableTables.length === 0) {
                console.error("[VGTNTool] 沒有找到編輯中的表格。");
                mw.notify('沒有找到編輯中的表格。', {type: 'error', autoHide: true, autoHideSeconds: 3});
                return;
            }
            let newText = oldText;

            // Add new sections if any
            if (this.addedSections.length > 0) {
                this.addedSections.forEach(addedSection => {
                    const {$h2, $h3} = addedSection;
                    const h2Title = $h2.attr('id');
                    const h3Title = $h3.find('.vgtn-new-section-name').text().trim();
                    if (!h3Title) {
                        return;  // Skip if section name is empty
                    }
                    const escapedSectionName = h3Title.replace(/"/g, '\\"');  // Escape double quotes
                    const escapedParentName = mw.util.escapeRegExp(h2Title).replace(/_/g, '[ _]');  // Underscores are interchangeable with spaces
                    const parentRegex = new RegExp(`^(data\\[\\d+\\]=\\{\\s*\\-*\\s*name=['"]${escapedParentName}['"],\\s*\\-*\\r?\\n[\\s\\S]*?)(^\\})$`, 'gm');
                    if (parentRegex.test(newText)) {
                        const newSectionText = `  {\n    name="${escapedSectionName}",\n    --------------------------------------------------------------------------\n  },\n\n`;
                        newText = newText.replace(parentRegex, `$1${newSectionText}$2`);
                        console.log(`[VGTNTool] 新增段落「${h3Title}」到「${h2Title}」。`);
                    } else {
                        console.error(`[VGTNTool] 無法找到父段落「${h2Title}」。無法新增段落「${h3Title}」。`);
                        mw.notify(`無法找到父段落「${h2Title}」。無法新增段落「${h3Title}」。`, {
                            type: 'error', autoHide: true, autoHideSeconds: 3
                        });
                    }
                });
            }

            // Remove deleted sections if any
            const $deletedSections = $('.vgtn-section-removed');
            if ($deletedSections.length > 0) {
                $deletedSections.each(function () {
                    const $h3 = $(this);
                    let sectionName;
                    if ($h3.hasClass('vgtn-new-section')) {
                        // Delete the added section
                        sectionName = $h3.find('.vgtn-new-section-name').text().trim();
                    } else {
                        // If this is an existing section, get the title from the h3 element
                        sectionName = $h3.attr('id');
                    }
                    const escapedSectionName = mw.util.escapeRegExp(sectionName).replace(/_/g, '[ _]');  // Underscores are interchangeable with spaces
                    const sectionRegex = new RegExp(`[\\r\\n]*^[ \\t]*\\{\\s*name=['"]${escapedSectionName}['"],\\s*\\-*\\r?\\n[\\s\\S]*?^[ \\t]*\\},$`, 'gm');
                    if (sectionRegex.test(newText)) {
                        newText = newText.replace(sectionRegex, '');
                        console.log(`[VGTNTool] 刪除段落「${sectionName}」。`);
                    } else {
                        console.error(`[VGTNTool] 無法找到段落「${sectionName}」。無法刪除。`);
                    }
                });
            }

            // Iterate through each editable table and build the new Lua code
            $editableTables.each(function () {
                const $table = $(this);
                const $rows = $table.find('tbody tr');
                let sectionName = '';
                if ($table.data('vgtn-section')) {
                    sectionName = $table.data('vgtn-section');
                } else {
                    // Find previous section name from the h3 element
                    const $mwHeading3 = $table.prev('.mw-heading3');
                    const $h3 = $mwHeading3.find('h3');
                    if ($h3.hasClass('vgtn-section-removed')) {
                        return;  // Skip if this section is marked for deletion
                    }
                    sectionName = $h3.find('.vgtn-new-section-name').text().trim();
                    if (!sectionName) {
                        console.error("[VGTNTool] 段落名稱為空，無法儲存。請確認段落名稱是否已填寫。");
                        mw.notify('新章節名稱為空，無法儲存。請確認新章節名稱是否已填寫。', {
                            type: 'error', autoHide: true, autoHideSeconds: 3
                        });
                        return;  // Skip saving if section name is empty
                    }
                }
                let sectionNewRows = '';
                $rows.each(function () {
                    const $row = $(this);
                    if ($row.hasClass('vgtn-row-removed')) {
                        return;  // Skip rows marked for deletion
                    }
                    const name = $row.find('.vgtn-record-name').text().trim();
                    if (!name) {
                        console.warn("[VGTNTool] 發現空名稱的行，將跳過此行。");
                        return;  // Skip rows with empty names
                    }
                    const lang = $row.find('.vgtn-record-lang').text().trim();
                    const dab = $row.find('.vgtn-record-dab').text().trim();
                    const hanja = $row.find('.vgtn-record-hanja').is(':checked');
                    const rm = $row.find('.vgtn-record-rm').text().trim();
                    const aliases = $row.find('.vgtn-record-aliases').text().trim().split('|').map(a => a.trim()).filter(a => a);
                    const link = $row.find('.vgtn-record-link').text().trim();
                    const iw = $row.find('.vgtn-record-iw').text().trim();
                    const wd = $row.find('.vgtn-record-wd').text().trim();
                    const namu = $row.find('.vgtn-record-namu').text().trim();
                    const tw = $row.find('.vgtn-record-tw').text().trim();
                    const hk = $row.find('.vgtn-record-hk').text().trim();
                    const mo = $row.find('.vgtn-record-mo').text().trim();
                    const cn = $row.find('.vgtn-record-cn').text().trim();
                    const sg = $row.find('.vgtn-record-sg').text().trim();
                    const my = $row.find('.vgtn-record-my').text().trim();
                    const comment = $row.find('.vgtn-record-comment').text().trim();

                    // Build the new row Lua code
                    sectionNewRows += `    { "${name.replace(/"/g, '\\"')}"`;
                    if (lang) sectionNewRows += `, lang="${lang}"`;
                    if (dab) sectionNewRows += `, dab="${dab}"`;
                    if (rm) sectionNewRows += `, rm="${rm}"`;
                    if (cn) sectionNewRows += `, cn="${cn}"`;
                    if (hk) sectionNewRows += `, hk="${hk}"`;
                    if (tw) sectionNewRows += `, tw="${tw}"`;
                    if (sg) sectionNewRows += `, sg="${sg}"`;
                    if (mo) sectionNewRows += `, mo="${mo}"`;
                    if (my) sectionNewRows += `, my="${my}"`;
                    if (hanja) sectionNewRows += `, hanja=true`;
                    if (link) sectionNewRows += `, link="${link}"`;
                    if (iw) sectionNewRows += `, iw="${iw}"`;
                    if (wd) sectionNewRows += `, wd="${wd}"`;
                    if (namu) sectionNewRows += `, namu="${namu}"`;
                    if (aliases.length > 0) sectionNewRows += `, aliases={ "${aliases.join('", "')}" }`;
                    if (comment) sectionNewRows += `, comment="${comment}"`;
                    sectionNewRows += ' },\n';
                });

                // Replace the section in the Lua code
                const escapedSectionName = mw.util.escapeRegExp(sectionName).replace(/_/g, '[ _]');  // Underscores are interchangeable with spaces
                console.log(`[VGTNTool] escapedSectionName: ${escapedSectionName}`);
                const sectionRegex = new RegExp(`^([ \\t]*\\{\\s*name=['"]${escapedSectionName}['"],\\s*\\-*\\r?\\n)([\\s\\S]*?)(^[ \\t]*\\},)$`, 'gm');
                if (sectionRegex.test(newText)) {
                    newText = newText.replace(sectionRegex, `$1${sectionNewRows}$3`);
                } else {
                    console.error(`[VGTNTool] 無法找到標題為「${sectionName}」的段落，可能被刪除了。sectionRegex:`, sectionRegex, `newText:`, newText);
                }
            });

            // Sort the new text if the user has enabled sorting
            const $mwHeading2s = $('.mw-heading2');
            $mwHeading2s.each(function () {
                const $mwHeading2 = $(this);
                if ($mwHeading2.hasClass('vgtn-sort-asc') || $mwHeading2.hasClass('vgtn-sort-desc')) {
                    const sortOrder = $mwHeading2.hasClass('vgtn-sort-asc') ? 'asc' : 'desc';
                    const parentName = $mwHeading2.find('h2').attr('id');
                    const escapedParentName = mw.util.escapeRegExp(parentName).replace(/_/g, '[\\s_]');  // Underscores are interchangeable with spaces
                    const parentRegex = new RegExp(`^(data\\[\\d+\\]=\\{\\s*\\-*\\s*name=['"]${escapedParentName}['"],\\s*\\-*\\r?\\n)([\\s\\S]*?)(^\\})$`, 'gm');
                    if (parentRegex.test(newText)) {
                        const parentContent = newText.match(parentRegex)[0];
                        const sectionRegex = new RegExp(`^[ \\t]*\\{\\s*name=['"]([^'"]+)['"],\\s*\\-*\\r?\\n[\\s\\S]*?^[ \\t]*\\},$`, 'gm');
                        const matches = [...parentContent.matchAll(sectionRegex)];
                        // sort the matches based on the name field
                        matches.sort((a, b) => {
                            const nameA = a[1].toLowerCase().replace(/[\s_]/g, '');  // Remove spaces and underscores for sorting
                            const nameB = b[1].toLowerCase().replace(/[\s_]/g, '');  // Remove spaces and underscores for sorting
                            return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
                        });
                        // Rebuild the parent content with sorted sections
                        let sortedContent = '';
                        matches.forEach(match => {
                            sortedContent += match[0] + '\n\n';
                        });
                        // Replace the old parent content with the sorted content
                        newText = newText.replace(parentRegex, `$1\n${sortedContent}$3`);
                        console.log(`[VGTNTool] 已對段落「${parentName}」進行排序。排序方式：${sortOrder === 'asc' ? '升序' : '降序'}。`);
                    } else {
                        console.error(`[VGTNTool] 無法找到段落「${parentName}」。無法進行排序。`);
                    }
                }
            });

            // Show diff dialog
            const diffHtml = await this.fetchDiffHtml(oldText, newText);
            this.diffText = newText;  // Store the new text for saving later
            this.startTimestamp = start;
            this.baseTimestamp = base;
            this.showDiffDialog(diffHtml);
        },

        /**
         * 取消編輯，恢復原始表格。
         * @param $ogTable {jQuery} - 原始表格元素。
         * @param $table {jQuery} - 可編輯表格元素。
         * @param $mwHeading3 {jQuery} - 包含 mw-heading3 的元素。
         */
        cancelEdit: function ($ogTable, $table, $mwHeading3) {
            $table.remove();  // Remove the editable table
            $ogTable.show();  // Show the original table
            this.setHeading3Buttons($mwHeading3);  // Restore edit button
        },

        /**
         * 生成可編輯表格的名稱欄位。
         * @param record {Object} - 包含記錄數據的對象。
         * @returns {jQuery} 返回包含可編輯名稱欄位的 jQuery 物件。
         * @constructor
         */
        EntryNameField: function (record) {
            const $editableField = $('<div>').addClass('vgtn-editable-field');
            const $nameSpan = $('<span>')
                .data('vgtn-record', 'name')
                .addClass('vgtn-editable-span vgtn-record-name')
                .css({'white-space': 'nowrap'})
                .attr('contenteditable', 'plaintext-only')
                .attr('placeholder', '(空)')
                .text(record['1'] || '');
            $nameSpan.on('blur', function () {
                const $th = $(this).closest('th');
                $th.closest('table').trigger('updateCell', [$th]);
            });
            const $langCode = $('<code>')
                .data('vgtn-record', 'lang')
                .addClass('vgtn-editable-code vgtn-record-lang')
                .attr('contenteditable', 'plaintext-only')
                .attr('placeholder', '(lang)')
                .text(record.lang || '');
            $langCode.on('input', function () {
                // Control whether to display the hanja checkbox and rm span based on language
                const lang = $(this).text().trim();
                const $hanjaBundle = $editableField.find('.vgtn-editable-hanja-bundle');
                const $rmSpanBundle = $editableField.find('.vgtn-editable-rm-bundle');
                const $namuSpanBundle = $editableField.closest('tr').find('.vgtn-editable-namu-bundle');
                if (lang === 'ko') {
                    $hanjaBundle.show();
                    $namuSpanBundle.show();
                } else {
                    $hanjaBundle.hide();
                    $namuSpanBundle.hide();
                }
                if (['ja', 'ko', 'ru'].includes(lang)) $rmSpanBundle.show(); else $rmSpanBundle.hide();
            });
            const $dabCode = $('<code>')
                .data('vgtn-record', 'dab')
                .addClass('vgtn-editable-code vgtn-record-dab')
                .attr('contenteditable', 'plaintext-only')
                .attr('placeholder', '(dab)')
                .text(record.dab || '');
            const $removeRowButton = $('<a>')
                .addClass('vgtn-remove-row-btn')
                .attr('href', 'javascript:void(0)')
                .text('刪除行')
                .on('click', e => {
                    e.preventDefault();
                    const $row = $editableField.closest('tr');
                    if ($row.hasClass('vgtn-row-removed')) {
                        $row.removeClass('vgtn-row-removed');
                        $removeRowButton.text('刪除行');
                    } else {
                        $row.addClass('vgtn-row-removed');
                        $removeRowButton.text('取消刪除行');
                    }
                });
            const $removeRowButtonBundle = $('<span>')
                .addClass('vgtn-editable-bundle vgtn-editable-remove-row-bundle')
                .append($('<span>').text('[').css({'padding-left': '0.2em'}))
                .append($removeRowButton)
                .append($('<span>').text(']'));
            $editableField
                .append($nameSpan).append(' ')
                .append($langCode).append(' ')
                .append($dabCode).append(' ')
                .append($removeRowButtonBundle);
            const $hanjaCheckbox = $('<input>')
                .attr('type', 'checkbox')
                .data('vgtn-record', 'hanja')
                .addClass('vgtn-editable-checkbox vgtn-record-hanja')
                .prop('checked', record.hanja === true);
            const $hanjaCheckboxBundle = $('<span>')
                .addClass('vgtn-editable-bundle vgtn-editable-hanja-bundle')
                .append($('<br>'))
                .append($('<label>')
                    .attr('for', 'vgtn-record-hanja')
                    .addClass('vgtn-record-label')
                    .append('確認正字(非音譯): '))
                .append($hanjaCheckbox);
            $editableField.append($hanjaCheckboxBundle);
            if (!record.lang || record.lang !== 'ko') {
                $hanjaCheckboxBundle.hide();  // Hide hanja checkbox if not Korean
            }
            const $rmSpan = $('<span>')
                .data('vgtn-record', 'rm')
                .addClass('vgtn-editable-span vgtn-record-rm')
                .attr('contenteditable', 'plaintext-only')
                .attr('placeholder', '(空)')
                .text(record.rm || '');
            const $rmSpanBundle = $('<span>')
                .addClass('vgtn-editable-bundle vgtn-editable-rm-bundle')
                .append($('<br>'))
                .append($('<label>')
                    .attr('for', 'vgtn-record-rm')
                    .addClass('vgtn-record-label')
                    .append('羅馬字: '))
                .append($rmSpan);
            $editableField.append($rmSpanBundle);
            if (!record.lang || !['ja', 'ko', 'ru'].includes(record.lang)) {
                $rmSpanBundle.hide();  // Hide rm span if not Japanese, Korean, or Russian
            }
            const $aliasesSpan = $('<span>')
                .data('vgtn-record', 'aliases')
                .addClass('vgtn-editable-span vgtn-record-aliases')
                .attr('contenteditable', 'plaintext-only')
                .attr('placeholder', '(空)')
                .text(record.aliases?.join('|') || '');
            $editableField
                .append($('<br>'))
                .append($('<label>')
                    .attr('for', 'vgtn-record-aliases')
                    .addClass('vgtn-record-label')
                    .append('別名(豎線隔開): '))
                .append($aliasesSpan);
            return $editableField;
        },

        /**
         * 生成可編輯表格的相關連結欄位。
         * @param record {Object} - 包含記錄數據的對象。
         * @returns {jQuery} 返回包含可編輯連結欄位的 jQuery 物件。
         * @constructor
         */
        LinkVariableField: function (record) {
            const $editableField = $('<div>').addClass('vgtn-editable-field');
            const linkNames = [
                ['link', '本站連結'],
                ['iw', '跨語言'],
                ['wd', '維基數據'],
                ['namu', '納木維基']
            ];
            linkNames.forEach(([key, label]) => {
                const $editableSpan = $('<span>')
                    .data('vgtn-record', key)
                    .addClass('vgtn-editable-span vgtn-record-' + key)
                    .attr('contenteditable', 'plaintext-only')
                    .attr('placeholder', '(空)')
                    .text(record[key] || '');
                const $editableSpanBundle = $('<span>')
                    .addClass('vgtn-editable-bundle vgtn-editable-' + key + '-bundle');
                if ($editableField.children().length > 0) $editableSpanBundle.append($('<br>'));
                $editableSpanBundle
                    .append($('<label>')
                        .attr('for', 'vgtn-record-' + key)
                        .addClass('vgtn-record-label')
                        .append(label + ': '))
                    .append($editableSpan);
                $editableField.append($editableSpanBundle);
            });
            if (!record.lang || record.lang !== 'ko') {
                $editableField.find('.vgtn-editable-namu-bundle').hide();  // Hide namu link if not Korean
            }
            return $editableField;
        },

        /**
         * 生成可編輯表格的語言變體欄位。
         * 包含：臺灣正體、香港繁體、澳門繁體、大陸簡體、新加坡簡體、大馬簡體。
         * @param record {Object} - 包含記錄數據的對象。
         * @returns {jQuery} 返回包含可編輯語言變體欄位的 jQuery 物件。
         * @constructor
         */
        LocaleVariableField: function (record) {
            const $editableField = $('<div>').addClass('vgtn-editable-field');
            const locales = ['tw', 'hk', 'mo', 'cn', 'sg', 'my'];
            const localeFallback = function (locale, record) {
                const localeFallbacks = {
                    'tw': ['hk', 'mo', 'cn', 'sg', 'my'],
                    'hk': ['mo', 'tw', 'cn', 'sg', 'my'],
                    'mo': ['hk', 'tw', 'cn', 'sg', 'my'],
                    'cn': ['sg', 'my', 'tw', 'hk', 'mo'],
                    'sg': ['my', 'cn', 'tw', 'hk', 'mo'],
                    'my': ['sg', 'cn', 'tw', 'hk', 'mo']
                };
                for (const fallback of localeFallbacks[locale]) {
                    if (record[fallback]) return record[fallback];
                }
                return '(空)';
            };
            locales.forEach(locale => {
                const $editableSpan = $('<span>')
                    .data('vgtn-record', locale)
                    .addClass('vgtn-editable-span vgtn-record-' + locale)
                    .attr('lang', 'zh-' + locale)
                    .attr('contenteditable', 'plaintext-only')
                    .attr('placeholder', localeFallback(locale, record))
                    .text(record[locale] || '');
                $editableSpan.on('input', function () {  // Listen for changes to update the placeholder
                    const $editableSpans = $editableField.find('.vgtn-editable-span');
                    const newRecord = {};
                    $editableSpans.each(function () {
                        newRecord[$(this).data('vgtn-record')] = $(this).text().trim();
                    });
                    $editableSpans.each(function () {
                        $(this).attr('placeholder', localeFallback($(this).data('vgtn-record'), newRecord));
                    });
                });
                if ($editableField.children().length > 0) $editableField.append($('<br>'));
                $editableField
                    .append($('<label>')
                        .attr('for', 'vgtn-record-' + locale)
                        .addClass('vgtn-record-label')
                        .append(locale + ': '))
                    .append($editableSpan);
            });
            return $editableField;
        },

        /**
         * 生成可編輯表格的備註欄位。
         * @param record {Object} - 包含記錄數據的對象。
         * @returns {jQuery} 返回包含可編輯備註欄位的 jQuery 物件。
         * @constructor
         */
        CommentField: function (record) {
            const $editableField = $('<div>').addClass('vgtn-editable-field');
            const $commentSpan = $('<span>')
                .data('vgtn-record', 'comment')
                .addClass('vgtn-editable-span vgtn-record-comment')
                .attr('contenteditable', 'plaintext-only')
                .attr('placeholder', '(空)')
                .text(record.comment || '');
            $editableField.append($commentSpan);
            return $editableField;
        },

        /**
         * 為每個二級和三級標題添加各種按鈕。
         * @param $content {jQuery} - 包含 mw-parser-output 的內容元素。
         */
        addEditButtons: function ($content) {
            const $parser = $content.find('.mw-parser-output');
            if (document.getElementById(this.editorContainerId)) return;
            // Mark editor container to prevent duplicate buttons
            $('<div>').attr('id', this.editorContainerId).css('display', 'none').appendTo($parser);

            // Edit buttons to each h3 header
            $parser.find('.mw-heading3').each((i, el) => {
                const $mwHeading3 = $(el);
                this.setHeading3Buttons($mwHeading3);
            });

            // Addition buttons to each h2 header
            $parser.find('.mw-heading2').each((i, el) => {
                const $mwHeading2 = $(el);
                if ($mwHeading2.find('h2').attr('id') === '参见') return;  // Skip "参见" section
                this.setHeading2Buttons($mwHeading2);
            });
        },

        /**
         * 為 mw-heading3 元素設置編輯按鈕。
         * @param $mwHeading3 {jQuery} - 包含 mw-heading3 的元素。
         */
        setHeading3Buttons: function ($mwHeading3) {
            const $editButton = $('<a>')
                .addClass('vgtn-edit-btn')
                .attr('href', 'javascript:void(0)')
                .text('编辑')
                .on('click', e => {
                    e.preventDefault();
                    this.editSection($mwHeading3);
                });
            if (!$mwHeading3.find('.mw-editsection').length) {
                $mwHeading3.append($('<span>').addClass('mw-editsection'));
            }
            const $editSection = $mwHeading3.find('.mw-editsection');
            $editSection.empty();  // Clear existing content
            $editSection.append($('<span>').addClass('mw-editsection-bracket').text('['));
            $editSection.append($editButton);
            $editSection.append($('<span>').addClass('mw-editsection-bracket').text(']'));
        },

        /**
         * 在 mw-heading3 元素中設置保存和取消按鈕。
         * @param $mwHeading3 {jQuery} - 包含 mw-heading3 的元素。
         * @param $ogTable {jQuery} - 原始表格元素。
         * @param $table {jQuery} - 可編輯表格元素。
         */
        setHeading3EditingButtons: function ($mwHeading3, $ogTable, $table) {
            const $saveButton = $('<a>')
                .addClass('vgtn-save-btn')
                .attr('href', 'javascript:void(0)')
                .text('儲存')
                .on('click', async e => {
                    e.preventDefault();
                    await this.saveChanges();
                });
            const $cancelButton = $('<a>')
                .addClass('vgtn-cancel-btn')
                .attr('href', 'javascript:void(0)')
                .text('取消')
                .on('click', e => {
                    e.preventDefault();
                    this.cancelEdit($ogTable, $table, $mwHeading3);
                });
            const $removeSectionButton = $('<a>')
                .addClass('vgtn-remove-section-btn')
                .attr('href', 'javascript:void(0)')
                .text('删除章節')
                .on('click', e => {
                    e.preventDefault();
                    this.removeSection($mwHeading3);
                });
            if (!$mwHeading3.find('.mw-editsection').length) {
                $mwHeading3.append($('<span>').addClass('mw-editsection'));
            }
            const $editSection = $mwHeading3.find('.mw-editsection');
            $editSection.empty();  // Clear existing content
            $editSection.append($('<span>').addClass('mw-editsection-bracket').text('['));
            $editSection.append($saveButton);
            if (!$mwHeading3.find('h3').hasClass('vgtn-new-section')) {
                $editSection.append($('<span>').addClass('mw-editsection-separator').text(' | '));
                $editSection.append($cancelButton);
            }
            $editSection.append($('<span>').addClass('mw-editsection-separator').text(' | '));
            $editSection.append($removeSectionButton);
            $editSection.append($('<span>').addClass('mw-editsection-bracket').text(']'));
        },

        /**
         * 為 mw-heading2 元素設置新增章節按鈕。
         * @param $mwHeading2 {jQuery} - 包含 mw-heading2 的元素。
         */
        setHeading2Buttons: function ($mwHeading2) {
            const $addButton = $('<a>')
                .addClass('vgtn-add-btn')
                .attr('href', 'javascript:void(0)')
                .text('新增章節')
                .on('click', e => {
                    e.preventDefault();
                    this.addSection($mwHeading2);
                });
            const $sortButton = $('<a>')
                .addClass('vgtn-sort-btn')
                .attr('href', 'javascript:void(0)')
                .text('升序排序')
                .on('click', e => {
                    e.preventDefault();
                    if ($mwHeading2.hasClass('vgtn-sort-asc')) {
                        $mwHeading2.removeClass('vgtn-sort-asc').addClass('vgtn-sort-desc');
                        $sortButton.text('原始排序');
                    } else if ($mwHeading2.hasClass('vgtn-sort-desc')) {
                        $mwHeading2.removeClass('vgtn-sort-desc');
                        $sortButton.text('升序排序');
                    } else {
                        $mwHeading2.addClass('vgtn-sort-asc');
                        $sortButton.text('降序排序');
                    }
                });
            if (!$mwHeading2.find('.mw-editsection').length) {
                $mwHeading2.append($('<span>').addClass('mw-editsection'));
            }
            const $editSection = $mwHeading2.find('.mw-editsection');
            $editSection.empty();  // Clear existing content
            $editSection.append($('<span>').addClass('mw-editsection-bracket').text('['));
            $editSection.append($addButton);
            $editSection.append($('<span>').addClass('mw-editsection-separator').text(' | '));
            $editSection.append($sortButton);
            $editSection.append($('<span>').addClass('mw-editsection-bracket').text(']'));
        },

        /**
         * DiffDialog 用於顯示差異對話框。
         * @param config {Object} - 配置對話框的參數。
         * @constructor
         */
        DiffDialog: function (config) {
            VGTNTool.DiffDialog.super.call(this, config);
        },

        /**
         * 初始化差異對話框類。
         */
        initDiffDialog: function () {
            OO.inheritClass(VGTNTool.DiffDialog, OO.ui.ProcessDialog);

            VGTNTool.DiffDialog.static.name = 'vgtn-diff-dialog';
            VGTNTool.DiffDialog.static.title = '檢視差異';
            VGTNTool.DiffDialog.static.size = 'large';
            VGTNTool.DiffDialog.static.actions = [
                {
                    action: 'save', label: '儲存', flags: ['primary', 'progressive']
                }, {
                    action: 'cancel', label: '取消', flags: 'safe'
                },
            ];
            this.DiffDialog.prototype.initialize = function () {
                VGTNTool.DiffDialog.super.prototype.initialize.call(this);
                this.$content = $('<div>').addClass('vgtn-diff-dialog-content');
                this.$diff = $('<div>').addClass('vgtn-diff-dialog-diff');
                this.$content.append(this.$diff);
                this.$body.append(this.$content);
            };
            this.DiffDialog.prototype.getSetupProcess = function (data) {
                return VGTNTool.DiffDialog.super.prototype.getSetupProcess.call(this, data).next(function () {
                    this.$diff.html(data.diffHtml);
                    if (data.diffHtml === VGTNTool.messageNoChanges) {
                        this.actions.setAbilities({'save': false});
                    }
                }, this);
            };
            this.DiffDialog.prototype.getBodyHeight = function () {
                return this.$content.outerHeight(true);
            };
            this.DiffDialog.prototype.getBodyWidth = function () {
                return this.$content.outerWidth(true);
            };
            this.DiffDialog.prototype.getActionProcess = function (action) {
                if (action === 'save') {
                    return new OO.ui.Process(() => {
                        VGTNTool.saveModuleText().then(() => {
                            this.close({action: 'save'});
                        });
                    });
                } else if (action === 'cancel') {
                    return new OO.ui.Process(() => {
                        this.close({action: 'cancel'});
                    });
                }
                return VGTNTool.DiffDialog.super.prototype.getActionProcess.call(this, action);
            };

            this.windowManager = new OO.ui.WindowManager();
            $(document.body).append(this.windowManager.$element);
        },

        /**
         * 顯示差異對話框。
         * @param diffHtml {string} - 差異的 HTML 內容。
         */
        showDiffDialog: function (diffHtml) {
            const dialog = new this.DiffDialog();
            this.windowManager.addWindows([dialog]);
            this.windowManager.openWindow(dialog, {diffHtml: diffHtml});
        }
    };

    $(VGTNTool.init);
})();
