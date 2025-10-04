import state from "./state.js";
import {getOrderedRuleStatus, NominationRules, NominationRuleSet} from "./rules.js";
import {saveModifiedNomination, saveNewNomination, saveNominationCheck} from "./dom.js";
import {getXToolsInfo} from "./api.js";

let windowManager = null;  // Window manager for OOUI dialogs
let newNominationDialog = null;  // 新提名dialog
let editNominationDialog = null;  // 修改提名dialog
let editNominationDialogContent = new OO.ui.FieldsetLayout(); // 修改提名dialog的內容池
let checkNominationDialog = null;  // 檢查提名dialog
let checkNominationDialogContent = new OO.ui.FieldsetLayout(); // 檢查提名dialog的內容池

export function initOOUI() {
    // Initialize OOUI custom widgets
    initDynamicWidthTextInputWidget();
    initRuleCheckboxInputWidget();
    // Initialize dialogs
    initNewNominationDialog();
    initEditNominationDialog();
    initCheckNominationDialog();
    // Initialize window manager
    initWindowManager();
}

function initWindowManager() {
    windowManager = new OO.ui.WindowManager();

    // Append the window manager element to the body
    $(document.body).append(windowManager.$element);
}

/**
 * 動態寬度文本輸入框。
 * @param config
 * @constructor
 */
function DynamicWidthTextInputWidget(config) {
    DynamicWidthTextInputWidget.parent.call(this, config);
    this.$measure = $('<span>').css({
        position: 'absolute', visibility: 'hidden', whiteSpace: 'pre', fontSize: '14px', fontFamily: 'sans-serif',
    }).appendTo(document.body);  // Create a hidden element for measuring text width.
    this.$input.on('input', this.adjustWidth.bind(this));  // Bind the adjustWidth function to the 'input' event.
}

/**
 * 初始化動態寬度文本輸入框。在腳本啟動時執行一次。
 */
function initDynamicWidthTextInputWidget() {
    OO.inheritClass(DynamicWidthTextInputWidget, OO.ui.TextInputWidget);
    mw.util.addCSS('.DynamicWidthTextInputWidget { display: inline-block; vertical-align: baseline; width: auto; margin: 0; } .DynamicWidthTextInputWidget input { height: 20px !important; border: none !important; border-bottom: 2px solid #ccc !important; padding: 0 !important; text-align: center; } .DynamicWidthTextInputWidget input:focus { outline: none !important; box-shadow: none !important; border-bottom: 2px solid #36c !important; } .DynamicWidthTextInputWidget input:disabled { background-color: transparent !important; color: #101418 !important; -webkit-text-fill-color: #101418 !important; text-shadow: none !important; border-bottom: 2px solid #fff !important; }');
    DynamicWidthTextInputWidget.prototype.adjustWidth = function () {
        let text = this.getValue() || '';  // Get the current value; use placeholder if empty.
        this.$measure.text(text);  // Update the measurement element.
        let newWidth = this.$measure.width() + 5; // Add a bit of padding.
        this.$input.css('width', newWidth + 'px');  // Apply the new width to the input element.
    };
}

/**
 * 規則選框，附帶規則名和分數輸入框。
 * @param config
 * @constructor
 */
