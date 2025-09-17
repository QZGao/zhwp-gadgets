// Main page: [[User:SuperGrey/gadgets/ACGATool]]

(function () {
    const ACGATool = {
        /**
         * 維基ACG專題獎提名規則。
         * @returns {object} 包含規則組的對象。
         */
        NominationRules: function () {
            return [
                {
                    group: ACGATool.convByVar({
                        hant: '(1) 內容擴充',
                        hans: '(1) 内容扩充',
                    }),
                    rules: [
                        {
                            rule: '1a',
                            desc: ACGATool.convByVar({
                                hant: '短新增',
                                hans: '短新增',
                            }),
                            score: 1,
                        },
                        {
                            rule: '1b',
                            desc: ACGATool.convByVar({
                                hant: '中新增',
                                hans: '中新增',
                            }),
                            score: 2,
                        },
                        {
                            rule: '1c',
                            desc: ACGATool.convByVar({
                                hant: '長新增',
                                hans: '长新增',
                            }),
                            score: 3,
                        },
                    ],
                    explanation: ACGATool.convByVar({
                        hant: '鼓勵編者新增或擴充條目內容。新內容達 2 kB 為「短新增」，達 3 kB 為「中新增」，達 5 kB 為「長新增」。',
                        hans: '新增或扩充条目内容。新内容达 2 kB 为「短新增」，达 3 kB 为「中新增」，达 5 kB 为「长新增」。',
                    }),
                },
                {
                    group: ACGATool.convByVar({
                        hant: '(2) 品質提升',
                        hans: '(2) 品质提升',
                    }),
                    rules: [
                        {
                            rule: '2-c',
                            desc: ACGATool.convByVar({
                                hant: '丙級',
                                hans: '丙级',
                            }),
                            score: 1,
                        },
                        {
                            rule: '2-b',
                            desc: ACGATool.convByVar({
                                hant: '乙級',
                                hans: '乙级',
                            }),
                            score: 3,
                        },
                        {
                            rule: '2-ga',
                            desc: ACGATool.convByVar({
                                hant: '優良',
                                hans: '优良',
                            }),
                            score: 5,
                        },
                        {
                            rule: '2-fa',
                            desc: ACGATool.convByVar({
                                hant: '典特',
                                hans: '典特',
                            }),
                            score: 10,
                        },
                    ],
                    explanation: ACGATool.convByVar({
                        hant: '鼓勵編者以條目品質評級為標準，提升條目品質。由缺失條目、小作品、初級提升至丙級為「丙級」，由丙級提升至乙級為「乙級」，由乙級提升至優良為「優良」，由優良提升至典範（特色）為「典特」。跨級品質提升，則多選所有符合項。',
                        hans: '以条目品质评级为标准，提升条目品质。由缺失条目、小作品、初级提升至丙级为「丙级」，由丙级提升至乙级为「乙级」，由乙级提升至优良为「优良」，由优良提升至典范（特色）为「典特」。跨级品质提升，则多选所有符合项。',
                    }),
                },
                {
                    group: ACGATool.convByVar({
                        hant: '(3) 格式',
                        hans: '(3) 格式',
                    }),
                    rules: [
                        {
                            rule: '3',
                            desc: ACGATool.convByVar({
                                hant: '格式',
                                hans: '格式',
                            }),
                            score: 1,
                        },
                    ],
                    explanation: ACGATool.convByVar({
                        hant: '鼓勵編者創作整潔的條目。對於未滿 5 級創作獎的編者，條目應採用 ref 格式搭配 Cite 家族模板列出來源，引文沒有格式錯誤；對於已滿 5 級創作獎的有經驗編者，條目須行文通順、符合命名常規、遵循格式手冊。此項得分需依附於項目 1 或 2，不可單獨申請。',
                        hans: '鼓励编辑者创作整洁的条目。对于未满 5 级创作奖的编辑者，条目应采用 ref 格式搭配 Cite 家族模板列出来源，引文没有格式错误；对于已满 5 级创作奖的有经验编辑者，条目须行文通顺、符合命名常规、遵循格式手册。此项得分需依附于项目 1 或 2，不可单独申请。',
                    }),
                },
                {
                    group: ACGATool.convByVar({
                        hant: '(4) 編輯活動',
                        hans: '(4) 编辑活动',
                    }),
                    rules: [
                        {
                            rule: '4',
                            desc: ACGATool.convByVar({
                                hant: '活動',
                                hans: '活动',
                            }),
                            score: 1,
                        },
                        {
                            rule: '4-req',
                            desc: ACGATool.convByVar({
                                hant: '請求',
                                hans: '请求',
                            }),
                            score: 1,
                        },
                        {
                            rule: '4-dyk',
                            desc: ACGATool.convByVar({
                                hant: 'DYK',
                                hans: 'DYK',
                            }),
                            score: 1,
                        },
                        {
                            rule: '4-req-game',
                            desc: ACGATool.convByVar({
                                hant: '請求·遊戲',
                                hans: '请求·游戏',
                            }),
                            score: 1,
                        },
                        {
                            rule: '4-req-ac',
                            desc: ACGATool.convByVar({
                                hant: '請求·動漫',
                                hans: '请求·动漫',
                            }),
                            score: 1,
                        },
                    ],
                    explanation: ACGATool.convByVar({
                        hant: '鼓勵編者參加社群或專題活動。可單獨申請的活動：新條目推薦、拯救典優條目。須依附於項目 1 或 2，不可單獨申請的活動：動漫及電子遊戲條目請求、基礎條目擴充挑戰、編輯松、動員令。提名時請手動編輯規則，註明所參與活動。',
                        hans: '鼓励编辑者参加社群或专题活动。可单独申请的活动：新条目推荐、拯救典优条目。须依附于项目 1 或 2，不可单独申请的活动：动漫及电子游戏条目请求、基础条目扩充挑战、编辑松、动员令。提名时请手动编辑规则，注明所参与活动。',
                    }),
                },
                {
                    group: ACGATool.convByVar({
                        hant: '(5) 條目評審',
                        hans: '(5) 条目评审',
                    }),
                    tabs: [
                        {
                            tab: ACGATool.convByVar({
                                hant: '泛用評審',
                                hans: '泛用评审',
                            }),
                            rules: [
                                {
                                    rule: '5',
                                    desc: ACGATool.convByVar({
                                        hant: '評審',
                                        hans: '评审',
                                    }),
                                    score: 1,
                                },
                                {
                                    rule: '5-half',
                                    desc: ACGATool.convByVar({
                                        hant: '快評',
                                        hans: '快评',
                                    }),
                                    score: 0.5,
                                },
                                {
                                    rule: '5a',
                                    desc: ACGATool.convByVar({
                                        hant: '文筆評審',
                                        hans: '文笔评审',
                                    }),
                                    score: 1,
                                },
                                {
                                    rule: '5a-half',
                                    desc: ACGATool.convByVar({
                                        hant: '文筆快評',
                                        hans: '文笔快评',
                                    }),
                                    score: 0.5,
                                },
                                {
                                    rule: '5b',
                                    desc: ACGATool.convByVar({
                                        hant: '覆蓋面評審',
                                        hans: '覆盖面评审',
                                    }),
                                    score: 1,
                                },
                                {
                                    rule: '5b-half',
                                    desc: ACGATool.convByVar({
                                        hant: '覆蓋面快評',
                                        hans: '覆盖面快评',
                                    }),
                                    score: 0.5,
                                },
                                {
                                    rule: '5c',
                                    desc: ACGATool.convByVar({
                                        hant: '來源格式評審',
                                        hans: '来源格式评审',
                                    }),
                                    score: 1,
                                },
                                {
                                    rule: '5c-half',
                                    desc: ACGATool.convByVar({
                                        hant: '來源格式快評',
                                        hans: '来源格式快评',
                                    }),
                                    score: 0.5,
                                },
                                {
                                    rule: '5x',
                                    desc: ACGATool.convByVar({
                                        hant: '完整評審',
                                        hans: '完整评审',
                                    }),
                                    score: 3,
                                },
                            ],
                        },
                        {
                            tab: ACGATool.convByVar({
                                hant: '乙級(乙上級)內容評審',
                                hans: '乙级(乙上级)内容评审',
                            }),
                            rules: [
                                {
                                    rule: '5-bcr',
                                    desc: ACGATool.convByVar({
                                        hant: '乙級評審',
                                        hans: '乙级评审',
                                    }),
                                    score: 1,
                                },
                                {
                                    rule: '5-bcr-half',
                                    desc: ACGATool.convByVar({
                                        hant: '乙級快評',
                                        hans: '乙级快评',
                                    }),
                                    score: 0.5,
                                },
                                {
                                    rule: '5a-bcr',
                                    desc: ACGATool.convByVar({
                                        hant: '乙級文筆評審',
                                        hans: '乙级文笔评审',
                                    }),
                                    score: 1,
                                },
                                {
                                    rule: '5a-bcr-half',
                                    desc: ACGATool.convByVar({
                                        hant: '乙級文筆快評',
                                        hans: '乙级文笔快评',
                                    }),
                                    score: 0.5,
                                },
                                {
                                    rule: '5b-bcr',
                                    desc: ACGATool.convByVar({
                                        hant: '乙級覆蓋面評審',
                                        hans: '乙级覆盖面评审',
                                    }),
                                    score: 1,
                                },
                                {
                                    rule: '5b-bcr-half',
                                    desc: ACGATool.convByVar({
                                        hant: '乙級覆蓋面快評',
                                        hans: '乙级覆盖面快评',
                                    }),
                                    score: 0.5,
                                },
                                {
                                    rule: '5c-bcr',
                                    desc: ACGATool.convByVar({
                                        hant: '乙級來源格式評審',
                                        hans: '乙级来源格式评审',
                                    }),
                                    score: 1,
                                },
                                {
                                    rule: '5c-bcr-half',
                                    desc: ACGATool.convByVar({
                                        hant: '乙級來源格式快評',
                                        hans: '乙级来源格式快评',
                                    }),
                                    score: 0.5,
                                },
                                {
                                    rule: '5x-bcr',
                                    desc: ACGATool.convByVar({
                                        hant: '完整乙級評審',
                                        hans: '完整乙级评审',
                                    }),
                                    score: 3,
                                },
                            ],
                        },
                        {
                            tab: ACGATool.convByVar({
                                hant: '優良內容評審',
                                hans: '优良内容评审',
                            }),
                            rules: [
                                {
                                    rule: '5-gan',
                                    desc: ACGATool.convByVar({
                                        hant: '優良評審',
                                        hans: '优良评审',
                                    }),
                                    score: 1,
                                },
                                {
                                    rule: '5-gan-half',
                                    desc: ACGATool.convByVar({
                                        hant: '優良快評',
                                        hans: '优良快评',
                                    }),
                                    score: 0.5,
                                },
                                {
                                    rule: '5a-gan',
                                    desc: ACGATool.convByVar({
                                        hant: '優良文筆評審',
                                        hans: '优良文笔评审',
                                    }),
                                    score: 1,
                                },
                                {
                                    rule: '5a-gan-half',
                                    desc: ACGATool.convByVar({
                                        hant: '優良文筆快評',
                                        hans: '优良文笔快评',
                                    }),
                                    score: 0.5,
                                },
                                {
                                    rule: '5b-gan',
                                    desc: ACGATool.convByVar({
                                        hant: '優良覆蓋面評審',
                                        hans: '优良覆盖面评审',
                                    }),
                                    score: 1,
                                },
                                {
                                    rule: '5b-gan-half',
                                    desc: ACGATool.convByVar({
                                        hant: '優良覆蓋面快評',
                                        hans: '优良覆盖面快评',
                                    }),
                                    score: 0.5,
                                },
                                {
                                    rule: '5c-gan',
                                    desc: ACGATool.convByVar({
                                        hant: '優良來源格式評審',
                                        hans: '优良来源格式评审',
                                    }),
                                    score: 1,
                                },
                                {
                                    rule: '5c-gan-half',
                                    desc: ACGATool.convByVar({
                                        hant: '優良來源格式快評',
                                        hans: '优良来源格式快评',
                                    }),
                                    score: 0.5,
                                },
                                {
                                    rule: '5x-gan',
                                    desc: ACGATool.convByVar({
                                        hant: '完整優良評審',
                                        hans: '完整优良评审',
                                    }),
                                    score: 3,
                                },
                            ],
                        },
                        {
                            tab: ACGATool.convByVar({
                                hant: '甲級內容評審',
                                hans: '甲级内容评审',
                            }),
                            rules: [
                                {
                                    rule: '5-acr',
                                    desc: ACGATool.convByVar({
                                        hant: '甲級評審',
                                        hans: '甲级评审',
                                    }),
                                    score: 2,
                                },
                                {
                                    rule: '5-acr-half',
                                    desc: ACGATool.convByVar({
                                        hant: '甲級快評',
                                        hans: '甲级快评',
                                    }),
                                    score: 1,
                                },
                                {
                                    rule: '5a-acr',
                                    desc: ACGATool.convByVar({
                                        hant: '甲級文筆評審',
                                        hans: '甲级文笔评审',
                                    }),
                                    score: 2,
                                },
                                {
                                    rule: '5a-acr-half',
                                    desc: ACGATool.convByVar({
                                        hant: '甲級文筆快評',
                                        hans: '甲级文笔快评',
                                    }),
                                    score: 1,
                                },
                                {
                                    rule: '5b-acr',
                                    desc: ACGATool.convByVar({
                                        hant: '甲級覆蓋面評審',
                                        hans: '甲级覆盖面评审',
                                    }),
                                    score: 2,
                                },
                                {
                                    rule: '5b-acr-half',
                                    desc: ACGATool.convByVar({
                                        hant: '甲級覆蓋面快評',
                                        hans: '甲级覆盖面快评',
                                    }),
                                    score: 1,
                                },
                                {
                                    rule: '5c-acr',
                                    desc: ACGATool.convByVar({
                                        hant: '甲級來源格式評審',
                                        hans: '甲级来源格式评审',
                                    }),
                                    score: 2,
                                },
                                {
                                    rule: '5c-acr-half',
                                    desc: ACGATool.convByVar({
                                        hant: '甲級來源格式快評',
                                        hans: '甲级来源格式快评',
                                    }),
                                    score: 1,
                                },
                                {
                                    rule: '5x-acr',
                                    desc: ACGATool.convByVar({
                                        hant: '完整甲級評審',
                                        hans: '完整甲级评审',
                                    }),
                                    score: 6,
                                },
                            ],
                        },
                        {
                            tab: ACGATool.convByVar({
                                hant: '典範(特色)內容評審',
                                hans: '典范(特色)内容评审',
                            }),
                            rules: [
                                {
                                    rule: '5-fac',
                                    desc: ACGATool.convByVar({
                                        hant: '典特評審',
                                        hans: '典特评审',
                                    }),
                                    score: 2,
                                },
                                {
                                    rule: '5-fac-half',
                                    desc: ACGATool.convByVar({
                                        hant: '典特快評',
                                        hans: '典特快评',
                                    }),
                                    score: 1,
                                },
                                {
                                    rule: '5a-fac',
                                    desc: ACGATool.convByVar({
                                        hant: '典特文筆評審',
                                        hans: '典特文笔评审',
                                    }),
                                    score: 2,
                                },
                                {
                                    rule: '5a-fac-half',
                                    desc: ACGATool.convByVar({
                                        hant: '典特文筆快評',
                                        hans: '典特文笔快评',
                                    }),
                                    score: 1,
                                },
                                {
                                    rule: '5b-fac',
                                    desc: ACGATool.convByVar({
                                        hant: '典特覆蓋面評審',
                                        hans: '典特覆盖面评审',
                                    }),
                                    score: 2,
                                },
                                {
                                    rule: '5b-fac-half',
                                    desc: ACGATool.convByVar({
                                        hant: '典特覆蓋面快評',
                                        hans: '典特覆盖面快评',
                                    }),
                                    score: 1,
                                },
                                {
                                    rule: '5c-fac',
                                    desc: ACGATool.convByVar({
                                        hant: '典特來源格式評審',
                                        hans: '典特来源格式评审',
                                    }),
                                    score: 2,
                                },
                                {
                                    rule: '5c-fac-half',
                                    desc: ACGATool.convByVar({
                                        hant: '典特來源格式快評',
                                        hans: '典特来源格式快评',
                                    }),
                                    score: 1,
                                },
                                {
                                    rule: '5x-fac',
                                    desc: ACGATool.convByVar({
                                        hant: '完整典特評審',
                                        hans: '完整典特评审',
                                    }),
                                    score: 6,
                                },
                            ],
                        },
                    ],
                    explanation: ACGATool.convByVar({
                        hant: '鼓勵維基人評審他人主編的條目。條目評審分為三大層面：文筆、覆蓋面、來源和格式。不完整評審（快評）折半得分。',
                        hans: '鼓励维基人评审他人主编的条目。条目评审分为三大层面：文笔、覆盖面、来源和格式。不完整评审（快评）折半得分。',
                    }),
                },
                {
                    group: ACGATool.convByVar({
                        hant: '(6) 媒體',
                        hans: '(6) 媒体',
                    }),
                    rules: [
                        {
                            rule: '6',
                            desc: ACGATool.convByVar({
                                hant: '媒體',
                                hans: '媒体',
                            }),
                            score: 3,
                        },
                        {
                            rule: '6-fp',
                            desc: ACGATool.convByVar({
                                hant: '特色圖片',
                                hans: '特色图片',
                            }),
                            score: 5,
                        },
                    ],
                    explanation: ACGATool.convByVar({
                        hant: '鼓勵編者上載與 ACG 專題相關的自由版權媒體檔案至 Wikimedia Commons。若檔案當選特色圖片，額外加 5 分。',
                        hans: '鼓励编辑者上传与 ACG 专题相关的自由版权媒体文件至 Wikimedia Commons。若文件当选特色图片，额外加 5 分。',
                    }),
                },
                {
                    group: ACGATool.convByVar({
                        hant: '(7) 他薦',
                        hans: '(7) 他荐',
                    }),
                    rules: [
                        {
                            rule: '7',
                            desc: ACGATool.convByVar({
                                hant: '他薦',
                                hans: '他荐',
                            }),
                            score: 0.5,
                        },
                    ],
                    explanation: ACGATool.convByVar({
                        hant: '鼓勵維基人提名他人。每有效提名他人 1 次得 0.5 分，每人每月最多得 5 分。若多次得分，請按照規則編輯自定義分數。',
                        hans: '鼓励维基人提名他人。每有效提名他人 1 次得 0.5 分，每人每月最多得 5 分。若多次得分，请按照规则编辑自定义分数。',
                    }),
                },
                {
                    group: ACGATool.convByVar({
                        hant: '(8) 其他',
                        hans: '(8) 其他',
                    }),
                    rules: [
                        {
                            rule: '8',
                            desc: ACGATool.convByVar({
                                hant: '其他',
                                hans: '其他',
                            }),
                            score: 0,
                        },
                    ],
                    explanation: ACGATool.convByVar({
                        hant: '獎勵維基人做出的其他難以量化的貢獻，如大量整理格式條目、上載作品封面、製作模板、制定寫作方案、維護資料庫等。請手動編輯規則名稱、自定義分數，並附上說明。最終具體得分將由與專題成員共同商討得出。',
                        hans: '奖励维基人做出的其他难以量化的贡献，如大量整理格式条目、上传作品封面、制作模板、制定写作方案、维护数据库等。请手动编辑规则名称、自定义分数，并附上说明。最终具体得分将由与专题成员共同商讨得出。',
                    }),
                },
            ];
        },

        /**
         * 提名規則別名。
         * @returns {object} 包含別名的對象。
         */
        NominationRuleAliases: function () {
            return {
                '2a': '2-c',
                'c': '2-c',
                '2b': '2-b',
                'b': '2-b',
                '2c': '2-ga',
                'ga': '2-ga',
                '2d': '2-fa',
                'fa': '2-fa',
                '4a': '4-dyk',
                'dyk': '4-dyk',
                '4p': '4-req',
                '4p-game': '4-req-game',
                '4p-ac': '4-req-ac',
                'fp': '6-fp',
            };
        },

        /**
         * 提名規則集合。
         * @returns {object} 包含規則名稱和規則對象的對象。
         */
        NominationRuleSet: function () {
            let ruleNames = [];
            let ruleDict = {};
            for (let ruleGroup of ACGATool.NominationRules()) {
                if (ruleGroup.rules) {
                    for (let ruleSet of ruleGroup.rules) {
                        ruleNames.push(ruleSet.rule);
                        ruleDict[ruleSet.rule] = ruleSet;
                    }
                } else if (ruleGroup.tabs) {
                    for (let tab of ruleGroup.tabs) {
                        for (let ruleSet of tab.rules) {
                            ruleNames.push(ruleSet.rule);
                            ruleDict[ruleSet.rule] = ruleSet;
                        }
                    }
                }
            }
            return {
                ruleNames: ruleNames,
                ruleDict: ruleDict,
            };
        },

        /**
         * 獲取排序後的規則狀態。
         * @param ruleNames 即 NominationRuleSet().ruleNames。
         * @param ruleStatus 規則狀態對象。
         * @returns {Array} 包含排序後的規則狀態對象的數組。
         */
        getOrderedRuleStatus: function (ruleNames, ruleStatus) {
            return ruleNames.filter(rule => ruleStatus.hasOwnProperty(rule)).map(rule => ({rule, ...ruleStatus[rule]}));
        },

        /**
         * 獲取完整的wikitext。
         * @param {string} pageName 頁面名稱，默認為「WikiProject:ACG/維基ACG專題獎/登記處」。
         * @returns {Promise<string>} 包含完整wikitext的Promise。
         */
        getFullText: async function (pageName) {
            let response = await ACGATool.api.get({
                action: 'query',
                titles: pageName || 'WikiProject:ACG/維基ACG專題獎/登記處',
                prop: 'revisions',
                rvslots: '*',
                rvprop: 'content',
                indexpageids: 1,
            });
            return response.query.pages[response.query.pageids[0]].revisions[0].slots.main['*'];
        },

        /**
         * Trims a token’s text and adjusts its absolute boundaries (skipping leading/trailing whitespace).
         * @param {object} token An object with properties { text, start, end }.
         * @returns {object} An object with properties { text, start, end } after trimming.
         */
        trimToken: function (token) {
            const leadingMatch = token.text.match(/^\s*/);
            const trailingMatch = token.text.match(/\s*$/);
            const leading = leadingMatch ? leadingMatch[0].length : 0;
            const trailing = trailingMatch ? trailingMatch[0].length : 0;
            return {
                text: token.text.trim(),
                start: token.start + leading,
                end: token.end - trailing,
            };
        },

        /**
         * Splits the inner content of a template into tokens by detecting top-level "\n|" delimiters.
         * It scans the inner text (tracking nested braces) and splits only when it sees a newline followed by "|".
         * @param {string} innerContent The content between the outer "{{" and "}}".
         * @param {number} offset The absolute start position of innerContent in the wikitext.
         * @returns {Array} An array of tokens; each token is an object { text, start, end }.
         */
        splitParameters: function (innerContent, offset) {
            let tokens = [];
            let lastIndex = 0;
            let braceCount = 0;
            let i = 0;
            while (i < innerContent.length) {
                if (innerContent.substr(i, 2) === '{{') {
                    braceCount++;
                    i += 2;
                    continue;
                }
                if (innerContent.substr(i, 2) === '}}') {
                    braceCount = Math.max(braceCount - 1, 0);
                    i += 2;
                    continue;
                }
                // At top level, if we see a newline followed by a pipe, split here.
                if (braceCount === 0 && innerContent[i] === '\n' && innerContent[i + 1] === '|') {
                    tokens.push({
                        text: innerContent.slice(lastIndex, i),
                        start: offset + lastIndex,
                        end: offset + i,
                    });
                    i += 2; // skip the "\n|"
                    lastIndex = i;
                    continue;
                }
                i++;
            }
            tokens.push({
                text: innerContent.slice(lastIndex),
                start: offset + lastIndex,
                end: offset + innerContent.length,
            });
            return tokens;
        },

        /**
         * Finds the matching closing braces "}}" for a template that starts at the given index.
         * @param {string} text The full wikitext.
         * @param {number} start The starting index where "{{" is found.
         * @returns {object} An object { endIndex } where endIndex is the index immediately after the closing "}}".
         */
        findTemplateEnd: function (text, start) {
            let braceCount = 0;
            let i = start;
            while (i < text.length) {
                if (text.substr(i, 2) === '{{') {
                    braceCount++;
                    i += 2;
                    continue;
                }
                if (text.substr(i, 2) === '}}') {
                    braceCount--;
                    i += 2;
                    if (braceCount === 0) break;
                    continue;
                }
                i++;
            }
            return {endIndex: i};
        },

        /**
         * Parses a template starting at the given index in the wikitext.
         * For regular {{ACG提名}} templates, parameters are parsed as key=value pairs (with special handling for nested extras).
         * For simpler {{ACG提名2}} templates, parameters are parsed as key=value pairs. The keys are expected to have a trailing number (e.g. 條目名稱1, 用戶名稱1, etc.); entries are grouped by that number.
         * @param {string} text The full wikitext.
         * @param {number} start The starting index of the template (expects "{{").
         * @returns {object} An object { template, endIndex }.
         */
        parseTemplate: function (text, start) {
            const templateStart = start;
            const {endIndex: templateEnd} = ACGATool.findTemplateEnd(text, start);
            // Extract inner content (between outer "{{" and "}}").
            const innerStart = start + 2;
            const innerEnd = templateEnd - 2;
            const innerContent = text.slice(innerStart, innerEnd);
            // Split the inner content into tokens using the top-level "\n|" delimiter.
            const tokens = ACGATool.splitParameters(innerContent, innerStart);
            // The first token is the template name.
            let nameToken = ACGATool.trimToken(tokens[0]);
            let templateObj = {
                name: nameToken.text,
                nameLocation: {
                    start: nameToken.start,
                    end: nameToken.end,
                },
                params: {},
                location: {
                    start: templateStart,
                    end: templateEnd,
                },
            };

            if (templateObj.name.startsWith("ACG提名2")) {
                // For ACG提名2, process tokens as key=value pairs.
                // Group parameters by their trailing number.
                let kvGroups = {};
                for (let j = 1; j < tokens.length; j++) {
                    let token = tokens[j];
                    let tokenTrim = ACGATool.trimToken(token);
                    if (tokenTrim.text === "") continue;
                    const eqIndex = tokenTrim.text.indexOf('=');
                    if (eqIndex === -1) continue;
                    let rawKey = tokenTrim.text.substring(0, eqIndex);
                    let rawValue = tokenTrim.text.substring(eqIndex + 1);
                    let keyText = rawKey.trim();
                    let valueText = rawValue.trim();
                    let keyLeading = rawKey.match(/^\s*/)[0].length;
                    let keyLocation = {
                        start: tokenTrim.start + keyLeading,
                        end: tokenTrim.start + keyLeading + keyText.length,
                    };
                    let valueLeading = rawValue.match(/^\s*/)[0].length;
                    let valueLocation = {
                        start: tokenTrim.start + eqIndex + 1 + valueLeading,
                        end: tokenTrim.end,
                    };
                    // Expect keys in the form: prefix + number, e.g. "條目名稱1", "用戶名稱1", etc.
                    let m = keyText.match(/^(.+?)(\d+)$/);
                    if (m) {
                        let prefix = m[1].trim(); // e.g. "條目名稱"
                        let num = parseInt(m[2], 10);
                        if (!kvGroups[num]) kvGroups[num] = {};
                        kvGroups[num][prefix] = {
                            value: valueText,
                            keyLocation: keyLocation,
                            valueLocation: valueLocation,
                            fullLocation: {
                                start: token.start,
                                end: token.end,
                            },
                        };
                    } else {
                        // If the key doesn't match the expected pattern, store it under group "0".
                        if (!kvGroups["0"]) kvGroups["0"] = {};
                        kvGroups["0"][keyText] = {
                            value: valueText,
                            keyLocation: keyLocation,
                            valueLocation: valueLocation,
                            fullLocation: {
                                start: token.start,
                                end: token.end,
                            },
                        };
                    }
                }
                let entries = [];
                let groupNums = Object.keys(kvGroups).filter(k => k !== "0").map(Number).sort((a, b) => a - b);
                for (let num of groupNums) {
                    let group = kvGroups[num];
                    let allTokens = Object.values(group);
                    let startPos = Math.min(...allTokens.map(t => t.fullLocation.start));
                    let endPos = Math.max(...allTokens.map(t => t.fullLocation.end));
                    group.fullLocation = {
                        start: startPos,
                        end: endPos,
                    };
                    entries.push(group);
                }
                templateObj.entries = entries;
            } else {
                // For regular ACG提名, process tokens as key=value pairs (or positional parameters).
                for (let j = 1; j < tokens.length; j++) {
                    let token = tokens[j];
                    let tokenTrim = ACGATool.trimToken(token);
                    if (tokenTrim.text === "") continue; // skip empty tokens
                    const eqIndex = tokenTrim.text.indexOf('=');
                    if (eqIndex !== -1) {
                        // Split into key and value without including the "=" in the value.
                        let rawKey = tokenTrim.text.substring(0, eqIndex);
                        let rawValue = tokenTrim.text.substring(eqIndex + 1);
                        let keyText = rawKey.trim();
                        let valueText = rawValue.trim();
                        // Compute absolute positions for key and value.
                        let keyLeading = rawKey.match(/^\s*/)[0].length;
                        let keyLocation = {
                            start: tokenTrim.start + keyLeading,
                            end: tokenTrim.start + keyLeading + keyText.length,
                        };
                        let valueLeading = rawValue.match(/^\s*/)[0].length;
                        let valueLocation = {
                            start: tokenTrim.start + eqIndex + 1 + valueLeading,
                            end: tokenTrim.end,
                        };
                        templateObj.params[keyText] = {
                            value: valueText,
                            keyLocation: keyLocation,
                            valueLocation: valueLocation,
                            fullLocation: {
                                start: token.start,
                                end: token.end,
                            },
                        };
                    } else {
                        // Positional parameter.
                        templateObj.params[j] = {
                            value: tokenTrim.text,
                            fullLocation: {
                                start: token.start,
                                end: token.end,
                            },
                        };
                    }
                }
                // Special handling for the "額外提名" parameter.
                if (templateObj.params['額外提名']) {
                    const extraParam = templateObj.params['額外提名'];
                    extraParam.nestedTemplates = ACGATool.parseMultipleTemplates(text, extraParam.valueLocation.start, extraParam.valueLocation.end);
                }
            }
            return {
                template: templateObj,
                endIndex: templateEnd,
            };
        },

        /**
         * Parses nested extra templates from the given region of text.
         * This function uses a regex to capture any occurrence of "{{ACG提名/extra" that appears at
         * the beginning of the region or is preceded by a newline.
         * @param {string} text The full wikitext.
         * @param {number} regionStart The start index of the region.
         * @param {number} regionEnd The end index of the region.
         * @returns {Array} An array of parsed extra template objects.
         */
        parseMultipleTemplates: function (text, regionStart, regionEnd) {
            const templates = [];
            const regionText = text.slice(regionStart, regionEnd);
            // Regex: match either start of string (^) or a newline, then capture "{{ACG提名/extra"
            const regex = /(^|\n)({{ACG提名\/extra)/g;
            let match;
            while ((match = regex.exec(regionText)) !== null) {
                // Calculate the actual absolute start position of the extra template.
                let extraStart = regionStart + match.index + match[1].length;
                const {
                    template,
                    endIndex,
                } = ACGATool.parseTemplate(text, extraStart);
                templates.push(template);
                // Advance regex.lastIndex so that we do not match inside the parsed template.
                regex.lastIndex = endIndex - regionStart;
            }
            return templates;
        },

        /**
         * Returns an array of date sections from the full wikitext.
         * Each section is determined by h3 headings of the form "=== date ===".
         * @param {string} text The full wikitext.
         * @returns {Array} Array of sections: { date, start, end }.
         */
        getDateSections: function (text) {
            const regex = /^===\s*(.+?)\s*===/gm;
            let sections = [];
            let matches = [];
            let match;
            while ((match = regex.exec(text)) !== null) {
                matches.push({
                    date: match[1].trim(),
                    start: match.index,
                    end: regex.lastIndex,
                });
            }
            for (let i = 0; i < matches.length; i++) {
                const sectionStart = matches[i].start;
                const sectionDate = matches[i].date;
                const sectionEnd = (i < matches.length - 1) ? matches[i + 1].start : text.length;
                sections.push({
                    date: sectionDate,
                    start: sectionStart,
                    end: sectionEnd,
                });
            }
            return sections;
        },

        /**
         * In a given date section (from h3 heading to before the next h3), collects all entries.
         * Each entry is either a main template ({{ACG提名}}), a nested extra template, or an entry from {{ACG提名2}}.
         * @param {string} text The full wikitext.
         * @param {object} section A section object { date, start, end }.
         * @returns {Array} Array of entry objects: { template, start, end, type }.
         */
        collectEntriesInSection: function (text, section) {
            let entries = [];
            const sectionText = text.slice(section.start, section.end);
            // Regex: match either {{ACG提名2 or {{ACG提名 (but not /extra)
            const regex = /{{(?:ACG提名2|ACG提名(?!\/extra))/g;
            let match;
            while ((match = regex.exec(sectionText)) !== null) {
                let absolutePos = section.start + match.index;
                let {
                    template,
                    endIndex,
                } = ACGATool.parseTemplate(text, absolutePos);
                if (template.name.startsWith("ACG提名2")) {
                    // For ACG提名2, add each grouped entry.
                    if (template.entries) {
                        for (let entry of template.entries) {
                            entries.push({
                                template: entry, // entry holds the grouped key-value parameters
                                start: entry.fullLocation.start,
                                end: entry.fullLocation.end,
                                type: 'acg2',
                            });
                        }
                    }
                } else {
                    // For regular ACG提名
                    entries.push({
                        template: template,
                        start: template.location.start,
                        end: template.location.end,
                        type: 'main',
                    });
                    if (template.params['額外提名'] && template.params['額外提名'].nestedTemplates) {
                        for (let nested of template.params['額外提名'].nestedTemplates) {
                            entries.push({
                                template: nested,
                                start: nested.location.start,
                                end: nested.location.end,
                                type: 'extra',
                            });
                        }
                    }
                }
                // Advance regex.lastIndex to avoid reparsing inside this template.
                regex.lastIndex = endIndex - section.start;
            }
            // Sort entries in order of appearance.
            entries.sort((a, b) => a.start - b.start);
            return entries;
        },

        /**
         * Queries the full wikitext for an entry given a specific date (from the h3 heading)
         * and an entry index (1-based, counting all entries in order).
         * Returns the entry object including its location.
         * @param {string} text The full wikitext.
         * @param {string} date The date string (e.g. "2月3日").
         * @param {number} index The 1-based index of the entry under that date.
         * @returns {object|null} The entry object { template, start, end, type } or null if not found.
         */
        queryEntry: function (text, date, index) {
            const sections = ACGATool.getDateSections(text);
            const targetSection = sections.find(sec => sec.date === date);
            if (!targetSection) return null;
            const entries = ACGATool.collectEntriesInSection(text, targetSection);
            if (index < 1 || index > entries.length) return null;
            return entries[index - 1]; // 1-based index
        },

        /**
         * Given an entry (from queryEntry) and a set of changes (mapping parameter key to new value),
         * updates only those parameter values in the original wikitext by using the precise location data.
         * This function does not replace the entire entry substring—only the changed parameter values.
         *
         * For main or extra entries, changes should be provided as an object where keys are parameter names
         * (e.g. "條目名稱") and values are the new text.
         *
         * For ACG提名2 entries, use keys like "條目名稱", "用戶名稱", "提名理由", "核對用", etc.
         *
         * @param {string} original The full original wikitext.
         * @param {object} entry The entry object (from queryEntry).
         * @param {object} changes An object mapping parameter keys to new values.
         * @returns {string} The updated wikitext.
         */
        updateEntryParameters: function (original, entry, changes) {
            let mods = [];
            if (entry.type === 'main' || entry.type === 'extra') {
                let params = entry.template.params;
                for (let key in changes) {
                    if (params[key] && params[key].valueLocation) {
                        mods.push({
                            start: params[key].valueLocation.start,
                            end: params[key].valueLocation.end,
                            replacement: changes[key],
                        });
                    }
                }
            } else if (entry.type === 'acg2') {
                // For ACG提名2 grouped entry, keys are like "條目名稱1", "用戶名稱1", etc.
                for (let key in changes) {
                    if (entry.template[key]) {
                        let token = entry.template[key];
                        // Use token.valueLocation for precise updating.
                        mods.push({
                            start: token.valueLocation.start,
                            end: token.valueLocation.end,
                            replacement: changes[key],
                        });
                    }
                }
            }
            // Apply modifications in descending order of start position.
            mods.sort((a, b) => b.start - a.start);
            let updated = original;
            for (let mod of mods) {
                updated = updated.slice(0, mod.start) + mod.replacement + updated.slice(mod.end);
            }
            return updated;
        },

        /**
         * Removes comments from the given text.
         * @param text {string} The text to remove comments from.
         * @returns {string} The text without comments.
         */
        removeComments: function (text) {
            text = text.replace(/<!--.*?-->/gs, '');
            return text.trim();
        },

        /**
         * 根據用戶的提名理由，解析出規則狀態。
         * @param reason {string} 用戶的提名理由。
         * @returns {object} 規則狀態。
         */
        parseUserReason: function (reason) {
            reason = ACGATool.removeComments(reason);
            let ruleStatus = {};
            if (reason.startsWith('{{ACG提名2/request|ver=1|')) {
                reason = reason.slice('{{ACG提名2/request|ver=1|'.length, -2);
            }
            let reasonList = reason.split(/\s+/);

            let ruleSet = ACGATool.NominationRuleSet();
            let ruleNames = ruleSet.ruleNames;
            let ruleAliases = ACGATool.NominationRuleAliases();
            for (let rule of reasonList) {
                if (rule.endsWith('?')) {
                    // 最後一個字符是?，可直接去掉?
                    rule = rule.slice(0, -1);
                }
                // 名稱和分數的自定義
                let ruleNameMod = '',
                    ruleScoreMod = '';
                while (rule.endsWith(')') || rule.endsWith(']')) {
                    if (rule.endsWith(')')) {
                        let lastLeftParen = rule.lastIndexOf('(');
                        if (lastLeftParen === -1) break;
                        ruleNameMod = rule.slice(lastLeftParen + 1, -1);
                        rule = rule.slice(0, lastLeftParen);
                    }
                    if (rule.endsWith(']')) {
                        let lastLeftBracket = rule.lastIndexOf('[');
                        if (lastLeftBracket === -1) break;
                        ruleScoreMod = rule.slice(lastLeftBracket + 1, -1);
                        rule = rule.slice(0, lastLeftBracket);
                    }
                }
                if (rule === '') continue;
                if (ruleAliases[rule]) {  // 是否是別名
                    rule = ruleAliases[rule];
                }
                if (ruleNames.includes(rule)) {  // 是否在提名規則中
                    ruleStatus[rule] = {selected: true};
                    if (ruleNameMod !== '') {
                        ruleStatus[rule].desc = ruleNameMod;
                    }
                    if (ruleScoreMod !== '') {
                        ruleStatus[rule].score = parseFloat(ruleScoreMod);
                        if (isNaN(ruleStatus[rule].score)) {
                            console.log('[ACGATool] 分數不是數字', ruleScoreMod);  // 分數不是數字，報錯
                            return null;
                        }
                    }
                } else {
                    console.log('[ACGATool] 不在提名規則中', rule);  // 不在提名規則中，報錯
                    return null;
                }
            }
            return ruleStatus;
        },

        /**
         * 將queried（查詢結果）轉換為nomData（提名數據）。
         * @param queried {object} 查詢結果。
         * @returns {object} 提名數據。
         */
        queried2NomData: function (queried) {
            let nomData = {};

            if (queried.type === 'main' || queried.type === 'extra') {
                let params = queried.template.params;
                nomData.pageName = params['條目名稱'].value;
                nomData.awarder = params['用戶名稱'].value;
                let reasonWikitext = params['提名理由'].value;
                nomData.ruleStatus = ACGATool.parseUserReason(reasonWikitext);
                if (nomData.ruleStatus == null) {
                    return null;
                }
                return nomData;
            } else if (queried.type === 'acg2') {
                let params = queried.template;
                nomData.pageName = ACGATool.removeComments(params['條目名稱'].value);
                nomData.awarder = ACGATool.removeComments(params['用戶名稱'].value);
                let reasonWikitext = params['提名理由'].value;
                nomData.ruleStatus = ACGATool.parseUserReason(reasonWikitext);
                if (nomData.ruleStatus == null) {
                    return null;
                }
                return nomData;
            } else {
                return null;
            }
        },

        /**
         * 點擊編輯按鈕時的事件處理。
         * @param date 日期（章節標題）
         * @param index 該章節下第X個提名
         */
        editNomination: function (date, index) {
            ACGATool.getFullText().then(function (fulltext) {
                ACGATool.queried = ACGATool.queryEntry(fulltext, date, index);
                let nomData = ACGATool.queried2NomData(ACGATool.queried);
                if (nomData == null) {
                    mw.notify(ACGATool.convByVar({
                        hant: '小工具無法讀取該提名，請手動編輯。',
                        hans: '小工具无法读取该提名，请手动编辑。',
                    }), {
                        type: 'error',
                        title: ACGATool.convByVar({
                            hant: '錯誤',
                            hans: '错误',
                        }),
                    });
                } else {
                    ACGATool.showEditNominationDialog(nomData);
                }
            });
        },

        /**
         * 點擊核對按鈕時的事件處理。
         * @param date 日期（章節標題）
         * @param index 該章節下第X個提名
         * @param multiCheckStatus 多選核對狀態字串
         * @return {Promise} 返回一個Promise，當核對完成時解析。
         */
        checkNomination: async function (date, index, multiCheckStatus) {
            const fulltext = await ACGATool.getFullText();
            ACGATool.queried = ACGATool.queryEntry(fulltext, date, index);
            const nomData = ACGATool.queried2NomData(ACGATool.queried);
            if (nomData == null) {
                mw.notify(ACGATool.convByVar({
                    hant: '小工具無法讀取該提名，請手動編輯。',
                    hans: '小工具无法读取该提名，请手动编辑。',
                }), {
                    type: 'error',
                    title: ACGATool.convByVar({
                        hant: '錯誤',
                        hans: '错误',
                    }),
                });
                return;
            }
            await ACGATool.showCheckNominationDialog(nomData, multiCheckStatus);
        },

        /**
         * 批量核對提名的事件處理。
         * 遍歷所有帶有 multi-nomCheck 類別的元素，為每個元素添加一個多選核對的複選框和按鈕。
         * 當按下「開始大量核對」按鈕時，會遍歷所有選中的複選框，並對每個選中的提名進行核對。
         * 如果沒有選中任何複選框，則顯示警告通知。
         * 當核對完成後，如果有任何提名被修改，則刷新頁面。
         */
        multiCheckNomination: function () {
            $('.multi-nomCheck').each(function () {
                let $this = $(this);
                let checkbox = $('<input type="checkbox" class="multi-nomCheck-checkbox">');
                checkbox.data('date', $this.data('date'));
                checkbox.data('index', $this.data('index'));
                checkbox.on('change', function () {
                    if ($(this).is(':checked')) {
                        // Change the background color of ancestor <td> to light green.
                        $this.closest('td').css('background-color', '#d4edda');
                    } else {
                        // Reset the background color of ancestor <td> to default.
                        $this.closest('td').css('background-color', '');
                    }
                });
                let startCheckingButton = $('<a>').text(ACGATool.convByVar({
                    hant: '開始批次核對',
                    hans: '开始批量核对',
                })).addClass('multi-nomCheck-startBtn').attr('href', '#');
                startCheckingButton.on('click', async function (e) {
                    e.preventDefault();
                    const $checkboxes = $('.multi-nomCheck-checkbox:checked');
                    if (!$checkboxes.length) {
                        mw.notify(ACGATool.convByVar({
                            hant: '請至少選擇一個提名進行核對。',
                            hans: '请至少选择一个提名进行核对。',
                        }), {
                            type: 'warning',
                            title: ACGATool.convByVar({
                                hant: '提示',
                                hans: '提示',
                            }),
                        });
                        return;
                    }
                    ACGATool.multiNomCheckOngoing = true;
                    ACGATool.multiNomCheckChanged = false;
                    for (let i = 0; i < $checkboxes.length; i++) {
                        const $checkbox = $($checkboxes[i]);
                        const date = $checkbox.data('date');
                        const index = $checkbox.data('index');
                        const status = `${i + 1}/${$checkboxes.length}`;
                        await ACGATool.checkNomination(date, index, status);
                    }
                    ACGATool.multiNomCheckOngoing = false;
                    if (ACGATool.multiNomCheckChanged) {
                        ACGATool.refreshPage();
                    }
                });
                $this.empty(); // 清空之前的內容
                $this.append(checkbox);
                $this.append(' ');
                $this.append(startCheckingButton);
            });
        },

        /**
         * 點擊登記新提名按鈕時的事件處理。
         */
        newNomination: function () {
            ACGATool.showNewNominationDialog();
        },

        /**
         * 點擊歸檔按鈕時的事件處理。
         */
        archiveChapter: function (date) {
            OO.ui.confirm(ACGATool.convByVar({
                hant: '確定要歸檔「',
                hans: '确定要归档「',
            }) + date + ACGATool.convByVar({
                hant: '」章節嗎？',
                hans: '」章节吗？',
            })).done(function (confirmed) {
                if (confirmed) {
                    ACGATool.getFullText().then(function (fulltext) {
                        let sections = ACGATool.getDateSections(fulltext);
                        let targetSection = sections.find(sec => sec.date === date);
                        if (!targetSection) {
                            mw.notify(ACGATool.convByVar({
                                hant: '小工具無法讀取該章節，請手動歸檔。',
                                hans: '小工具无法读取该章节，请手动归档。',
                            }), {
                                type: 'error',
                                title: ACGATool.convByVar({
                                    hant: '錯誤',
                                    hans: '错误',
                                }),
                            });
                            return;
                        }
                        let sectionText = fulltext.slice(targetSection.start, targetSection.end);
                        let fulltextWithoutSection = fulltext.slice(0, targetSection.start) + fulltext.slice(targetSection.end);

                        // 找到包含年份的UTC字串，例如 2025年2月13日 (四) 20:58 (UTC)
                        let utcRegex = /提名人：.+?(\d{4})年(\d{1,2})月(\d{1,2})日 \((.*?)\) (\d{1,2}:\d{2}) \(UTC\)/;
                        let utcMatch = sectionText.match(utcRegex);
                        if (!utcMatch) {
                            mw.notify(ACGATool.convByVar({
                                hant: '小工具無法讀取該章節的UTC時間，請手動歸檔。',
                                hans: '小工具无法读取该章节的UTC时间，请手动归档。',
                            }), {
                                type: 'error',
                                title: ACGATool.convByVar({
                                    hant: '錯誤',
                                    hans: '错误',
                                }),
                            });
                            return;
                        }
                        // 獲得 X年Y月
                        let yearMonth = utcMatch[1] + '年' + utcMatch[2] + '月';
                        let archiveTarget = 'WikiProject:ACG/維基ACG專題獎/存檔/' + yearMonth;

                        mw.notify(ACGATool.convByVar({
                            hant: '小工具正在歸檔中，請耐心等待。',
                            hans: '小工具正在归档中，请耐心等待。',
                        }), {
                            type: 'info',
                            title: ACGATool.convByVar({
                                hant: '提示',
                                hans: '提示',
                            }),
                            autoHide: false,
                        });

                        // 先檢查新的存檔頁面是否存在
                        ACGATool.api.get({
                            action: 'query',
                            titles: archiveTarget,
                            prop: 'revisions',
                            rvslots: '*',
                            rvprop: 'content',
                            indexpageids: 1,
                        }).done(function (data) {
                            if (data.query.pageids[0] && (data.query.pages[data.query.pageids[0]].missing !== undefined || data.query.pages[data.query.pageids[0]].revisions[0].slots.main['*'].trim() === '')) {
                                // 新的存檔頁面不存在或者是空的
                                // 將存檔頁頭加入 sectionText
                                sectionText = '{{Talk archive|WikiProject:ACG/維基ACG專題獎/登記處}}\n\n' + sectionText;
                            } else {
                                // 直接歸檔，補充空行
                                sectionText = '\n\n' + sectionText;
                            }
                            ACGATool.api.postWithToken('csrf', {
                                action: 'edit',
                                title: archiveTarget,
                                appendtext: sectionText,
                                summary: '[[User:SuperGrey/gadgets/ACGATool|' + ACGATool.convByVar({
                                    hant: '歸檔',
                                    hans: '归档',
                                }) + ']]「' + date + '」' + ACGATool.convByVar({
                                    hant: '章節',
                                    hans: '章节',
                                }),
                            }).done(function () {
                                ACGATool.api.postWithToken('csrf', {
                                    action: 'edit',
                                    title: 'WikiProject:ACG/維基ACG專題獎/登記處',
                                    text: fulltextWithoutSection,
                                    summary: '[[User:SuperGrey/gadgets/ACGATool|' + ACGATool.convByVar({
                                        hant: '歸檔',
                                        hans: '归档',
                                    }) + ']]「' + date + '」' + ACGATool.convByVar({
                                        hant: '章節至',
                                        hans: '章节至',
                                    }) + '「[[' + archiveTarget + ']]」',
                                }).done(function () {
                                    mw.notify(ACGATool.convByVar({
                                        hant: '小工具已歸檔',
                                        hans: '小工具已归档',
                                    }) + '「' + date + '」' + ACGATool.convBysVar({
                                        hant: '章節至',
                                        hans: '章节至',
                                    }) + '「[[' + archiveTarget + ']]」', {
                                        type: 'success',
                                        title: ACGATool.convByVar({
                                            hant: '成功',
                                            hans: '成功',
                                        }),
                                    });
                                    ACGATool.refreshPage();  // 刷新頁面
                                }).fail(function (error) {
                                    console.log(error);
                                    mw.notify(ACGATool.convByVar({
                                        hant: '小工具無法歸檔，請手動歸檔。',
                                        hans: '小工具无法归档，请手动归档。',
                                    }), {
                                        type: 'error',
                                        title: ACGATool.convByVar({
                                            hant: '錯誤',
                                            hans: '错误',
                                        }),
                                    });
                                });
                            }).fail(function (error) {
                                console.log(error);
                                mw.notify(ACGATool.convByVar({
                                    hant: '小工具無法歸檔，請手動歸檔。',
                                    hans: '小工具无法归档，请手动归档。',
                                }), {
                                    type: 'error',
                                    title: ACGATool.convByVar({
                                        hant: '錯誤',
                                        hans: '错误',
                                    }),
                                });
                            });
                        });
                    });
                }
            });
        },

        /**
         * 在頁面上添加編輯按鈕。
         */
        addEditButtonsToPage: function () {
            // 找到<span role"button">登記新提名</span>
            let newNominationButton = $('span[role="button"]').filter(function () {
                return $(this).text() === '登記新提名' || $(this).text() === '登记新提名';
            });
            if (newNominationButton.length > 0) {
                // 修改原本按鈕的文本為「手動登記新提名」
                newNominationButton.text(ACGATool.convByVar({
                    hant: '手動登記新提名',
                    hans: '手动登记新提名',
                }));
                newNominationButton.removeClass('mw-ui-progressive');

                // 父節點的父節點是<span>，在後面加入編輯按鈕
                let newNominationButtonParent = newNominationButton.parent().parent();
                let editUIButton = $('<span>').addClass('mw-ui-button').addClass('mw-ui-progressive').attr('role', 'button').text(ACGATool.convByVar({
                    hant: '登記新提名',
                    hans: '登记新提名',
                }));
                let editButton = $('<a>').attr('href', 'javascript:void(0)').append(editUIButton).click(ACGATool.newNomination);
                newNominationButtonParent.append(' ').append(editButton);
            }

            // 識別所有h3
            $('div.mw-heading3').each(function () {
                let h3div = $(this);
                let h3 = h3div.find('h3').first();
                let date = h3.text().trim();
                let index = 0;

                // 為h3div底下的span.mw-editsection添加歸檔按鈕
                let editsection = h3div.find('span.mw-editsection').first();
                let editsectionA = editsection.find('a').first();
                $('<a>').attr('href', 'javascript:void(0)').click(function () {
                    ACGATool.archiveChapter(date);
                }).append(ACGATool.convByVar({
                    hant: '歸檔',
                    hans: '归档',
                })).insertAfter(editsectionA);
                $('<span>&nbsp;|&nbsp;</span>').insertAfter(editsectionA);

                h3div.nextUntil('div.mw-heading3', 'table.acgnom-table').each(function () {
                    let table = $(this);
                    let rows = table.find('tr').slice(1);  // 去掉表頭
                    let title = "";
                    rows.each(function () {
                        let row = $(this);
                        let th = row.find('th');
                        if (th.length !== 0) {
                            // 提名行
                            let nomEntry = th.first();
                            let nomEntryA = nomEntry.find('a');
                            if (nomEntryA.length !== 0) {
                                title = nomEntry.find('a').first().attr('title');
                            } else {
                                title = nomEntry.text().trim();
                            }
                            ++index;

                            // 加入編輯按鈕
                            let editIcon = $('<img>').attr('src', 'https://upload.wikimedia.org/wikipedia/commons/8/8a/OOjs_UI_icon_edit-ltr-progressive.svg').css({'width': '12px'});
                            const currentIndex = index;
                            let editButton = $('<a>').attr('href', 'javascript:void(0)').append(editIcon).click(function () {
                                ACGATool.editNomination(date, currentIndex);
                            });
                            nomEntry.append(' ').append(editButton);
                        } else {
                            // 核對行
                            let td = row.find('td').first();
                            let mwNoTalk = td.find('.mw-notalk').first();
                            const currentIndex = index;

                            // 單項核對
                            let checkIcon = $('<img>').attr('src', 'https://upload.wikimedia.org/wikipedia/commons/3/30/OOjs_UI_icon_highlight-progressive.svg').css({
                                'width': '12px',
                                'vertical-align': 'sub',
                            });
                            let checkButton = $('<a>').css({
                                'display': 'inline-block',
                                'margin-left': '5px',
                                'font-size': '.857em',
                                'font-weight': 'bold',
                            }).append(checkIcon).append(' ').append(ACGATool.convByVar({
                                hant: '核對',
                                hans: '核对',
                            })).attr('href', 'javascript:void(0)').click(function () {
                                ACGATool.checkNomination(date, currentIndex);
                            });
                            mwNoTalk.append(checkButton);

                            // 多選核對
                            let multiCheckDiv = $('<div>')
                                .addClass('multi-nomCheck')
                                .attr('data-date', date)
                                .attr('data-index', currentIndex)
                                .css({
                                    'display': 'inline-block',
                                    'margin-left': '5px',
                                    'font-size': '.857em',
                                });
                            let multiCheckButton = $('<a>').attr('href', 'javascript:void(0)').text(ACGATool.convByVar({
                                hant: '多選',
                                hans: '多选',
                            })).click(function () {
                                ACGATool.multiCheckNomination();
                            });
                            multiCheckDiv.append(multiCheckButton);
                            mwNoTalk.append(multiCheckDiv);
                        }
                    });
                });
            });
        },

        /**
         * 動態寬度文本輸入框。
         * @param config
         * @constructor
         */
        DynamicWidthTextInputWidget: function (config) {
            ACGATool.DynamicWidthTextInputWidget.parent.call(this, config);
            this.$measure = $('<span>').css({
                position: 'absolute',
                visibility: 'hidden',
                whiteSpace: 'pre',
                fontSize: '14px',
                fontFamily: 'sans-serif',
            }).appendTo(document.body);  // Create a hidden element for measuring text width.
            this.$input.on('input', this.adjustWidth.bind(this));  // Bind the adjustWidth function to the 'input' event.
        },

        /**
         * 初始化動態寬度文本輸入框。在腳本啟動時執行一次。
         */
        initDynamicWidthTextInputWidget: function () {
            OO.inheritClass(ACGATool.DynamicWidthTextInputWidget, OO.ui.TextInputWidget);
            mw.util.addCSS('.DynamicWidthTextInputWidget { display: inline-block; vertical-align: baseline; width: auto; margin: 0; } .DynamicWidthTextInputWidget input { height: 20px !important; border: none !important; border-bottom: 2px solid #ccc !important; padding: 0 !important; text-align: center; } .DynamicWidthTextInputWidget input:focus { outline: none !important; box-shadow: none !important; border-bottom: 2px solid #36c !important; } .DynamicWidthTextInputWidget input:disabled { background-color: transparent !important; color: #101418 !important; -webkit-text-fill-color: #101418 !important; text-shadow: none !important; border-bottom: 2px solid #fff !important; }');
            ACGATool.DynamicWidthTextInputWidget.prototype.adjustWidth = function () {
                let text = this.getValue() || '';  // Get the current value; use placeholder if empty.
                this.$measure.text(text);  // Update the measurement element.
                let newWidth = this.$measure.width() + 5; // Add a bit of padding.
                this.$input.css('width', newWidth + 'px');  // Apply the new width to the input element.
            };
        },

        /**
         * 規則選框，附帶規則名和分數輸入框。
         * @param config
         * @constructor
         */
        RuleCheckboxInputWidget: function (config) {
            ACGATool.RuleCheckboxInputWidget.parent.call(this, config);
            this.ruleset = config.ruleset;
            this.nomidx = config.nomidx;
            this.check = config.check || false;
            if (!ACGATool.nominations[this.nomidx].ruleStatus[this.ruleset.rule]) {
                ACGATool.nominations[this.nomidx].ruleStatus[this.ruleset.rule] = {
                    selected: this.isSelected(),
                    desc: this.ruleset.desc,
                    ogDesc: this.ruleset.desc,
                    score: this.ruleset.score,
                    maxScore: this.ruleset.score,
                };
            } else {
                this.setSelected(ACGATool.nominations[this.nomidx].ruleStatus[this.ruleset.rule].selected);
                if (!ACGATool.nominations[this.nomidx].ruleStatus[this.ruleset.rule].desc) {
                    ACGATool.nominations[this.nomidx].ruleStatus[this.ruleset.rule].desc = this.ruleset.desc;
                }
                ACGATool.nominations[this.nomidx].ruleStatus[this.ruleset.rule].ogDesc = this.ruleset.desc;
                if (!ACGATool.nominations[this.nomidx].ruleStatus[this.ruleset.rule].score) {
                    ACGATool.nominations[this.nomidx].ruleStatus[this.ruleset.rule].score = this.ruleset.score;
                }
                ACGATool.nominations[this.nomidx].ruleStatus[this.ruleset.rule].maxScore = this.ruleset.score;
            }
            this.ruleInputWidget = new ACGATool.DynamicWidthTextInputWidget({
                value: ACGATool.nominations[this.nomidx].ruleStatus[this.ruleset.rule].desc,
                disabled: this.check ? false : (!this.isSelected()),
            });
            this.ruleInputWidget.$element.addClass('DynamicWidthTextInputWidget');
            this.ruleInputWidget.$element.css({'margin-left': '5px'});
            this.ruleInputWidget.adjustWidth();
            this.leftBracketLabelWidget = new OO.ui.LabelWidget({label: '('});
            this.leftBracketLabelWidget.$element.css({
                'vertical-align': 'baseline',
                'border-bottom': '2px solid #fff',
            });
            this.scoreInputWidget = new ACGATool.DynamicWidthTextInputWidget({
                value: ACGATool.nominations[this.nomidx].ruleStatus[this.ruleset.rule].score,
                disabled: this.check ? false : (!this.isSelected()),
            });
            this.scoreInputWidget.$element.addClass('DynamicWidthTextInputWidget');
            this.scoreInputWidget.adjustWidth();
            this.rightBracketLabelWidget = new OO.ui.LabelWidget({label: '分)'});
            this.rightBracketLabelWidget.$element.css({
                'vertical-align': 'baseline',
                'border-bottom': '2px solid #fff',
                'margin-right': '10px',
            });

            this.$element.append(this.ruleInputWidget.$element);
            this.$element.append(this.leftBracketLabelWidget.$element);
            this.$element.append(this.scoreInputWidget.$element);
            this.$element.append(this.rightBracketLabelWidget.$element);
            this.on('change', this.handleCheckboxChange.bind(this));
            this.ruleInputWidget.on('change', this.handleRuleInputChange.bind(this));
            this.scoreInputWidget.on('change', this.handleScoreInputChange.bind(this));
        },

        /**
         * 初始化規則選框。在腳本啟動時執行一次。
         */
        initRuleCheckboxInputWidget: function () {
            OO.inheritClass(ACGATool.RuleCheckboxInputWidget, OO.ui.CheckboxInputWidget);

            ACGATool.RuleCheckboxInputWidget.prototype.handleCheckboxChange = function (isChecked) {
                ACGATool.nominations[this.nomidx].ruleStatus[this.ruleset.rule].selected = isChecked;
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
            ACGATool.RuleCheckboxInputWidget.prototype.handleRuleInputChange = function (newValue) {
                ACGATool.nominations[this.nomidx].ruleStatus[this.ruleset.rule].desc = newValue;
            };
            ACGATool.RuleCheckboxInputWidget.prototype.handleScoreInputChange = function (newValue) {
                ACGATool.nominations[this.nomidx].ruleStatus[this.ruleset.rule].score = parseFloat(newValue);
            };
        },

        /**
         * 生成提名表單。
         * @param {object} nomData 提名資料（非必須）。無資料時為新提名。
         * @returns {OO.ui.FieldsetLayout} 提名表單。
         */
        generateNominationFieldset: function (nomData) {
            let awarder,
                pageName,
                ruleStatus;
            if (nomData) {
                awarder = nomData.awarder;
                pageName = nomData.pageName;
                ruleStatus = nomData.ruleStatus;
            } else {
                awarder = mw.config.get('wgUserName');
                pageName = '';
                ruleStatus = {};
            }

            const currentNomidx = ACGATool.nominations.length;
            ACGATool.nominations.push({
                awarder: awarder,
                pageName: pageName,
                ruleStatus: ruleStatus,
            });

            // 得分者
            let userNameInput = new OO.ui.TextInputWidget({value: ACGATool.nominations[currentNomidx].awarder});
            userNameInput.on('change', function (newValue) {
                ACGATool.nominations[currentNomidx].awarder = newValue;
            });
            let userNameField = new OO.ui.FieldLayout(userNameInput, {
                label: ACGATool.convByVar({
                    hant: '得分者',
                    hans: '得分者',
                }),
                align: 'left',
            });

            // 條目名稱
            let pageNameInput = new OO.ui.TextInputWidget({value: ACGATool.nominations[currentNomidx].pageName});
            pageNameInput.on('change', function (newValue) {
                ACGATool.nominations[currentNomidx].pageName = newValue;
            });
            let pageNameField = new OO.ui.FieldLayout(pageNameInput, {
                label: ACGATool.convByVar({
                    hant: '得分條目',
                    hans: '得分条目',
                }),
                align: 'left',
                help: ACGATool.convByVar({
                    hant: '可填「他薦」',
                    hans: '可填「他荐」',
                }),
                helpInline: true,
            });

            // 提名理由
            let reasonFieldsetLayout = new OO.ui.FieldsetLayout();
            reasonFieldsetLayout.$element.css({'padding-top': '15px'});  // 讓理由區域與上方的輸入框有點距離

            let NominationRules = ACGATool.NominationRules();
            for (let i = 0; i < NominationRules.length; i++) {
                let ruleGroup = NominationRules[i];
                let ruleGroupFieldset = new OO.ui.FieldsetLayout({
                    label: ruleGroup.group,
                    align: 'top',
                    help: ruleGroup.explanation,
                    helpInline: true,
                });

                if (ruleGroup.rules) {
                    let ruleItems = [];
                    for (let j = 0; j < ruleGroup.rules.length; j++) {
                        let rule = ruleGroup.rules[j];
                        let ruleCheckbox = new ACGATool.RuleCheckboxInputWidget({
                            value: rule.rule,
                            ruleset: rule,
                            nomidx: currentNomidx,
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
                            let ruleCheckbox = new ACGATool.RuleCheckboxInputWidget({
                                value: rule.rule,
                                ruleset: rule,
                                nomidx: currentNomidx,
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
                    userNameField,
                    pageNameField,
                    reasonFieldsetLayout,
                ],
            });
            nominationFieldset.$element.css({'margin-top': 0});

            if (!nomData) {
                let hr = $('<hr>').css({
                    'margin-top': '15px',
                    'margin-bottom': '15px',
                });  // 頂部的 <hr>
                nominationFieldset.$element.prepend(hr);
            }

            return nominationFieldset;
        },

        /**
         * 獲取XTools頁面資訊。無法獲取時按下不表，返回空字串。
         * @param pageName
         * @returns {Promise<string>} XTools頁面資訊。
         */
        getXToolsInfo: async function (pageName) {
            try {
                return await $.get('https://xtools.wmcloud.org/api/page/pageinfo/' + mw.config.get('wgServerName') + '/' + pageName.replace(/["?%&+\\]/g, escape) + '?format=html&uselang=' + mw.config.get('wgUserLanguage'));
            } catch (error) {
                console.error('Error fetching XTools data:', error);
                return '';
            }
        },

        /**
         * 生成提名檢查單。
         * @param nomData 提名資料。
         * @returns {OO.ui.FieldsetLayout} 提名檢查單。
         */
        generateChecklistFieldset: async function (nomData) {
            let awarder = nomData.awarder;
            let pageName = nomData.pageName;
            let ruleStatus = nomData.ruleStatus;
            ACGATool.nominations.push({
                awarder: awarder,
                pageName: pageName,
                ruleStatus: ruleStatus,
                invalid: false,
                message: '',
            });

            // 得分者
            let userNameLinkLabelWidget = new OO.ui.LabelWidget({label: $('<a>').attr('href', mw.util.getUrl('User:' + awarder)).text(awarder)});
            let userTalkLinkLabelWidget = new OO.ui.LabelWidget({
                label: $('<a>').attr('href', mw.util.getUrl('User talk:' + awarder)).text(ACGATool.convByVar({
                    hant: '討論',
                    hans: '讨论',
                })),
            });
            let userContribsLinkLabelWidget = new OO.ui.LabelWidget({
                label: $('<a>').attr('href', mw.util.getUrl('Special:用户贡献/' + awarder)).text(ACGATool.convByVar({
                    hant: '貢獻',
                    hans: '贡献',
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
                'gap': '4px',
                'width': '80%',
                'flex-shrink': '0',
                'flex-wrap': 'wrap',
            });
            let userNameLabelWidget = new OO.ui.LabelWidget({
                label: ACGATool.convByVar({
                    hant: '得分者',
                    hans: '得分者',
                }),
            });
            userNameLabelWidget.$element.css({
                'flex-grow': 1,
                'align-self': 'stretch',
            });
            let userNameField = new OO.ui.HorizontalLayout({
                items: [
                    userNameLabelWidget,
                    userNameHorizontalLayout,
                ],
            });

            // 條目名稱
            let pageNameHorizontalLayout,
                pageNameLabelWidget;
            if (pageName === '他薦' || pageName === '他荐') {
                pageNameLabelWidget = new OO.ui.LabelWidget({
                    label: ACGATool.convByVar({
                        hant: '他薦',
                        hans: '他荐',
                    }),
                });
                pageNameHorizontalLayout = new OO.ui.HorizontalLayout({items: [pageNameLabelWidget]});
            } else {
                pageNameLabelWidget = new OO.ui.LabelWidget({label: $('<a>').attr('href', mw.util.getUrl(pageName)).text(pageName)});
                let pageTalkLabelWidget = new OO.ui.LabelWidget({
                    label: $('<a>').attr('href', mw.util.getUrl('Talk:' + pageName)).text(ACGATool.convByVar({
                        hant: '討論',
                        hans: '讨论',
                    })),
                });
                let pageHistoryLabelWidget = new OO.ui.LabelWidget({
                    label: $('<a>').attr('href', mw.util.getUrl(pageName, {action: 'history'})).text(ACGATool.convByVar({
                        hant: '歷史',
                        hans: '历史',
                    })),
                });
                let pagesLinkedToPageLabelWidget = new OO.ui.LabelWidget({
                    label: $('<a>').attr('href', mw.util.getUrl('Special:链入页面/' + pageName)).text(ACGATool.convByVar({
                        hant: '連入',
                        hans: '链入',
                    })),
                });
                // 更多頁面資訊 from XTools
                let xtoolsData = await ACGATool.getXToolsInfo(pageName);
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
                'gap': '4px',
                'width': '80%',
                'flex-shrink': '0',
                'flex-wrap': 'wrap',
            });
            let pageLabelLabelWidget = new OO.ui.LabelWidget({
                label: ACGATool.convByVar({
                    hant: '得分條目',
                    hans: '得分条目',
                }),
            });
            pageLabelLabelWidget.$element.css({
                'flex-grow': 1,
                'align-self': 'stretch',
            });
            let pageNameField = new OO.ui.HorizontalLayout({
                items: [
                    pageLabelLabelWidget,
                    pageNameHorizontalLayout,
                ],
            });
            pageNameField.$element.css({'margin-top': '15px'});

            // 提名無效
            let invalidToggleSwitchWidget = new OO.ui.ToggleSwitchWidget({value: false});
            invalidToggleSwitchWidget.on('change', function (isChecked) {
                ACGATool.nominations[0].invalid = isChecked;
            });
            let invalidField = new OO.ui.FieldLayout(invalidToggleSwitchWidget, {
                label: ACGATool.convByVar({
                    hant: '提名無效',
                    hans: '提名无效',
                }),
                align: 'left',
            });
            invalidField.$element.css({'margin-top': '15px'});
            invalidField.$element.addClass('checklist-field');

            // 提名理由
            let reasonField = new OO.ui.HorizontalLayout();
            reasonField.$element.css({'margin-top': '15px'});
            let reasonLabelWidget = new OO.ui.LabelWidget({
                label: ACGATool.convByVar({
                    hant: '提名理由',
                    hans: '提名理由',
                }),
            });
            reasonLabelWidget.$element.css({
                'flex-grow': 1,
                'align-self': 'stretch',
            });

            let ruleItems = [];
            let {
                ruleNames,
                ruleDict,
            } = ACGATool.NominationRuleSet();
            let orderedRuleStatus = ACGATool.getOrderedRuleStatus(ruleNames, ruleStatus);
            for (const ruleItem of orderedRuleStatus) {
                let ruleSet = ruleDict[ruleItem.rule];
                let ruleCheckbox = new ACGATool.RuleCheckboxInputWidget({
                    value: ruleItem.rule,
                    ruleset: ruleSet,
                    nomidx: 0,
                    check: true,
                });
                ruleItems.push(ruleCheckbox);
            }
            let horizontalLayout = new OO.ui.HorizontalLayout({items: ruleItems});
            horizontalLayout.$element.css({
                'width': '80%',
                'flex-shrink': '0',
                'flex-wrap': 'wrap',
            });
            reasonField.addItems([
                reasonLabelWidget,
                horizontalLayout,
            ]);

            // 附加說明
            let messageInput = new OO.ui.MultilineTextInputWidget({
                autosize: true,
                rows: 1,
            });
            messageInput.on('change', function (newValue) {
                ACGATool.nominations[0].message = newValue;
            });
            messageInput.on('resize', function () {
                try {
                    ACGATool.checkNominationDialog.updateSize();
                } catch (error) {
                    console.error('[ACGATool] Error updating dialog size:', error);
                }
            });
            let messageField = new OO.ui.FieldLayout(messageInput, {
                label: ACGATool.convByVar({
                    hant: '附加說明',
                    hans: '附加说明',
                }),
                align: 'left',
                help: ACGATool.convByVar({
                    hant: '可不填；無須簽名',
                    hans: '可不填；无须签名',
                }),
                helpInline: true,
            });
            messageField.$element.css({'margin-top': '15px'});
            messageField.$element.addClass('checklist-field');

            let nominationFieldset = new OO.ui.FieldsetLayout({
                items: [
                    userNameField,
                    pageNameField,
                    invalidField,
                    reasonField,
                    messageField,
                ],
            });
            nominationFieldset.$element.css({'margin-top': 0});
            return nominationFieldset;
        },

        /**
         * 生成提名理由。
         * @param ruleStatus
         * @param check
         * @returns {{reasonText: string, unselectedReasonText: string}|string|null}
         */
        generateReason: function (ruleStatus, check) {
            // 拼湊提名理由
            let reasonText = '',
                unselectedReasonText = '';
            let reasonScore = 0;
            let {ruleNames} = ACGATool.NominationRuleSet();
            let orderedRuleStatus = ACGATool.getOrderedRuleStatus(ruleNames, ruleStatus);
            for (const ruleItem of orderedRuleStatus) {
                if (check ? true : ruleItem.selected) {
                    if (isNaN(ruleItem.score) || ruleItem.score < 0) {
                        mw.notify(ACGATool.convByVar({
                            hant: '規則',
                            hans: '规则',
                        }) + '「' + ruleItem.rule + '」' + ACGATool.convByVar({
                            hant: '的分數不合法，請檢查！',
                            hans: '的分数不合法，请检查！',
                        }), {
                            type: 'error',
                            title: ACGATool.convByVar({
                                hant: '錯誤',
                                hans: '错误',
                            }),
                        });
                        return null;
                    }
                    // if (ruleItem.score > ruleItem.maxScore) {
                    //     mw.notify(
                    //         ACGATool.convByVar({ hant: '規則', hans: '规则' }) + '「' + ruleItem.rule + '」' + ACGATool.convByVar({ hant: '的分數超過最大值', hans: '的分数超过最大值' }) + '「' + ruleItem.maxScore + '」' + ACGATool.convByVar({ hant: '，請檢查！', hans: '，请检查！' }),
                    //         { type: 'error', title: ACGATool.convByVar({ hant: '錯誤', hans: '错误' }) }
                    //     );
                    //     return null;
                    // }
                    if (ruleItem.selected) {
                        reasonText += ' ' + ruleItem.rule;
                        if (ruleItem.desc !== ruleItem.ogDesc) reasonText += '(' + ruleItem.desc + ')';
                        if (ruleItem.score !== ruleItem.maxScore) reasonText += '[' + ruleItem.score + ']';
                        reasonScore += ruleItem.score;
                    } else if (check) {
                        unselectedReasonText += ' ' + ruleItem.rule;
                        if (ruleItem.desc !== ruleItem.ogDesc) unselectedReasonText += '(' + ruleItem.desc + ')';
                        if (ruleItem.score !== ruleItem.maxScore) unselectedReasonText += '[' + ruleItem.score + ']';
                    }
                }
            }
            reasonText = reasonText.trim();
            unselectedReasonText = unselectedReasonText.trim();
            if (check) {
                return {
                    reasonText: reasonText,
                    unselectedReasonText: unselectedReasonText,
                    reasonScore: reasonScore,
                };
            }
            return reasonText;
        },

        /**
         * 保存新提名。
         * @returns {Promise<boolean>} 是否成功提交。
         */
        saveNewNomination: async function () {
            let proposedWikitext = '{{ACG提名2';

            for (let i = 0; i < ACGATool.nominations.length; i++) {
                let nomination = ACGATool.nominations[i];
                if (nomination.awarder === '' || nomination.pageName === '') {
                    mw.notify(ACGATool.convByVar({
                        hant: '得分者或得分條目未填寫，請檢查！',
                        hans: '得分者或得分条目未填写，请检查！',
                    }), {
                        type: 'error',
                        title: ACGATool.convByVar({
                            hant: '錯誤',
                            hans: '错误',
                        }),
                    });
                    return true;
                }
                let reasonText = ACGATool.generateReason(nomination.ruleStatus);
                if (reasonText == null) {
                    return true;
                }
                if (reasonText === '') {
                    mw.notify(ACGATool.convByVar({
                        hant: '未選擇任何評審規則，請檢查！',
                        hans: '未选择任何评审规则，请检查！',
                    }), {
                        type: 'error',
                        title: ACGATool.convByVar({
                            hant: '錯誤',
                            hans: '错误',
                        }),
                    });
                    return true;
                }
                proposedWikitext += '\n|條目名稱' + (i + 1) + ' = ' + nomination.pageName.trim();
                proposedWikitext += '\n|用戶名稱' + (i + 1) + ' = ' + nomination.awarder.trim();
                proposedWikitext += '\n|提名理由' + (i + 1) + ' = {{ACG提名2/request|ver=1|' + reasonText + '}}';
                proposedWikitext += '\n|核對用' + (i + 1) + ' = {{ACG提名2/check|ver=1|}}';
            }

            const signature = '~' + '~' + '~' + '~';
            proposedWikitext += "\n}}\n'''提名人：'''" + signature;

            // 附加說明
            let message = ACGATool.newNominationDialog.messageInput.getValue().trim();
            if (message !== '') {
                proposedWikitext += "\n: {{說明}}：" + message + '--' + signature;
            }

            // 是否已有今日的date
            let today = new Date();
            let todayDate = (today.getMonth() + 1) + '月' + today.getDate() + '日';
            let fulltext = await ACGATool.getFullText();
            if (!fulltext.includes('=== ' + todayDate + ' ===')) {
                // 沒有今日的date，先新增一個
                proposedWikitext = '=== ' + todayDate + ' ===\n' + proposedWikitext;
            }

            // 提交
            let response = await ACGATool.api.postWithToken('csrf', {
                action: 'edit',
                title: 'WikiProject:ACG/維基ACG專題獎/登記處',
                appendtext: '\n' + proposedWikitext,
                summary: '[[User:SuperGrey/gadgets/ACGATool|新提名]]',
            });
            if (response.edit.result === 'Success') {
                mw.notify(ACGATool.convByVar({
                    hant: '新提名已成功提交！',
                    hans: '新提名已成功提交！',
                }), {
                    title: ACGATool.convByVar({
                        hant: '成功',
                        hans: '成功',
                    }),
                    autoHide: true,
                });
                ACGATool.refreshPage();
                return false;
            } else {
                mw.notify(ACGATool.convByVar({
                    hant: '新提名提交失敗：',
                    hans: '新提名提交失败：',
                }) + response.edit.result, {
                    type: 'error',
                    title: ACGATool.convByVar({
                        hant: '錯誤',
                        hans: '错误',
                    }),
                });
                return true;
            }
        },

        /**
         * 保存修改提名。
         * @returns {Promise<boolean>} 是否成功提交。
         */
        saveModifiedNomination: async function () {
            let nomination = ACGATool.nominations[0];
            if (nomination.awarder === '' || nomination.pageName === '') {
                mw.notify(ACGATool.convByVar({
                    hant: '得分者或得分條目未填寫，請檢查！',
                    hans: '得分者或得分条目未填写，请检查！',
                }), {
                    type: 'error',
                    title: ACGATool.convByVar({
                        hant: '錯誤',
                        hans: '错误',
                    }),
                });
                return true;
            }

            let reasonText = ACGATool.generateReason(nomination.ruleStatus);
            if (reasonText == null) {
                return true;
            }
            if (reasonText === '') {
                mw.notify(ACGATool.convByVar({
                    hant: '未選擇任何評審規則，請檢查！',
                    hans: '未选择任何评审规则，请检查！',
                }), {
                    type: 'error',
                    title: ACGATool.convByVar({
                        hant: '錯誤',
                        hans: '错误',
                    }),
                });
                return true;
            }

            let fulltext = await ACGATool.getFullText(),
                updatedText;
            if (ACGATool.queried.type === 'main' || ACGATool.queried.type === 'extra') {
                let changes = {
                    '條目名稱': nomination.pageName,
                    '用戶名稱': nomination.awarder,
                    '提名理由': '{{ACG提名2/request|ver=1|' + reasonText + '}}',
                };
                updatedText = ACGATool.updateEntryParameters(fulltext, ACGATool.queried, changes);
            } else if (ACGATool.queried.type === 'acg2') {
                let changes = {
                    '條目名稱': nomination.pageName,
                    '用戶名稱': nomination.awarder,
                    '提名理由': '{{ACG提名2/request|ver=1|' + reasonText + '}}',
                };
                updatedText = ACGATool.updateEntryParameters(fulltext, ACGATool.queried, changes);
            }
            if (updatedText === fulltext) {
                mw.notify(ACGATool.convByVar({
                    hant: '提名並未改動！',
                    hans: '提名并未改动！',
                }), {
                    type: 'warn',
                    title: ACGATool.convByVar({
                        hant: '提示',
                        hans: '提示',
                    }),
                });
                return true;
            }

            let response = await ACGATool.api.postWithToken('csrf', {
                action: 'edit',
                title: 'WikiProject:ACG/維基ACG專題獎/登記處',
                text: updatedText,
                summary: '[[User:SuperGrey/gadgets/ACGATool|編輯提名]]',
            });
            if (response.edit.result === 'Success') {
                mw.notify(ACGATool.convByVar({
                    hant: '提名已成功修改！',
                    hans: '提名已成功修改！',
                }), {
                    title: ACGATool.convByVar({
                        hant: '成功',
                        hans: '成功',
                    }),
                    autoHide: true,
                });
                ACGATool.refreshPage();
                return false;
            } else {
                mw.notify(ACGATool.convByVar({
                    hant: '提名修改失敗：',
                    hans: '提名修改失败：',
                }) + response.edit.result, {
                    type: 'error',
                    title: ACGATool.convByVar({
                        hant: '錯誤',
                        hans: '错误',
                    }),
                });
                return true;
            }
        },

        /**
         * 保存核分。
         * @returns {Promise<boolean>} 是否成功提交。
         */
        saveNominationCheck: async function () {
            let nomination = ACGATool.nominations[0];
            let checkText = '{{ACG提名2/check|ver=1|';
            let reasonScore = 0;
            // 是否選擇「提名無效」
            if (nomination.invalid) {
                checkText += '0';
            } else {
                let reasonObject = ACGATool.generateReason(nomination.ruleStatus, true);
                if (reasonObject == null) {
                    return true;
                }
                let reasonText = reasonObject.reasonText;
                let unselectedReasonText = reasonObject.unselectedReasonText;
                reasonScore = reasonObject.reasonScore;
                checkText += reasonText;
                if (unselectedReasonText !== '') {
                    checkText += '|no=' + unselectedReasonText;
                }
            }
            checkText += '}}' + nomination.message;
            let signature = '~' + '~' + '~' + '~';
            checkText += '--' + signature;

            let fulltext = await ACGATool.getFullText(),
                updatedText;
            if (ACGATool.queried.type === 'main' || ACGATool.queried.type === 'extra') {
                let changes = {'核對用': checkText};
                updatedText = ACGATool.updateEntryParameters(fulltext, ACGATool.queried, changes);
            } else if (ACGATool.queried.type === 'acg2') {
                let changes = {'核對用': checkText};
                updatedText = ACGATool.updateEntryParameters(fulltext, ACGATool.queried, changes);
            }
            if (updatedText === fulltext) {
                mw.notify(ACGATool.convByVar({
                    hant: '核分並未改動！',
                    hans: '核分并未改动！',
                }), {
                    type: 'warn',
                    title: ACGATool.convByVar({
                        hant: '提示',
                        hans: '提示',
                    }),
                });
                return true;
            }

            let response = await ACGATool.api.postWithToken('csrf', {
                action: 'edit',
                title: 'WikiProject:ACG/維基ACG專題獎/登記處',
                text: updatedText,
                summary: '[[User:SuperGrey/gadgets/ACGATool|核對分數]]',
            });
            if (response.edit.result === 'Success') {
                mw.notify(ACGATool.convByVar({
                    hant: '核分已成功提交！',
                    hans: '核分已成功提交！',
                }), {
                    title: ACGATool.convByVar({
                        hant: '成功',
                        hans: '成功',
                    }),
                    autoHide: false,
                });
                if (reasonScore > 0) {
                    await ACGATool.editACGAScoreList(nomination.awarder, reasonScore);
                }
                if (!ACGATool.multiNomCheckOngoing) {
                    ACGATool.refreshPage();
                }
                ACGATool.multiNomCheckChanged = true;
                return false;
            } else {
                mw.notify(ACGATool.convByVar({
                    hant: '核分提交失敗：',
                    hans: '核分提交失败：',
                }) + response.edit.result, {
                    type: 'error',
                    title: ACGATool.convByVar({
                        hant: '錯誤',
                        hans: '错误',
                    }),
                });
                return true;
            }
        },

        /**
         * 編輯 Module:ACGaward/list。
         * @param {string} awarder 得分者。
         * @param {number} score 得分。
         * @return {Promise<boolean>} 是否成功提交。
         */
        editACGAScoreList: async function (awarder, score) {
            let scorelistText = await ACGATool.getFullText('Module:ACGaward/list');
            let scorelistLines = scorelistText.trim().split('\n').slice(1, -1);  // 去掉 'return {' 和 '}' 行
            let scorelist = {};
            for (let line of scorelistLines) {
                let match = line.match(/^\s*\[?(?:'([^']+)'|"([^"]+)")\]?\s*=\s*([+-]?[\d.]+)\s*,?\s*$/);
                if (match) {
                    let name = match[1] || match[2];  // 使用第一個捕獲組或第二個捕獲組
                    scorelist[name] = parseFloat(match[3]);
                }
            }
            let originalScore = scorelist[awarder] || 0;  // 獲取原始分數
            scorelist[awarder] = originalScore + score;  // 更新分數
            let editSummary = awarder + ' ' + originalScore + '+' + score + '=' + scorelist[awarder];

            let sortedNames = Object.keys(scorelist).sort((a, b) => {
                // 按照名稱排序，忽略大小寫
                return a.toLowerCase().localeCompare(b.toLowerCase(), "en");
            });
            let newScorelistText = 'return {\n';
            for (let name of sortedNames) {
                let nameQuoted = name.includes('"') ? "'" + name + "'" : '"' + name + '"';  // 確保名稱被正確引用
                newScorelistText += '    [' + nameQuoted + '] = ' + scorelist[name].toString() + ',\n';
            }
            newScorelistText += '}';

            // 提交修改
            let response = await ACGATool.api.postWithToken('csrf', {
                action: 'edit',
                title: 'Module:ACGaward/list',
                text: newScorelistText,
                summary: editSummary + '（[[User:SuperGrey/gadgets/ACGATool|核對分數]]）',
            });
            if (response.edit.result === 'Success') {
                mw.notify(ACGATool.convByVar({
                    hant: 'Module:ACGaward/list 已成功更新！',
                    hans: 'Module:ACGaward/list 已成功更新！',
                }), {
                    title: ACGATool.convByVar({
                        hant: '成功',
                        hans: '成功',
                    }),
                    autoHide: true,
                });
                return false;  // 成功提交
            } else {
                mw.notify(ACGATool.convByVar({
                    hant: 'Module:ACGaward/list 更新失敗：',
                    hans: 'Module:ACGaward/list 更新失败：',
                }) + response.edit.result, {
                    type: 'error',
                    title: ACGATool.convByVar({
                        hant: '錯誤',
                        hans: '错误',
                    }),
                });
                return true;  // 提交失敗
            }
        },

        /**
         * 刷新頁面。
         */
        refreshPage: function () {
            // 2秒後刷新頁面
            setTimeout(function () {
                location.reload();
            }, 2000);
        },

        /**
         * 新提名對話框。
         * @param config
         * @constructor
         */
        NewNominationDialog: function (config) {
            ACGATool.NewNominationDialog.super.call(this, config);
        },

        /**
         * 初始化新提名對話框。在腳本啟動時執行一次。
         */
        initNewNominationDialog: function () {
            OO.inheritClass(ACGATool.NewNominationDialog, OO.ui.ProcessDialog);

            ACGATool.NewNominationDialog.static.name = 'NewNominationDialog';
            ACGATool.NewNominationDialog.static.title = ACGATool.convByVar({
                hant: '新提名（維基ACG專題獎小工具）',
                hans: '新提名（维基ACG专题奖小工具）',
            });
            ACGATool.NewNominationDialog.static.actions = [
                {
                    action: 'save',
                    label: ACGATool.convByVar({
                        hant: '儲存',
                        hans: '储存',
                    }),
                    flags: [
                        'primary',
                        'progressive',
                    ],
                },
                {
                    action: 'cancel',
                    label: ACGATool.convByVar({
                        hant: '取消',
                        hans: '取消',
                    }),
                    flags: 'safe',
                },
                {
                    action: 'add',
                    label: ACGATool.convByVar({
                        hant: '額外提名 + 1',
                        hans: '额外提名 + 1',
                    }),
                },
                {
                    action: 'minus',
                    label: ACGATool.convByVar({
                        hant: '額外提名 − 1',
                        hans: '额外提名 − 1',
                    }),
                },
            ];
            ACGATool.NewNominationDialog.prototype.initialize = function () {
                ACGATool.NewNominationDialog.super.prototype.initialize.call(this);
                this.panel = new OO.ui.PanelLayout({
                    padded: true,
                    expanded: false,
                });
                this.content = new OO.ui.FieldsetLayout();

                // 附加說明
                this.messageInput = new OO.ui.MultilineTextInputWidget({
                    autosize: true,
                    rows: 1,
                });
                this.messageInput.connect(this, {resize: 'onMessageInputResize'});
                this.messageInputField = new OO.ui.FieldLayout(this.messageInput, {
                    label: ACGATool.convByVar({
                        hant: '附加說明',
                        hans: '附加说明',
                    }),
                    align: 'top',
                    help: ACGATool.convByVar({
                        hant: '可不填；無須簽名',
                        hans: '可不填；无须签名',
                    }),
                    helpInline: true,
                });
                this.messageInputFieldSet = new OO.ui.FieldsetLayout({items: [this.messageInputField]});

                this.content.addItems([
                    this.messageInputFieldSet,
                    ACGATool.generateNominationFieldset(),
                ]);

                this.panel.$element.append(this.content.$element);
                this.$body.append(this.panel.$element);
            };

            ACGATool.NewNominationDialog.prototype.onMessageInputResize = function () {
                this.updateSize();
            };

            ACGATool.NewNominationDialog.prototype.getBodyHeight = function () {
                return this.panel.$element.outerHeight(true);
            };

            ACGATool.NewNominationDialog.prototype.getActionProcess = function (action) {
                if (action === 'save') {
                    return new OO.ui.Process(async function () {
                        let response = await ACGATool.saveNewNomination();
                        if (!response) {
                            this.close();
                        }
                    }, this);
                } else if (action === 'add') {
                    return new OO.ui.Process(function () {
                        // 新增一個提名
                        let newFieldset = ACGATool.generateNominationFieldset();
                        this.content.addItems([newFieldset]);
                        this.updateSize();
                    }, this);
                } else if (action === 'minus') {
                    return new OO.ui.Process(function () {
                        if (this.content.items.length <= 2) {
                            mw.notify(ACGATool.convByVar({
                                hant: '至少需要一個提名！',
                                hans: '至少需要一个提名！',
                            }), {
                                type: 'error',
                                title: ACGATool.convByVar({
                                    hant: '錯誤',
                                    hans: '错误',
                                }),
                            });
                            return;
                        }
                        // 移除最後一個提名
                        this.content.removeItems([this.content.items[this.content.items.length - 1]]);
                        ACGATool.nominations.pop();
                        this.updateSize();
                    }, this);
                } else if (action === 'cancel') {
                    return new OO.ui.Process(function () {
                        this.close();
                    }, this);
                }
                return ACGATool.NewNominationDialog.super.prototype.getActionProcess.call(this, action);
            };

            ACGATool.NewNominationDialog.prototype.getTearnDownProcess = function (data) {
                return ACGATool.NewNominationDialog.super.prototype.getTearnDownProcess.call(this, data);
            };
        },

        /**
         * 顯示新提名對話框。
         */
        showNewNominationDialog: function () {
            // 清空原有的items
            ACGATool.nominations.length = 0;

            ACGATool.newNominationDialog = new ACGATool.NewNominationDialog({
                size: 'large',
                padded: true,
                scrollable: true,
            });
            ACGATool.windowManager.addWindows([ACGATool.newNominationDialog]);
            ACGATool.windowManager.openWindow(ACGATool.newNominationDialog);
        },

        /**
         * 編輯提名對話框。
         * @param config
         * @constructor
         */
        EditNominationDialog: function (config) {
            ACGATool.EditNominationDialog.super.call(this, config);
        },

        /**
         * 初始化編輯提名對話框。在腳本啟動時執行一次。
         */
        initEditNominationDialog: function () {
            OO.inheritClass(ACGATool.EditNominationDialog, OO.ui.ProcessDialog);

            ACGATool.EditNominationDialog.static.name = 'EditNominationDialog';
            ACGATool.EditNominationDialog.static.title = ACGATool.convByVar({
                hant: '編輯提名（維基ACG專題獎小工具）',
                hans: '编辑提名（维基ACG专题奖小工具）',
            });
            ACGATool.EditNominationDialog.static.actions = [
                {
                    action: 'save',
                    label: ACGATool.convByVar({
                        hant: '儲存',
                        hans: '储存',
                    }),
                    flags: [
                        'primary',
                        'progressive',
                    ],
                },
                {
                    action: 'cancel',
                    label: ACGATool.convByVar({
                        hant: '取消',
                        hans: '取消',
                    }),
                    flags: 'safe',
                },
            ];
            ACGATool.EditNominationDialog.prototype.initialize = function () {
                ACGATool.EditNominationDialog.super.prototype.initialize.call(this);
                this.panel = new OO.ui.PanelLayout({
                    padded: true,
                    expanded: false,
                });
                this.panel.$element.append(ACGATool.editNominationDialogContent.$element);
                this.$body.append(this.panel.$element);
            };

            ACGATool.EditNominationDialog.prototype.onMessageInputResize = function () {
                this.updateSize();
            };

            ACGATool.EditNominationDialog.prototype.getBodyHeight = function () {
                return this.panel.$element.outerHeight(true);
            };

            ACGATool.EditNominationDialog.prototype.getActionProcess = function (action) {
                if (action === 'save') {
                    return new OO.ui.Process(async function () {
                        let response = await ACGATool.saveModifiedNomination();
                        if (!response) {
                            this.close();
                        }
                    }, this);
                } else if (action === 'cancel') {
                    return new OO.ui.Process(function () {
                        this.close();
                    }, this);
                }
                return ACGATool.EditNominationDialog.super.prototype.getActionProcess.call(this, action);
            };

            ACGATool.EditNominationDialog.prototype.getTearnDownProcess = function (data) {
                return ACGATool.EditNominationDialog.super.prototype.getTearnDownProcess.call(this, data);
            };
        },

        /**
         * 顯示編輯提名對話框。
         * @param nomData 提名資料。
         */
        showEditNominationDialog: function (nomData) {
            // 清空原有的items
            ACGATool.editNominationDialogContent.clearItems();
            ACGATool.nominations.length = 0;

            ACGATool.editNominationDialog = new ACGATool.EditNominationDialog({
                size: 'large',
                padded: true,
                scrollable: true,
            });

            // 加入新的items
            ACGATool.editNominationDialogContent.addItems([ACGATool.generateNominationFieldset(nomData)]);

            ACGATool.windowManager.addWindows([ACGATool.editNominationDialog]);
            ACGATool.windowManager.openWindow(ACGATool.editNominationDialog);
        },

        /**
         * 核分提名對話框。
         * @param config
         * @constructor
         */
        CheckNominationDialog: function (config) {
            ACGATool.CheckNominationDialog.super.call(this, config);
        },

        /**
         * 初始化核分提名對話框。在腳本啟動時執行一次。
         */
        initCheckNominationDialog: function () {
            OO.inheritClass(ACGATool.CheckNominationDialog, OO.ui.ProcessDialog);

            ACGATool.CheckNominationDialog.static.name = 'CheckNominationDialog';
            ACGATool.CheckNominationDialog.static.title = ACGATool.convByVar({
                hant: '核對分數（維基ACG專題獎小工具）',
                hans: '核对分数（维基ACG专题奖小工具）',
            });
            ACGATool.CheckNominationDialog.static.actions = [
                {
                    action: 'save',
                    label: ACGATool.convByVar({
                        hant: '儲存',
                        hans: '储存',
                    }),
                    flags: [
                        'primary',
                        'progressive',
                    ],
                },
                {
                    action: 'cancel',
                    label: ACGATool.convByVar({
                        hant: '取消',
                        hans: '取消',
                    }),
                    flags: 'safe',
                },
            ];
            ACGATool.CheckNominationDialog.prototype.initialize = function () {
                ACGATool.CheckNominationDialog.super.prototype.initialize.call(this);
                this._header = this.$body.find('.oo-ui-processDialog-title');
                this.panel = new OO.ui.PanelLayout({
                    padded: true,
                    expanded: false,
                });
                this.panel.$element.append(ACGATool.checkNominationDialogContent.$element);
                this.$body.append(this.panel.$element);
            };

            ACGATool.CheckNominationDialog.prototype.getSetupProcess = function (data) {
                return ACGATool.CheckNominationDialog.super.prototype.getSetupProcess.call(this, data)
                    .next(function () {
                        if (data.title) {
                            this._header.innerText = data.title;
                        }
                    }, this);
            };

            ACGATool.CheckNominationDialog.prototype.onMessageInputResize = function () {
                this.updateSize();
            };

            ACGATool.CheckNominationDialog.prototype.getBodyHeight = function () {
                return this.panel.$element.outerHeight(true);
            };

            ACGATool.CheckNominationDialog.prototype.getActionProcess = function (action) {
                if (action === 'save') {
                    return new OO.ui.Process(async function () {
                        let response = await ACGATool.saveNominationCheck();
                        if (!response) {
                            this.close();
                        }
                    }, this);
                } else if (action === 'cancel') {
                    return new OO.ui.Process(function () {
                        this.close();
                    }, this);
                }
                return ACGATool.CheckNominationDialog.super.prototype.getActionProcess.call(this, action);
            };

            ACGATool.CheckNominationDialog.prototype.getTearnDownProcess = function (data) {
                return ACGATool.CheckNominationDialog.super.prototype.getTearnDownProcess.call(this, data);
            };

            mw.util.addCSS('.checklist-field .oo-ui-fieldLayout-field { width: 80% !important; }');
        },

        /**
         * 顯示核分提名對話框。
         * @param nomData 提名資料。
         * @param multiCheckStatus 多選核對狀態字串。
         */
        showCheckNominationDialog: async function (nomData, multiCheckStatus) {
            // 清空原有的items
            ACGATool.checkNominationDialogContent.clearItems();
            ACGATool.nominations.length = 0;

            ACGATool.checkNominationDialog = new ACGATool.CheckNominationDialog({
                size: 'large',
                padded: true,
                scrollable: true,
            });

            // 加入新的items
            const field = await ACGATool.generateChecklistFieldset(nomData);
            ACGATool.checkNominationDialogContent.addItems([field]);

            ACGATool.windowManager.addWindows([ACGATool.checkNominationDialog]);

            const instance = ACGATool.windowManager.openWindow(ACGATool.checkNominationDialog, multiCheckStatus ? {
                title: ACGATool.convByVar({
                    hant: '核對分數，' + multiCheckStatus + '（維基ACG專題獎小工具）',
                    hans: '核对分数，' + multiCheckStatus + '（维基ACG专题奖小工具）',
                }),
            } : undefined);
            await instance.closed;
        },

        /**
         * 腳本入口。
         */
        init: function () {
            ACGATool.pageName = mw.config.get('wgPageName');
            if (ACGATool.pageName !== 'WikiProject:ACG/維基ACG專題獎' && ACGATool.pageName !== 'WikiProject:ACG/維基ACG專題獎/登記處') return;  // 非目標頁面，不執行

            mw.loader.using('ext.gadget.HanAssist').then((require) => {
                const {convByVar} = require('ext.gadget.HanAssist');
                ACGATool.convByVar = convByVar;

                // Initialize OOUI custom widgets
                ACGATool.initDynamicWidthTextInputWidget();
                ACGATool.initRuleCheckboxInputWidget();
                // Initialize dialogs
                ACGATool.initNewNominationDialog();
                ACGATool.initEditNominationDialog();
                ACGATool.initCheckNominationDialog();

                // Append the window manager element to the body
                ACGATool.windowManager = new OO.ui.WindowManager();
                $(document.body).append(ACGATool.windowManager.$element);

                // 添加提名按鈕
                ACGATool.addEditButtonsToPage();
            });
        },

        api: new mw.Api({userAgent: 'ACGATool/1.1.0'}),  // MediaWiki API實例
        pageName: '',  // JS運行的當前頁面
        windowManager: null,  // Window manager for OOUI dialogs
        newNominationDialog: null,  // 新提名dialog
        editNominationDialog: null,  // 修改提名dialog
        editNominationDialogContent: new OO.ui.FieldsetLayout(), // 修改提名dialog的內容池
        checkNominationDialog: null,  // 檢查提名dialog
        checkNominationDialogContent: new OO.ui.FieldsetLayout(), // 檢查提名dialog的內容池
        queried: null,  // 查詢到的提名
        nominations: [],  // 提名
        convByVar: null,  // 簡繁轉換
        multiNomCheckOngoing: false,  // 多選核對進度狀態
        multiNomCheckChanged: false,  // 多選核對是否有變更
    };

    $(ACGATool.init);
})();
