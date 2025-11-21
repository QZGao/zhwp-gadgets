import {addEditButtons} from "./dom";

declare var mw: any;

function injectStylesheet() {
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
}

/**
 * 程式入口。
 */
function init() {
    if (mw.config.get('wgPageName') !== 'WikiProject:电子游戏/译名表') return;
    mw.loader.load('mediawiki.diff.styles');

    console.log("[VGTNTool] 小工具已載入。");

    injectStylesheet();

    // Add edit buttons to each section when the content is loaded
    mw.hook('wikipage.content').add($content => addEditButtons($content));
}

init();