function RuleCheckboxInputWidget(config) {
    RuleCheckboxInputWidget.parent.call(this, config);
    this.ruleset = config.ruleset;
    this.nomidx = config.nomidx;
    this.check = config.check || false;
    if (!state.nominations[this.nomidx].ruleStatus[this.ruleset.rule]) {
        state.nominations[this.nomidx].ruleStatus[this.ruleset.rule] = {
            selected: this.isSelected(),
            desc: this.ruleset.desc,
            ogDesc: this.ruleset.desc,
            score: this.ruleset.score,
            maxScore: this.ruleset.score,
        };
    } else {
        this.setSelected(state.nominations[this.nomidx].ruleStatus[this.ruleset.rule].selected);
        if (!state.nominations[this.nomidx].ruleStatus[this.ruleset.rule].desc) {
            state.nominations[this.nomidx].ruleStatus[this.ruleset.rule].desc = this.ruleset.desc;
        }
        state.nominations[this.nomidx].ruleStatus[this.ruleset.rule].ogDesc = this.ruleset.desc;
        if (!state.nominations[this.nomidx].ruleStatus[this.ruleset.rule].score) {
            state.nominations[this.nomidx].ruleStatus[this.ruleset.rule].score = this.ruleset.score;
        }
        state.nominations[this.nomidx].ruleStatus[this.ruleset.rule].maxScore = this.ruleset.score;
    }
    this.ruleInputWidget = new DynamicWidthTextInputWidget({
        value: state.nominations[this.nomidx].ruleStatus[this.ruleset.rule].desc,
        disabled: this.check ? false : (!this.isSelected()),
    });
    this.ruleInputWidget.$element.addClass('DynamicWidthTextInputWidget');
    this.ruleInputWidget.$element.css({'margin-left': '5px'});
    this.ruleInputWidget.adjustWidth();
    this.leftBracketLabelWidget = new OO.ui.LabelWidget({label: '('});
    this.leftBracketLabelWidget.$element.css({
        'vertical-align': 'baseline', 'border-bottom': '2px solid #fff',
    });
    this.scoreInputWidget = new DynamicWidthTextInputWidget({
        value: state.nominations[this.nomidx].ruleStatus[this.ruleset.rule].score,
        disabled: this.check ? false : (!this.isSelected()),
    });
    this.scoreInputWidget.$element.addClass('DynamicWidthTextInputWidget');
    this.scoreInputWidget.adjustWidth();
    this.rightBracketLabelWidget = new OO.ui.LabelWidget({label: '分)'});
    this.rightBracketLabelWidget.$element.css({
        'vertical-align': 'baseline', 'border-bottom': '2px solid #fff', 'margin-right': '10px',
    });

    this.$element.append(this.ruleInputWidget.$element);
    this.$element.append(this.leftBracketLabelWidget.$element);
    this.$element.append(this.scoreInputWidget.$element);
    this.$element.append(this.rightBracketLabelWidget.$element);
    this.on('change', this.handleCheckboxChange.bind(this));
    this.ruleInputWidget.on('change', this.handleRuleInputChange.bind(this));
    this.scoreInputWidget.on('change', this.handleScoreInputChange.bind(this));
}

/**
 * 初始化規則選框。在腳本啟動時執行一次。
 */
function initRuleCheckboxInputWidget() {
    OO.inheritClass(RuleCheckboxInputWidget, OO.ui.CheckboxInputWidget);

    RuleCheckboxInputWidget.prototype.handleCheckboxChange = function (isChecked) {
        state.nominations[this.nomidx].ruleStatus[this.ruleset.rule].selected = isChecked;
        let disableCheck = this.check ? false : (!isChecked);
        this.ruleInputWidget.setDisabled(disableCheck);
        this.scoreInputWidget.setDisabled(disableCheck);
        if (disableCheck) {
            // 取消選取時，重設規則名和分數
            this.ruleInputWidget.setValue(this.ruleset.desc);
            this.ruleInputWidget.adjustWidth();
            this.scoreInputWidget.setValue(this.ruleset.score);
            this.scoreInputWidget.adjustWidth();
        }
    };
    RuleCheckboxInputWidget.prototype.handleRuleInputChange = function (newValue) {
        state.nominations[this.nomidx].ruleStatus[this.ruleset.rule].desc = newValue;
    };
    RuleCheckboxInputWidget.prototype.handleScoreInputChange = function (newValue) {
        state.nominations[this.nomidx].ruleStatus[this.ruleset.rule].score = parseFloat(newValue);
    };
}

/**
 * 生成提名表單。
 * @param {object} nomData 提名資料（非必須）。無資料時為新提名。
 * @returns {OO.ui.FieldsetLayout} 提名表單。
 */
