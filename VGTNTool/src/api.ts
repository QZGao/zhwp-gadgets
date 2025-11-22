declare var mw: any;

// MediaWiki API 實例
let _api: any = null;

function getApi() {
    if (!_api) {
        _api = new mw.Api({'User-Agent': 'VGTNTool/1.0.2'});
    }
    return _api;
}

/**
 * 從 Module:Vgtn/data 獲取 JSON 格式的資料（expandtemplates）。
 * @returns {Promise<Object>} 返回解析後的 JSON 資料。
 */
export async function fetchModuleData(): Promise<object> {
    const res = await getApi().get({
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
}

/**
 * 從 Module:Vgtn/data 獲取模組的完整文本。
 * @returns {Promise<{start: string, base: string, fulltext: string}>} 返回包含模組的起始時間戳、基礎時間戳和完整文本的物件。時間戳有助於處理編輯衝突。
 */
export async function fetchModuleText(): Promise<{start: string, base: string, fulltext: string}> {
    const res = await getApi().get({
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
}

/**
 * 獲取差異視圖的 HTML。
 * @param {string} oldText - 舊文本。
 * @param {string} newText - 新文本。
 * @return {Promise<JQuery<HTMLElement> | null>} 返回包含差異視圖的 jQuery 物件。
 */
export async function fetchDiffHtml(oldText: string, newText: string): Promise<JQuery<HTMLElement> | null> {
    const res = await getApi().postWithToken('csrf', {
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
    return res.compare['*'] ? $('<table>').addClass('diff').append($('<colgroup>').append($('<col>').addClass('diff-marker'), $('<col>').addClass('diff-content'), $('<col>').addClass('diff-marker'), $('<col>').addClass('diff-content'))).append(res.compare['*']) : null;
}

/**
 * 初始化差異對話框。
 * @param diffText {string} - 差異文本。
 * @param startTimestamp {string} - 編輯開始的時間戳。
 * @param baseTimestamp {string} - 基礎時間戳。
 * @returns {Promise<boolean>} 返回是否成功初始化差異對話框。
 */
export async function saveModuleText(diffText: string, startTimestamp: string, baseTimestamp: string, summary?: string): Promise<boolean> {
    const trimmedSummary = (summary || '').trim();
    const editSummary = trimmedSummary ? `[[User:SuperGrey/gadgets/VGTNTool|編輯資料]]：${trimmedSummary}` : '[[User:SuperGrey/gadgets/VGTNTool|編輯資料]]';
    const res = await getApi().postWithToken('csrf', {
        action: 'edit',
        title: 'Module:Vgtn/data',
        text: diffText,
        summary: editSummary,
        starttimestamp: startTimestamp,
        basetimestamp: baseTimestamp,
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
        console.error("[VGTNTool] 儲存資料時出錯：", res, '擬儲存的資料:', diffText);
        mw.notify('儲存資料時出錯。請稍後再試。', {type: 'error', autoHide: true, autoHideSeconds: 3});
        return true;
    }
}

/**
 * 獲取預覽 HTML。
 * @param text {string} - 要解析的文本。
 * @returns {Promise<string>} 返回解析後的 HTML 字串。
 */
async function fetchPreviewHtml(text: string): Promise<string> {
    const res = await getApi().postWithToken('csrf', {
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
}

/**
 * 在 2 秒後刷新頁面，以展示最新的變更。
 */
function refreshPage(): void {
    setTimeout(function () {
        window.location.reload();
    }, 2000);  // Wait for 2 seconds before refreshing
}