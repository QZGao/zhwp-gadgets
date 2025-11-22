import {fetchDiffHtml, fetchModuleData, fetchModuleText} from "./api";
import {showDiffDialog} from "./diff_dialog";

declare var mw: any;
const editorContainerId = 'vgtn-editor';  // 標記當次 hook 是否完成載入的 pseudo 元素
const addedSections = [];  // 儲存新增的章節

let $tableTemplate: JQuery<HTMLElement> | null = null;  // 可編輯表格的模板

/**
 * 建立空白的可編輯表格。首次調用時會創建一個模板，後續調用則克隆此模板。
 * @returns {jQuery} 返回包含可編輯表格的 jQuery 物件。
 */
function buildTable() {
    if (!$tableTemplate) {
        $tableTemplate = $('<table>')
            .addClass('wikitable vgtn-editable-table tablesorter')
            .append($('<thead>')
                .append($('<tr>')
                    .append($('<th>').attr('scope', 'col').text('原名'))
                    .append($('<th>').attr('scope', 'col').data('sorter', false).text('相關連結'))
                    .append($('<th>').attr('scope', 'col').data('sorter', false).text('中文名'))
                    .append($('<th>').attr('scope', 'col').data('sorter', false).text('備註'))))
            .append($('<tbody>'));
    }
    const $table = $tableTemplate.clone(true);
    setTableFooter($table);
    return $table;
}

/**
 * 在指定的 tbody 中添加一行表格，並填充記錄數據。
 * @param $tbody {jQuery} - 要添加行的 tbody 元素。
 * @param record {Object} - 包含行數據的記錄對象。
 * @return {jQuery} 返回添加的行元素。
 */
function setTableRow($tbody, record = {}) {
    const $row = $('<tr>').addClass('vgtn-editable-row');
    $row.append($('<th>')
        .attr('scope', 'row')
        .css({
            'font-weight': 'normal', 'text-align': 'left'
        })
        .html(EntryNameField(record).html()));
    $row.append($('<td>').html(LinkVariableField(record).html()));
    $row.append($('<td>').html(LocaleVariableField(record).html()));
    $row.append($('<td>').html(CommentField(record).html()));

    $tbody.append($row);
    return $row;
}

/**
 * 在表格底部添加一個 footer，包含新增行的按鈕。
 * @param $table {jQuery} - 包含可編輯表格的元素。
 */
function setTableFooter($table) {
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
            const $newRow = setTableRow($table.find('tbody'), {});
            $table.trigger("addRows", [$newRow]);
        });
    $tfootCell.append($addRowButton);
    $tfootRow.append($tfootCell);
    $tfoot.append($tfootRow);
    $table.append($tfoot);
}

/**
 * 在 mw-heading2 元素後添加一個新的章節。
 * @param $mwHeading2 {jQuery} - 要添加新章節的 mw-heading2 元素。
 */
function addSection($mwHeading2) {
    const $table = buildTable();
    setTableRow($table.find('tbody'));

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
    setHeading3EditingButtons($mwHeading3, null, $table);
    $mwHeading2.after($mwHeading3);
    $mwHeading3.after($table);

    addedSections.push({$h2: $mwHeading2.find('h2'), $h3: $h3});
    setEditable($table);
}

/**
 * 處理 mw-heading3 元素的刪除章節操作。
 * @param $mwHeading3 {jQuery} - 包含 mw-heading3 的元素。
 */
function removeSection($mwHeading3) {
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
}

/**
 * 將 mw-heading3 對應的表格改成可編輯狀態。
 * @param $mwHeading3 {jQuery} - 包含 mw-heading3 的元素。
 * @returns {Promise<void>} 返回一個 Promise，表示操作完成。
 */
// load JSON, build entries[name] = [ ...records ], and make the matching section editable
async function editSection($mwHeading3) {
    const sectionTitle = $mwHeading3.find('h3').attr('id');

    // Get the section data from [[Module:Vgtn/data]]
    const allData = await fetchModuleData();
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
    const $table = buildTable();
    $table.data('vgtn-section', sectionTitle);
    $ogTable.hide();  // Hide the original table
    $mwHeading3.after($table);  // Insert the cloned table after the heading
    const $tbody = $table.find('tbody');
    for (let i = 0; i < entries[sectionTitle].length; i++) {
        let record = entries[sectionTitle][i];
        if (Array.isArray(record)) record = {"1": record[0]};  // convert Lua array (grammar fault) to object
        setTableRow($tbody, record);
    }

    setHeading3EditingButtons($mwHeading3, $ogTable, $table);
    setEditable($table);
}