function generateNominationFieldset(nomData = null) {
    let awarder, pageName, ruleStatus;
    if (nomData) {
        awarder = nomData.awarder;
        pageName = nomData.pageName;
        ruleStatus = nomData.ruleStatus;
    } else {
        awarder = mw.config.get('wgUserName');
        pageName = '';
        ruleStatus = {};
    }

    const currentNomidx = state.nominations.length;
    state.nominations.push({
        awarder: awarder, pageName: pageName, ruleStatus: ruleStatus,
    });

    // 得分者
    let userNameInput = new OO.ui.TextInputWidget({value: state.nominations[currentNomidx].awarder});
    userNameInput.on('change', function (newValue) {
        state.nominations[currentNomidx].awarder = newValue;
    });
    let userNameField = new OO.ui.FieldLayout(userNameInput, {
        label: state.convByVar({
            hant: '得分者', hans: '得分者',
        }), align: 'left',
    });

    // 條目名稱
    let pageNameInput = new OO.ui.TextInputWidget({value: state.nominations[currentNomidx].pageName});
    pageNameInput.on('change', function (newValue) {
        state.nominations[currentNomidx].pageName = newValue;
    });
    let pageNameField = new OO.ui.FieldLayout(pageNameInput, {
        label: state.convByVar({
            hant: '得分條目', hans: '得分条目',
        }), align: 'left', help: state.convByVar({
            hant: '可填「他薦」', hans: '可填「他荐」',
        }), helpInline: true,
    });

    // 提名理由
    let reasonFieldsetLayout = new OO.ui.FieldsetLayout();
    reasonFieldsetLayout.$element.css({'padding-top': '15px'});  // 讓理由區域與上方的輸入框有點距離

    let rules = NominationRules();
    for (let i = 0; i < rules.length; i++) {
        let ruleGroup = rules[i];
        let ruleGroupFieldset = new OO.ui.FieldsetLayout({
            label: ruleGroup.group, align: 'top', help: ruleGroup.explanation, helpInline: true,
        });

        if (ruleGroup.rules) {
            let ruleItems = [];
            for (let j = 0; j < ruleGroup.rules.length; j++) {
                let rule = ruleGroup.rules[j];
                let ruleCheckbox = new RuleCheckboxInputWidget({
                    value: rule.rule, ruleset: rule, nomidx: currentNomidx,
                });
                ruleItems.push(ruleCheckbox);
            }
            let horizontalLayout = new OO.ui.HorizontalLayout({items: ruleItems});
            ruleGroupFieldset.addItems(horizontalLayout);

        } else {
            // 處理 (5) 條目評審
            for (let j = 0; j < ruleGroup.tabs.length; j++) {
                let tab = ruleGroup.tabs[j];
                let tabFieldset = new OO.ui.FieldsetLayout({label: tab.tab});
                tabFieldset.$element.find('legend > span').css({'font-size': '1.05em'});

                let ruleItems = [];
                for (let k = 0; k < tab.rules.length; k++) {
                    let rule = tab.rules[k];
                    let ruleCheckbox = new RuleCheckboxInputWidget({
                        value: rule.rule, ruleset: rule, nomidx: currentNomidx,
                    });
                    ruleItems.push(ruleCheckbox);
                }
                let horizontalLayout = new OO.ui.HorizontalLayout({items: ruleItems});
                tabFieldset.addItems(horizontalLayout);
                ruleGroupFieldset.addItems([tabFieldset]);
            }
        }
        reasonFieldsetLayout.addItems([ruleGroupFieldset]);
    }

    let nominationFieldset = new OO.ui.FieldsetLayout({
        items: [
            userNameField, pageNameField, reasonFieldsetLayout,
        ],
    });
    nominationFieldset.$element.css({'margin-top': 0});

    if (!nomData) {
        let hr = $('<hr>').css({
            'margin-top': '15px', 'margin-bottom': '15px',
        });  // 頂部的 <hr>
        nominationFieldset.$element.prepend(hr);
    }

    return nominationFieldset;
}


/**
 * 生成提名檢查單。
 * @param nomData 提名資料。
 * @returns {OO.ui.FieldsetLayout} 提名檢查單。
 */
async function generateChecklistFieldset(nomData) {
    let awarder = nomData.awarder;
    let pageName = nomData.pageName;
    let ruleStatus = nomData.ruleStatus;
    state.nominations.push({
        awarder: awarder, pageName: pageName, ruleStatus: ruleStatus, invalid: false, message: '',
    });

    // 得分者
    let userNameLinkLabelWidget = new OO.ui.LabelWidget({label: $('<a>').attr('href', mw.util.getUrl('User:' + awarder)).text(awarder)});
    let userTalkLinkLabelWidget = new OO.ui.LabelWidget({
        label: $('<a>').attr('href', mw.util.getUrl('User talk:' + awarder)).text(state.convByVar({
            hant: '討論', hans: '讨论',
        })),
    });
    let userContribsLinkLabelWidget = new OO.ui.LabelWidget({
        label: $('<a>').attr('href', mw.util.getUrl('Special:用户贡献/' + awarder)).text(state.convByVar({
            hant: '貢獻', hans: '贡献',
        })),
    });
    let userNameHorizontalLayout = new OO.ui.HorizontalLayout({
        items: [
            userNameLinkLabelWidget,
            new OO.ui.LabelWidget({label: '（'}),
            userTalkLinkLabelWidget,
            new OO.ui.LabelWidget({label: '·'}),
            userContribsLinkLabelWidget,
            new OO.ui.LabelWidget({label: '）'}),
        ],
    });
    userNameHorizontalLayout.$element.css({
        'gap': '4px', 'width': '80%', 'flex-shrink': '0', 'flex-wrap': 'wrap',
    });
    let userNameLabelWidget = new OO.ui.LabelWidget({
        label: state.convByVar({
            hant: '得分者', hans: '得分者',
        }),
    });
    userNameLabelWidget.$element.css({
        'flex-grow': 1, 'align-self': 'stretch',
    });
    let userNameField = new OO.ui.HorizontalLayout({
        items: [
            userNameLabelWidget, userNameHorizontalLayout,
        ],
    });

    // 條目名稱
    let pageNameHorizontalLayout, pageNameLabelWidget;
    if (pageName === '他薦' || pageName === '他荐') {
        pageNameLabelWidget = new OO.ui.LabelWidget({
            label: state.convByVar({
                hant: '他薦', hans: '他荐',
            }),
        });
        pageNameHorizontalLayout = new OO.ui.HorizontalLayout({items: [pageNameLabelWidget]});
    } else {
        pageNameLabelWidget = new OO.ui.LabelWidget({label: $('<a>').attr('href', mw.util.getUrl(pageName)).text(pageName)});
        let pageTalkLabelWidget = new OO.ui.LabelWidget({
            label: $('<a>').attr('href', mw.util.getUrl('Talk:' + pageName)).text(state.convByVar({
                hant: '討論', hans: '讨论',
            })),
        });
        let pageHistoryLabelWidget = new OO.ui.LabelWidget({
            label: $('<a>').attr('href', mw.util.getUrl(pageName, {action: 'history'})).text(state.convByVar({
                hant: '歷史', hans: '历史',
            })),
        });
        let pagesLinkedToPageLabelWidget = new OO.ui.LabelWidget({
            label: $('<a>').attr('href', mw.util.getUrl('Special:链入页面/' + pageName)).text(state.convByVar({
                hant: '連入', hans: '链入',
            })),
        });
        // 更多頁面資訊 from XTools
        let xtoolsData = await getXToolsInfo(pageName);
        let xtoolsPageInfoLabelWidget = new OO.ui.LabelWidget({label: $('<div>').html(xtoolsData)});
        xtoolsPageInfoLabelWidget.$element.css({'font-size': '0.9em'});
        pageNameHorizontalLayout = new OO.ui.HorizontalLayout({
            items: [
                pageNameLabelWidget,
                new OO.ui.LabelWidget({label: '（'}),
                pageTalkLabelWidget,
                new OO.ui.LabelWidget({label: '·'}),
                pageHistoryLabelWidget,
                new OO.ui.LabelWidget({label: '·'}),
                pagesLinkedToPageLabelWidget,
                new OO.ui.LabelWidget({label: '）'}),
                xtoolsPageInfoLabelWidget,
            ],
        });
    }
    pageNameHorizontalLayout.$element.css({
        'gap': '4px', 'width': '80%', 'flex-shrink': '0', 'flex-wrap': 'wrap',
    });
    let pageLabelLabelWidget = new OO.ui.LabelWidget({
        label: state.convByVar({
            hant: '得分條目', hans: '得分条目',
        }),
    });
    pageLabelLabelWidget.$element.css({
        'flex-grow': 1, 'align-self': 'stretch',
    });
    let pageNameField = new OO.ui.HorizontalLayout({
        items: [
            pageLabelLabelWidget, pageNameHorizontalLayout,
        ],
    });
    pageNameField.$element.css({'margin-top': '15px'});

    // 提名無效
    let invalidToggleSwitchWidget = new OO.ui.ToggleSwitchWidget({value: false});
    invalidToggleSwitchWidget.on('change', function (isChecked) {
        state.nominations[0].invalid = isChecked;
    });
    let invalidField = new OO.ui.FieldLayout(invalidToggleSwitchWidget, {
        label: state.convByVar({
            hant: '提名無效', hans: '提名无效',
        }), align: 'left',
    });
    invalidField.$element.css({'margin-top': '15px'});
    invalidField.$element.addClass('checklist-field');

    // 提名理由
    let reasonField = new OO.ui.HorizontalLayout();
    reasonField.$element.css({'margin-top': '15px'});
    let reasonLabelWidget = new OO.ui.LabelWidget({
        label: state.convByVar({
            hant: '提名理由', hans: '提名理由',
        }),
    });
    reasonLabelWidget.$element.css({
        'flex-grow': 1, 'align-self': 'stretch',
    });

    let ruleItems = [];
    let {
        ruleNames, ruleDict,
    } = NominationRuleSet();
    let orderedRuleStatus = getOrderedRuleStatus(ruleNames, ruleStatus);
    for (const ruleItem of orderedRuleStatus) {
        let ruleSet = ruleDict[ruleItem.rule];
        let ruleCheckbox = new RuleCheckboxInputWidget({
            value: ruleItem.rule, ruleset: ruleSet, nomidx: 0, check: true,
        });
        ruleItems.push(ruleCheckbox);
    }
    let horizontalLayout = new OO.ui.HorizontalLayout({items: ruleItems});
    horizontalLayout.$element.css({
        'width': '80%', 'flex-shrink': '0', 'flex-wrap': 'wrap',
    });
    reasonField.addItems([
        reasonLabelWidget, horizontalLayout,
    ]);

    // 附加說明
    let messageInput = new OO.ui.MultilineTextInputWidget({
        autosize: true, rows: 1,
    });
    messageInput.on('change', function (newValue) {
        state.nominations[0].message = newValue;
    });
    messageInput.on('resize', function () {
        try {
            checkNominationDialog.updateSize();
        } catch (error) {
            console.error('[ACGATool] Error updating dialog size:', error);
        }
    });
    let messageField = new OO.ui.FieldLayout(messageInput, {
        label: state.convByVar({
            hant: '附加說明', hans: '附加说明',
        }), align: 'left', help: state.convByVar({
            hant: '可不填；無須簽名', hans: '可不填；无须签名',
        }), helpInline: true,
    });
    messageField.$element.css({'margin-top': '15px'});
    messageField.$element.addClass('checklist-field');

    let nominationFieldset = new OO.ui.FieldsetLayout({
        items: [
            userNameField, pageNameField, invalidField, reasonField, messageField,
        ],
    });
    nominationFieldset.$element.css({'margin-top': 0});
    return nominationFieldset;
}