/**
 * 1. 調整 contenteditable 的行為，避免用戶換行，避免用戶在粘貼時添加多餘的 HTML 標籤。
 * 2. 初始化表格排序功能。
 * @param $table {jQuery} - 包含可編輯表格的元素。
 */
function setEditable($table) {
    $('[contenteditable]').on('paste', function (e) {
        const $self = $(this);
        setTimeout(function () {
            $self.html($self.text());  // Strips elements added to the editable tag when pasting
        }, 0);
    }).on('keypress', function (e) {
        return e.which !== 13;  // Ignores Enter key
    });
    $table.tablesorter({
        sortReset: true, sortStable: true, emptyTo: 'bottom', textSorter: {0: $.tablesorter.sortText}, textExtraction: {
            0: (node, table, cellIndex) => {
                return $(node).find('.vgtn-record-name').text().trim().replace(/[\s_]/g, '').toLowerCase();  // Sort by name without spaces or underscores
            }
        }
    });
}

/**
 * 整理所有可編輯的表格中的變更，打開差異對話框以便用戶確認。
 * @returns {Promise<void>} 返回一個 Promise，表示操作完成。
 */
// Save changes made in the editable table
async function saveChanges() {
    const {start, base, fulltext: oldText} = await fetchModuleText();

    // Find all vgtn-editable-table elements
    const $editableTables = $('.vgtn-editable-table');
    if ($editableTables.length === 0) {
        console.error("[VGTNTool] 沒有找到編輯中的表格。");
        mw.notify('沒有找到編輯中的表格。', {type: 'error', autoHide: true, autoHideSeconds: 3});
        return;
    }
    let newText = oldText;

    // Add new sections if any
    if (addedSections.length > 0) {
        addedSections.forEach(addedSection => {
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
                const matches = Array.from(parentContent.matchAll(sectionRegex));
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
    const diffHtml = await fetchDiffHtml(oldText, newText);
    showDiffDialog(diffHtml, newText, start, base);
}

/**
 * 取消編輯，恢復原始表格。
 * @param $ogTable {jQuery} - 原始表格元素。
 * @param $table {jQuery} - 可編輯表格元素。
 * @param $mwHeading3 {jQuery} - 包含 mw-heading3 的元素。
 */
function cancelEdit($ogTable, $table, $mwHeading3) {
    $table.remove();  // Remove the editable table
    $ogTable.show();  // Show the original table
    setHeading3Buttons($mwHeading3);  // Restore edit button
}

/**
 * 生成可編輯表格的名稱欄位。
 * @param record {Object} - 包含記錄數據的對象。
 * @returns {jQuery} 返回包含可編輯名稱欄位的 jQuery 物件。
 * @constructor
 */
function EntryNameField(record) {
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
        .addClass('vgtn-editable-checkbox vgtn-record-hanja');
    const hanjaChecked = record.hanja === true;
    $hanjaCheckbox.prop('checked', hanjaChecked);
    if (hanjaChecked) {
        $hanjaCheckbox.attr('checked', 'checked');
    } else {
        $hanjaCheckbox.removeAttr('checked');
    }
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
}

/**
 * 生成可編輯表格的相關連結欄位。
 * @param record {Object} - 包含記錄數據的對象。
 * @returns {jQuery} 返回包含可編輯連結欄位的 jQuery 物件。
 * @constructor
 */
function LinkVariableField(record) {
    const $editableField = $('<div>').addClass('vgtn-editable-field');
    const linkNames = [
        ['link', '本站連結'], ['iw', '跨語言'], ['wd', '維基數據'], ['namu', '納木維基']
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
}

/**
 * 生成可編輯表格的語言變體欄位。
 * 包含：臺灣正體、香港繁體、澳門繁體、大陸簡體、新加坡簡體、大馬簡體。
 * @param record {Object} - 包含記錄數據的對象。
 * @returns {jQuery} 返回包含可編輯語言變體欄位的 jQuery 物件。
 * @constructor
 */
function LocaleVariableField(record) {
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
}

/**
 * 生成可編輯表格的備註欄位。
 * @param record {Object} - 包含記錄數據的對象。
 * @returns {jQuery} 返回包含可編輯備註欄位的 jQuery 物件。
 * @constructor
 */
function CommentField(record) {
    const $editableField = $('<div>').addClass('vgtn-editable-field');
    const $commentSpan = $('<span>')
        .data('vgtn-record', 'comment')
        .addClass('vgtn-editable-span vgtn-record-comment')
        .attr('contenteditable', 'plaintext-only')
        .attr('placeholder', '(空)')
        .text(record.comment || '');
    $editableField.append($commentSpan);
    return $editableField;
}

/**
 * 為每個二級和三級標題添加各種按鈕。
 * @param $content {jQuery} - 包含 mw-parser-output 的內容元素。
 */
export function addEditButtons($content) {
    const $parser = $content.find('.mw-parser-output');
    if (document.getElementById(editorContainerId)) return;
    // Mark editor container to prevent duplicate buttons
    $('<div>').attr('id', editorContainerId).css('display', 'none').appendTo($parser);

    // Edit buttons to each h3 header
    $parser.find('.mw-heading3').each((i, el) => {
        const $mwHeading3 = $(el);
        setHeading3Buttons($mwHeading3);
    });

    // Addition buttons to each h2 header
    $parser.find('.mw-heading2').each((i, el) => {
        const $mwHeading2 = $(el);
        if ($mwHeading2.find('h2').attr('id') === '参见') return;  // Skip "参见" section
        setHeading2Buttons($mwHeading2);
    });
}

/**
 * 為 mw-heading3 元素設置編輯按鈕。
 * @param $mwHeading3 {jQuery} - 包含 mw-heading3 的元素。
 */
function setHeading3Buttons($mwHeading3) {
    const $editButton = $('<a>')
        .addClass('vgtn-edit-btn')
        .attr('href', 'javascript:void(0)')
        .text('编辑')
        .on('click', e => {
            e.preventDefault();
            editSection($mwHeading3);
        });
    if (!$mwHeading3.find('.mw-editsection').length) {
        $mwHeading3.append($('<span>').addClass('mw-editsection'));
    }
    const $editSection = $mwHeading3.find('.mw-editsection');
    $editSection.empty();  // Clear existing content
    $editSection.append($('<span>').addClass('mw-editsection-bracket').text('['));
    $editSection.append($editButton);
    $editSection.append($('<span>').addClass('mw-editsection-bracket').text(']'));
}

/**
 * 在 mw-heading3 元素中設置保存和取消按鈕。
 * @param $mwHeading3 {jQuery} - 包含 mw-heading3 的元素。
 * @param $ogTable {jQuery} - 原始表格元素。
 * @param $table {jQuery} - 可編輯表格元素。
 */
function setHeading3EditingButtons($mwHeading3, $ogTable, $table) {
    const $saveButton = $('<a>')
        .addClass('vgtn-save-btn')
        .attr('href', 'javascript:void(0)')
        .text('儲存')
        .on('click', async e => {
            e.preventDefault();
            await saveChanges();
        });
    const $cancelButton = $('<a>')
        .addClass('vgtn-cancel-btn')
        .attr('href', 'javascript:void(0)')
        .text('取消')
        .on('click', e => {
            e.preventDefault();
            cancelEdit($ogTable, $table, $mwHeading3);
        });
    const $removeSectionButton = $('<a>')
        .addClass('vgtn-remove-section-btn')
        .attr('href', 'javascript:void(0)')
        .text('删除章節')
        .on('click', e => {
            e.preventDefault();
            removeSection($mwHeading3);
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
}

/**
 * 為 mw-heading2 元素設置新增章節按鈕。
 * @param $mwHeading2 {jQuery} - 包含 mw-heading2 的元素。
 */
function setHeading2Buttons($mwHeading2) {
    const $addButton = $('<a>')
        .addClass('vgtn-add-btn')
        .attr('href', 'javascript:void(0)')
        .text('新增章節')
        .on('click', e => {
            e.preventDefault();
            addSection($mwHeading2);
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
}