/**
 * 新提名對話框。
 * @param config
 * @constructor
 */
function NewNominationDialog(config) {
    NewNominationDialog.super.call(this, config);
}

/**
 * 初始化新提名對話框。在腳本啟動時執行一次。
 */
function initNewNominationDialog() {
    OO.inheritClass(NewNominationDialog, OO.ui.ProcessDialog);

    NewNominationDialog.static.name = 'NewNominationDialog';
    NewNominationDialog.static.title = state.convByVar({
        hant: '新提名（維基ACG專題獎小工具）', hans: '新提名（维基ACG专题奖小工具）',
    });
    NewNominationDialog.static.actions = [
        {
            action: 'save', label: state.convByVar({
                hant: '儲存', hans: '储存',
            }), flags: [
                'primary', 'progressive',
            ],
        }, {
            action: 'cancel', label: state.convByVar({
                hant: '取消', hans: '取消',
            }), flags: 'safe',
        }, {
            action: 'add', label: state.convByVar({
                hant: '額外提名 + 1', hans: '额外提名 + 1',
            }),
        }, {
            action: 'minus', label: state.convByVar({
                hant: '額外提名 − 1', hans: '额外提名 − 1',
            }),
        },
    ];
    NewNominationDialog.prototype.initialize = function () {
        NewNominationDialog.super.prototype.initialize.call(this);
        this.panel = new OO.ui.PanelLayout({
            padded: true, expanded: false,
        });
        this.content = new OO.ui.FieldsetLayout();

        // 附加說明
        this.messageInput = new OO.ui.MultilineTextInputWidget({
            autosize: true, rows: 1,
        });
        this.messageInput.connect(this, {resize: 'onMessageInputResize'});
        this.messageInputField = new OO.ui.FieldLayout(this.messageInput, {
            label: state.convByVar({
                hant: '附加說明', hans: '附加说明',
            }), align: 'top', help: state.convByVar({
                hant: '可不填；無須簽名', hans: '可不填；无须签名',
            }), helpInline: true,
        });
        this.messageInputFieldSet = new OO.ui.FieldsetLayout({items: [this.messageInputField]});

        this.content.addItems([
            this.messageInputFieldSet, generateNominationFieldset(),
        ]);

        this.panel.$element.append(this.content.$element);
        this.$body.append(this.panel.$element);
    };

    NewNominationDialog.prototype.onMessageInputResize = function () {
        this.updateSize();
    };

    NewNominationDialog.prototype.getBodyHeight = function () {
        return this.panel.$element.outerHeight(true);
    };

    NewNominationDialog.prototype.getActionProcess = function (action) {
        if (action === 'save') {
            return new OO.ui.Process(async function () {
                let response = await saveNewNomination();
                if (!response) {
                    this.close();
                }
            }, this);
        } else if (action === 'add') {
            return new OO.ui.Process(function () {
                // 新增一個提名
                let newFieldset = generateNominationFieldset();
                this.content.addItems([newFieldset]);
                this.updateSize();
            }, this);
        } else if (action === 'minus') {
            return new OO.ui.Process(function () {
                if (this.content.items.length <= 2) {
                    mw.notify(state.convByVar({
                        hant: '至少需要一個提名！', hans: '至少需要一个提名！',
                    }), {
                        type: 'error', title: state.convByVar({
                            hant: '錯誤', hans: '错误',
                        }),
                    });
                    return;
                }
                // 移除最後一個提名
                this.content.removeItems([this.content.items[this.content.items.length - 1]]);
                state.nominations.pop();
                this.updateSize();
            }, this);
        } else if (action === 'cancel') {
            return new OO.ui.Process(function () {
                this.close();
            }, this);
        }
        return NewNominationDialog.super.prototype.getActionProcess.call(this, action);
    };

    NewNominationDialog.prototype.getTearnDownProcess = function (data) {
        return NewNominationDialog.super.prototype.getTearnDownProcess.call(this, data);
    };
}

/**
 * 顯示新提名對話框。
 */
export function showNewNominationDialog() {
    // 清空原有的items
    state.nominations.length = 0;

    newNominationDialog = new NewNominationDialog({
        size: 'large', padded: true, scrollable: true,
    });
    windowManager.addWindows([newNominationDialog]);
    windowManager.openWindow(newNominationDialog);
}

/**
 * 獲取新提名對話框中的附加說明內容。
 * @returns {string} 附加說明內容。
 */
export function getNewNominationDialogAdditionalMessage() {
    if (newNominationDialog) {
        return newNominationDialog.messageInput.getValue().trim();
    }
    console.log('[ACGATool] Warning: newNominationDialog is not initialized.');
    return '';
}

/**
 * 編輯提名對話框。
 * @param config
 * @constructor
 */
function EditNominationDialog(config) {
    EditNominationDialog.super.call(this, config);
}

/**
 * 初始化編輯提名對話框。在腳本啟動時執行一次。
 */
function initEditNominationDialog() {
    OO.inheritClass(EditNominationDialog, OO.ui.ProcessDialog);

    EditNominationDialog.static.name = 'EditNominationDialog';
    EditNominationDialog.static.title = state.convByVar({
        hant: '編輯提名（維基ACG專題獎小工具）', hans: '编辑提名（维基ACG专题奖小工具）',
    });
    EditNominationDialog.static.actions = [
        {
            action: 'save', label: state.convByVar({
                hant: '儲存', hans: '储存',
            }), flags: [
                'primary', 'progressive',
            ],
        }, {
            action: 'cancel', label: state.convByVar({
                hant: '取消', hans: '取消',
            }), flags: 'safe',
        },
    ];
    EditNominationDialog.prototype.initialize = function () {
        EditNominationDialog.super.prototype.initialize.call(this);
        this.panel = new OO.ui.PanelLayout({
            padded: true, expanded: false,
        });
        this.panel.$element.append(editNominationDialogContent.$element);
        this.$body.append(this.panel.$element);
    };

    EditNominationDialog.prototype.onMessageInputResize = function () {
        this.updateSize();
    };

    EditNominationDialog.prototype.getBodyHeight = function () {
        return this.panel.$element.outerHeight(true);
    };

    EditNominationDialog.prototype.getActionProcess = function (action) {
        if (action === 'save') {
            return new OO.ui.Process(async function () {
                let response = await saveModifiedNomination();
                if (!response) {
                    this.close();
                }
            }, this);
        } else if (action === 'cancel') {
            return new OO.ui.Process(function () {
                this.close();
            }, this);
        }
        return EditNominationDialog.super.prototype.getActionProcess.call(this, action);
    };

    EditNominationDialog.prototype.getTearnDownProcess = function (data) {
        return EditNominationDialog.super.prototype.getTearnDownProcess.call(this, data);
    };
}

/**
 * 顯示編輯提名對話框。
 * @param nomData 提名資料。
 */
export function showEditNominationDialog(nomData) {
    // 清空原有的items
    editNominationDialogContent.clearItems();
    state.nominations.length = 0;

    editNominationDialog = new EditNominationDialog({
        size: 'large', padded: true, scrollable: true,
    });

    // 加入新的items
    editNominationDialogContent.addItems([generateNominationFieldset(nomData)]);

    windowManager.addWindows([editNominationDialog]);
    windowManager.openWindow(editNominationDialog);
}

/**
 * 核分提名對話框。
 * @param config
 * @constructor
 */
function CheckNominationDialog(config) {
    CheckNominationDialog.super.call(this, config);
}

/**
 * 初始化核分提名對話框。在腳本啟動時執行一次。
 */
function initCheckNominationDialog() {
    OO.inheritClass(CheckNominationDialog, OO.ui.ProcessDialog);

    CheckNominationDialog.static.name = 'CheckNominationDialog';
    CheckNominationDialog.static.title = state.convByVar({
        hant: '核對分數（維基ACG專題獎小工具）', hans: '核对分数（维基ACG专题奖小工具）',
    });
    CheckNominationDialog.static.actions = [
        {
            action: 'save', label: state.convByVar({
                hant: '儲存', hans: '储存',
            }), flags: [
                'primary', 'progressive',
            ],
        }, {
            action: 'cancel', label: state.convByVar({
                hant: '取消', hans: '取消',
            }), flags: 'safe',
        },
    ];
    CheckNominationDialog.prototype.initialize = function () {
        CheckNominationDialog.super.prototype.initialize.call(this);
        this._header = this.$body.find('.oo-ui-processDialog-title');
        this.panel = new OO.ui.PanelLayout({
            padded: true, expanded: false,
        });
        this.panel.$element.append(checkNominationDialogContent.$element);
        this.$body.append(this.panel.$element);
    };

    CheckNominationDialog.prototype.getSetupProcess = function (data) {
        return CheckNominationDialog.super.prototype.getSetupProcess.call(this, data)
            .next(function () {
                if (data.title) {
                    this._header.innerText = data.title;
                }
            }, this);
    };

    CheckNominationDialog.prototype.onMessageInputResize = function () {
        this.updateSize();
    };

    CheckNominationDialog.prototype.getBodyHeight = function () {
        return this.panel.$element.outerHeight(true);
    };

    CheckNominationDialog.prototype.getActionProcess = function (action) {
        if (action === 'save') {
            return new OO.ui.Process(async function () {
                let response = await saveNominationCheck();
                if (!response) {
                    this.close();
                }
            }, this);
        } else if (action === 'cancel') {
            return new OO.ui.Process(function () {
                this.close();
            }, this);
        }
        return CheckNominationDialog.super.prototype.getActionProcess.call(this, action);
    };

    CheckNominationDialog.prototype.getTearnDownProcess = function (data) {
        return CheckNominationDialog.super.prototype.getTearnDownProcess.call(this, data);
    };

    mw.util.addCSS('.checklist-field .oo-ui-fieldLayout-field { width: 80% !important; }');
}

/**
 * 顯示核分提名對話框。
 * @param nomData 提名資料。
 * @param multiCheckStatus 多選核對狀態字串。
 */
export async function showCheckNominationDialog(nomData, multiCheckStatus) {
    // 清空原有的items
    checkNominationDialogContent.clearItems();
    state.nominations.length = 0;

    checkNominationDialog = new CheckNominationDialog({
        size: 'large', padded: true, scrollable: true,
    });

    // 加入新的items
    const field = await generateChecklistFieldset(nomData);
    checkNominationDialogContent.addItems([field]);

    windowManager.addWindows([checkNominationDialog]);

    const instance = windowManager.openWindow(checkNominationDialog, multiCheckStatus ? {
        title: state.convByVar({
            hant: '核對分數，' + multiCheckStatus + '（維基ACG專題獎小工具）',
            hans: '核对分数，' + multiCheckStatus + '（维基ACG专题奖小工具）',
        }),
    } : undefined);
    await instance.closed;
}
