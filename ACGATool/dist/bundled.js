// Main page: [[User:SuperGrey/gadgets/ACGATool]]
// <nowiki>
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };

  // src/state.js
  var state = {
    convByVar: (langDict) => "繁簡轉換未初始化！",
    // 簡繁轉換
    queried: null,
    // 查詢到的提名
    nominations: [],
    // 提名
    multiNomCheckOngoing: false,
    // 多選核對進度狀態
    multiNomCheckChanged: false,
    // 多選核對是否有變更
    init(convByVar) {
      this.convByVar = convByVar;
    }
  };
  var state_default = state;

  // src/rules.js
  function NominationRules() {
    return [
      {
        group: state_default.convByVar({
          hant: "(1) 內容擴充",
          hans: "(1) 内容扩充"
        }),
        rules: [
          {
            rule: "1a",
            desc: state_default.convByVar({
              hant: "短新增",
              hans: "短新增"
            }),
            score: 1
          },
          {
            rule: "1b",
            desc: state_default.convByVar({
              hant: "中新增",
              hans: "中新增"
            }),
            score: 2
          },
          {
            rule: "1c",
            desc: state_default.convByVar({
              hant: "長新增",
              hans: "长新增"
            }),
            score: 3
          }
        ],
        explanation: state_default.convByVar({
          hant: "鼓勵編者新增或擴充條目內容。新內容達 2 kB 為「短新增」，達 3 kB 為「中新增」，達 5 kB 為「長新增」。",
          hans: "新增或扩充条目内容。新内容达 2 kB 为「短新增」，达 3 kB 为「中新增」，达 5 kB 为「长新增」。"
        })
      },
      {
        group: state_default.convByVar({
          hant: "(2) 品質提升",
          hans: "(2) 品质提升"
        }),
        rules: [
          {
            rule: "2-c",
            desc: state_default.convByVar({
              hant: "丙級",
              hans: "丙级"
            }),
            score: 1
          },
          {
            rule: "2-b",
            desc: state_default.convByVar({
              hant: "乙級",
              hans: "乙级"
            }),
            score: 3
          },
          {
            rule: "2-ga",
            desc: state_default.convByVar({
              hant: "優良",
              hans: "优良"
            }),
            score: 5
          },
          {
            rule: "2-fa",
            desc: state_default.convByVar({
              hant: "典特",
              hans: "典特"
            }),
            score: 10
          }
        ],
        explanation: state_default.convByVar({
          hant: "鼓勵編者以條目品質評級為標準，提升條目品質。由缺失條目、小作品、初級提升至丙級為「丙級」，由丙級提升至乙級為「乙級」，由乙級提升至優良為「優良」，由優良提升至典範（特色）為「典特」。跨級品質提升，則多選所有符合項。",
          hans: "以条目品质评级为标准，提升条目品质。由缺失条目、小作品、初级提升至丙级为「丙级」，由丙级提升至乙级为「乙级」，由乙级提升至优良为「优良」，由优良提升至典范（特色）为「典特」。跨级品质提升，则多选所有符合项。"
        })
      },
      {
        group: state_default.convByVar({
          hant: "(3) 格式",
          hans: "(3) 格式"
        }),
        rules: [
          {
            rule: "3",
            desc: state_default.convByVar({
              hant: "格式",
              hans: "格式"
            }),
            score: 1
          }
        ],
        explanation: state_default.convByVar({
          hant: "鼓勵編者創作整潔的條目。對於未滿 5 級創作獎的編者，條目應採用 ref 格式搭配 Cite 家族模板列出來源，引文沒有格式錯誤；對於已滿 5 級創作獎的有經驗編者，條目須行文通順、符合命名常規、遵循格式手冊。此項得分需依附於項目 1 或 2，不可單獨申請。",
          hans: "鼓励编辑者创作整洁的条目。对于未满 5 级创作奖的编辑者，条目应采用 ref 格式搭配 Cite 家族模板列出来源，引文没有格式错误；对于已满 5 级创作奖的有经验编辑者，条目须行文通顺、符合命名常规、遵循格式手册。此项得分需依附于项目 1 或 2，不可单独申请。"
        })
      },
      {
        group: state_default.convByVar({
          hant: "(4) 編輯活動",
          hans: "(4) 编辑活动"
        }),
        rules: [
          {
            rule: "4",
            desc: state_default.convByVar({
              hant: "活動",
              hans: "活动"
            }),
            score: 1
          },
          {
            rule: "4-req",
            desc: state_default.convByVar({
              hant: "請求",
              hans: "请求"
            }),
            score: 1
          },
          {
            rule: "4-dyk",
            desc: state_default.convByVar({
              hant: "DYK",
              hans: "DYK"
            }),
            score: 1
          },
          {
            rule: "4-req-game",
            desc: state_default.convByVar({
              hant: "請求·遊戲",
              hans: "请求·游戏"
            }),
            score: 1
          },
          {
            rule: "4-req-ac",
            desc: state_default.convByVar({
              hant: "請求·動漫",
              hans: "请求·动漫"
            }),
            score: 1
          }
        ],
        explanation: state_default.convByVar({
          hant: "鼓勵編者參加社群或專題活動。可單獨申請的活動：新條目推薦、拯救典優條目。須依附於項目 1 或 2，不可單獨申請的活動：動漫及電子遊戲條目請求、基礎條目擴充挑戰、編輯松、動員令。提名時請手動編輯規則，註明所參與活動。",
          hans: "鼓励编辑者参加社群或专题活动。可单独申请的活动：新条目推荐、拯救典优条目。须依附于项目 1 或 2，不可单独申请的活动：动漫及电子游戏条目请求、基础条目扩充挑战、编辑松、动员令。提名时请手动编辑规则，注明所参与活动。"
        })
      },
      {
        group: state_default.convByVar({
          hant: "(5) 條目評審",
          hans: "(5) 条目评审"
        }),
        tabs: [
          {
            tab: state_default.convByVar({
              hant: "泛用評審",
              hans: "泛用评审"
            }),
            rules: [
              {
                rule: "5",
                desc: state_default.convByVar({
                  hant: "評審",
                  hans: "评审"
                }),
                score: 1
              },
              {
                rule: "5-half",
                desc: state_default.convByVar({
                  hant: "快評",
                  hans: "快评"
                }),
                score: 0.5
              },
              {
                rule: "5a",
                desc: state_default.convByVar({
                  hant: "文筆評審",
                  hans: "文笔评审"
                }),
                score: 1
              },
              {
                rule: "5a-half",
                desc: state_default.convByVar({
                  hant: "文筆快評",
                  hans: "文笔快评"
                }),
                score: 0.5
              },
              {
                rule: "5b",
                desc: state_default.convByVar({
                  hant: "覆蓋面評審",
                  hans: "覆盖面评审"
                }),
                score: 1
              },
              {
                rule: "5b-half",
                desc: state_default.convByVar({
                  hant: "覆蓋面快評",
                  hans: "覆盖面快评"
                }),
                score: 0.5
              },
              {
                rule: "5c",
                desc: state_default.convByVar({
                  hant: "來源格式評審",
                  hans: "来源格式评审"
                }),
                score: 1
              },
              {
                rule: "5c-half",
                desc: state_default.convByVar({
                  hant: "來源格式快評",
                  hans: "来源格式快评"
                }),
                score: 0.5
              },
              {
                rule: "5x",
                desc: state_default.convByVar({
                  hant: "完整評審",
                  hans: "完整评审"
                }),
                score: 3
              }
            ]
          },
          {
            tab: state_default.convByVar({
              hant: "乙級(乙上級)內容評審",
              hans: "乙级(乙上级)内容评审"
            }),
            rules: [
              {
                rule: "5-bcr",
                desc: state_default.convByVar({
                  hant: "乙級評審",
                  hans: "乙级评审"
                }),
                score: 1
              },
              {
                rule: "5-bcr-half",
                desc: state_default.convByVar({
                  hant: "乙級快評",
                  hans: "乙级快评"
                }),
                score: 0.5
              },
              {
                rule: "5a-bcr",
                desc: state_default.convByVar({
                  hant: "乙級文筆評審",
                  hans: "乙级文笔评审"
                }),
                score: 1
              },
              {
                rule: "5a-bcr-half",
                desc: state_default.convByVar({
                  hant: "乙級文筆快評",
                  hans: "乙级文笔快评"
                }),
                score: 0.5
              },
              {
                rule: "5b-bcr",
                desc: state_default.convByVar({
                  hant: "乙級覆蓋面評審",
                  hans: "乙级覆盖面评审"
                }),
                score: 1
              },
              {
                rule: "5b-bcr-half",
                desc: state_default.convByVar({
                  hant: "乙級覆蓋面快評",
                  hans: "乙级覆盖面快评"
                }),
                score: 0.5
              },
              {
                rule: "5c-bcr",
                desc: state_default.convByVar({
                  hant: "乙級來源格式評審",
                  hans: "乙级来源格式评审"
                }),
                score: 1
              },
              {
                rule: "5c-bcr-half",
                desc: state_default.convByVar({
                  hant: "乙級來源格式快評",
                  hans: "乙级来源格式快评"
                }),
                score: 0.5
              },
              {
                rule: "5x-bcr",
                desc: state_default.convByVar({
                  hant: "完整乙級評審",
                  hans: "完整乙级评审"
                }),
                score: 3
              }
            ]
          },
          {
            tab: state_default.convByVar({
              hant: "優良內容評審",
              hans: "优良内容评审"
            }),
            rules: [
              {
                rule: "5-gan",
                desc: state_default.convByVar({
                  hant: "優良評審",
                  hans: "优良评审"
                }),
                score: 1
              },
              {
                rule: "5-gan-half",
                desc: state_default.convByVar({
                  hant: "優良快評",
                  hans: "优良快评"
                }),
                score: 0.5
              },
              {
                rule: "5a-gan",
                desc: state_default.convByVar({
                  hant: "優良文筆評審",
                  hans: "优良文笔评审"
                }),
                score: 1
              },
              {
                rule: "5a-gan-half",
                desc: state_default.convByVar({
                  hant: "優良文筆快評",
                  hans: "优良文笔快评"
                }),
                score: 0.5
              },
              {
                rule: "5b-gan",
                desc: state_default.convByVar({
                  hant: "優良覆蓋面評審",
                  hans: "优良覆盖面评审"
                }),
                score: 1
              },
              {
                rule: "5b-gan-half",
                desc: state_default.convByVar({
                  hant: "優良覆蓋面快評",
                  hans: "优良覆盖面快评"
                }),
                score: 0.5
              },
              {
                rule: "5c-gan",
                desc: state_default.convByVar({
                  hant: "優良來源格式評審",
                  hans: "优良来源格式评审"
                }),
                score: 1
              },
              {
                rule: "5c-gan-half",
                desc: state_default.convByVar({
                  hant: "優良來源格式快評",
                  hans: "优良来源格式快评"
                }),
                score: 0.5
              },
              {
                rule: "5x-gan",
                desc: state_default.convByVar({
                  hant: "完整優良評審",
                  hans: "完整优良评审"
                }),
                score: 3
              }
            ]
          },
          {
            tab: state_default.convByVar({
              hant: "甲級內容評審",
              hans: "甲级内容评审"
            }),
            rules: [
              {
                rule: "5-acr",
                desc: state_default.convByVar({
                  hant: "甲級評審",
                  hans: "甲级评审"
                }),
                score: 2
              },
              {
                rule: "5-acr-half",
                desc: state_default.convByVar({
                  hant: "甲級快評",
                  hans: "甲级快评"
                }),
                score: 1
              },
              {
                rule: "5a-acr",
                desc: state_default.convByVar({
                  hant: "甲級文筆評審",
                  hans: "甲级文笔评审"
                }),
                score: 2
              },
              {
                rule: "5a-acr-half",
                desc: state_default.convByVar({
                  hant: "甲級文筆快評",
                  hans: "甲级文笔快评"
                }),
                score: 1
              },
              {
                rule: "5b-acr",
                desc: state_default.convByVar({
                  hant: "甲級覆蓋面評審",
                  hans: "甲级覆盖面评审"
                }),
                score: 2
              },
              {
                rule: "5b-acr-half",
                desc: state_default.convByVar({
                  hant: "甲級覆蓋面快評",
                  hans: "甲级覆盖面快评"
                }),
                score: 1
              },
              {
                rule: "5c-acr",
                desc: state_default.convByVar({
                  hant: "甲級來源格式評審",
                  hans: "甲级来源格式评审"
                }),
                score: 2
              },
              {
                rule: "5c-acr-half",
                desc: state_default.convByVar({
                  hant: "甲級來源格式快評",
                  hans: "甲级来源格式快评"
                }),
                score: 1
              },
              {
                rule: "5x-acr",
                desc: state_default.convByVar({
                  hant: "完整甲級評審",
                  hans: "完整甲级评审"
                }),
                score: 6
              }
            ]
          },
          {
            tab: state_default.convByVar({
              hant: "典範(特色)內容評審",
              hans: "典范(特色)内容评审"
            }),
            rules: [
              {
                rule: "5-fac",
                desc: state_default.convByVar({
                  hant: "典特評審",
                  hans: "典特评审"
                }),
                score: 2
              },
              {
                rule: "5-fac-half",
                desc: state_default.convByVar({
                  hant: "典特快評",
                  hans: "典特快评"
                }),
                score: 1
              },
              {
                rule: "5a-fac",
                desc: state_default.convByVar({
                  hant: "典特文筆評審",
                  hans: "典特文笔评审"
                }),
                score: 2
              },
              {
                rule: "5a-fac-half",
                desc: state_default.convByVar({
                  hant: "典特文筆快評",
                  hans: "典特文笔快评"
                }),
                score: 1
              },
              {
                rule: "5b-fac",
                desc: state_default.convByVar({
                  hant: "典特覆蓋面評審",
                  hans: "典特覆盖面评审"
                }),
                score: 2
              },
              {
                rule: "5b-fac-half",
                desc: state_default.convByVar({
                  hant: "典特覆蓋面快評",
                  hans: "典特覆盖面快评"
                }),
                score: 1
              },
              {
                rule: "5c-fac",
                desc: state_default.convByVar({
                  hant: "典特來源格式評審",
                  hans: "典特来源格式评审"
                }),
                score: 2
              },
              {
                rule: "5c-fac-half",
                desc: state_default.convByVar({
                  hant: "典特來源格式快評",
                  hans: "典特来源格式快评"
                }),
                score: 1
              },
              {
                rule: "5x-fac",
                desc: state_default.convByVar({
                  hant: "完整典特評審",
                  hans: "完整典特评审"
                }),
                score: 6
              }
            ]
          }
        ],
        explanation: state_default.convByVar({
          hant: "鼓勵維基人評審他人主編的條目。條目評審分為三大層面：文筆、覆蓋面、來源和格式。不完整評審（快評）折半得分。",
          hans: "鼓励维基人评审他人主编的条目。条目评审分为三大层面：文笔、覆盖面、来源和格式。不完整评审（快评）折半得分。"
        })
      },
      {
        group: state_default.convByVar({
          hant: "(6) 媒體",
          hans: "(6) 媒体"
        }),
        rules: [
          {
            rule: "6",
            desc: state_default.convByVar({
              hant: "媒體",
              hans: "媒体"
            }),
            score: 3
          },
          {
            rule: "6-fp",
            desc: state_default.convByVar({
              hant: "特色圖片",
              hans: "特色图片"
            }),
            score: 5
          }
        ],
        explanation: state_default.convByVar({
          hant: "鼓勵編者上載與 ACG 專題相關的自由版權媒體檔案至 Wikimedia Commons。若檔案當選特色圖片，額外加 5 分。",
          hans: "鼓励编辑者上传与 ACG 专题相关的自由版权媒体文件至 Wikimedia Commons。若文件当选特色图片，额外加 5 分。"
        })
      },
      {
        group: state_default.convByVar({
          hant: "(7) 他薦",
          hans: "(7) 他荐"
        }),
        rules: [
          {
            rule: "7",
            desc: state_default.convByVar({
              hant: "他薦",
              hans: "他荐"
            }),
            score: 0.5
          }
        ],
        explanation: state_default.convByVar({
          hant: "鼓勵維基人提名他人。每有效提名他人 1 次得 0.5 分，每人每月最多得 5 分。若多次得分，請按照規則編輯自定義分數。",
          hans: "鼓励维基人提名他人。每有效提名他人 1 次得 0.5 分，每人每月最多得 5 分。若多次得分，请按照规则编辑自定义分数。"
        })
      },
      {
        group: state_default.convByVar({
          hant: "(8) 其他",
          hans: "(8) 其他"
        }),
        rules: [
          {
            rule: "8",
            desc: state_default.convByVar({
              hant: "其他",
              hans: "其他"
            }),
            score: 0
          }
        ],
        explanation: state_default.convByVar({
          hant: "獎勵維基人做出的其他難以量化的貢獻，如大量整理格式條目、上載作品封面、製作模板、制定寫作方案、維護資料庫等。請手動編輯規則名稱、自定義分數，並附上說明。最終具體得分將由與專題成員共同商討得出。",
          hans: "奖励维基人做出的其他难以量化的贡献，如大量整理格式条目、上传作品封面、制作模板、制定写作方案、维护数据库等。请手动编辑规则名称、自定义分数，并附上说明。最终具体得分将由与专题成员共同商讨得出。"
        })
      }
    ];
  }
  function NominationRuleAliases() {
    return {
      "2a": "2-c",
      "c": "2-c",
      "2b": "2-b",
      "b": "2-b",
      "2c": "2-ga",
      "ga": "2-ga",
      "2d": "2-fa",
      "fa": "2-fa",
      "4a": "4-dyk",
      "dyk": "4-dyk",
      "4p": "4-req",
      "4p-game": "4-req-game",
      "4p-ac": "4-req-ac",
      "fp": "6-fp"
    };
  }
  function NominationRuleSet() {
    let ruleNames = [];
    let ruleDict = {};
    for (let ruleGroup of NominationRules()) {
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
      ruleNames,
      ruleDict
    };
  }
  function getOrderedRuleStatus(ruleNames, ruleStatus) {
    return ruleNames.filter((rule) => ruleStatus.hasOwnProperty(rule)).map((rule) => __spreadValues({ rule }, ruleStatus[rule]));
  }
  function generateReason(ruleStatus, check = false) {
    let reasonText = "", unselectedReasonText = "";
    let reasonScore = 0;
    let { ruleNames } = NominationRuleSet();
    let orderedRuleStatus = getOrderedRuleStatus(ruleNames, ruleStatus);
    for (const ruleItem of orderedRuleStatus) {
      if (check || ruleItem.selected) {
        if (isNaN(ruleItem.score) || ruleItem.score < 0) {
          mw.notify(state_default.convByVar({
            hant: "規則",
            hans: "规则"
          }) + "「" + ruleItem.rule + "」" + state_default.convByVar({
            hant: "的分數不合法，請檢查！",
            hans: "的分数不合法，请检查！"
          }), {
            type: "error",
            title: state_default.convByVar({
              hant: "錯誤",
              hans: "错误"
            })
          });
          return null;
        }
        if (ruleItem.selected) {
          reasonText += " " + ruleItem.rule;
          if (ruleItem.desc !== ruleItem.ogDesc) reasonText += "(" + ruleItem.desc + ")";
          if (ruleItem.score !== ruleItem.maxScore) reasonText += "[" + ruleItem.score + "]";
          reasonScore += ruleItem.score;
        } else if (check) {
          unselectedReasonText += " " + ruleItem.rule;
          if (ruleItem.desc !== ruleItem.ogDesc) unselectedReasonText += "(" + ruleItem.desc + ")";
          if (ruleItem.score !== ruleItem.maxScore) unselectedReasonText += "[" + ruleItem.score + "]";
        }
      }
    }
    reasonText = reasonText.trim();
    unselectedReasonText = unselectedReasonText.trim();
    if (check) {
      return {
        reasonText,
        unselectedReasonText,
        reasonScore
      };
    }
    return reasonText;
  }

  // src/api.js
  var mwApi = new mw.Api({ userAgent: "ACGATool/1.1.0" });
  async function getFullText(pageName = "") {
    let response = await mwApi.get({
      action: "query",
      titles: pageName || "WikiProject:ACG/維基ACG專題獎/登記處",
      prop: "revisions",
      rvslots: "*",
      rvprop: "content",
      indexpageids: 1
    });
    if (!response.query.pageids[0] || response.query.pages[response.query.pageids[0]].missing) {
      return "";
    }
    const fulltext = response.query.pages[response.query.pageids[0]].revisions[0].slots.main["*"] || "";
    return fulltext.trim();
  }
  function trimToken(token) {
    const leadingMatch = token.text.match(/^\s*/);
    const trailingMatch = token.text.match(/\s*$/);
    const leading = leadingMatch ? leadingMatch[0].length : 0;
    const trailing = trailingMatch ? trailingMatch[0].length : 0;
    return {
      text: token.text.trim(),
      start: token.start + leading,
      end: token.end - trailing
    };
  }
  function splitParameters(innerContent, offset) {
    let tokens = [];
    let lastIndex = 0;
    let braceCount = 0;
    let i = 0;
    while (i < innerContent.length) {
      if (innerContent.slice(i, i + 2) === "{{") {
        braceCount++;
        i += 2;
        continue;
      }
      if (innerContent.slice(i, i + 2) === "}}") {
        braceCount = Math.max(braceCount - 1, 0);
        i += 2;
        continue;
      }
      if (braceCount === 0 && innerContent[i] === "\n" && innerContent[i + 1] === "|") {
        tokens.push({
          text: innerContent.slice(lastIndex, i),
          start: offset + lastIndex,
          end: offset + i
        });
        i += 2;
        lastIndex = i;
        continue;
      }
      i++;
    }
    tokens.push({
      text: innerContent.slice(lastIndex),
      start: offset + lastIndex,
      end: offset + innerContent.length
    });
    return tokens;
  }
  function findTemplateEnd(text, start) {
    let braceCount = 0;
    let i = start;
    while (i < text.length) {
      if (text.slice(i, i + 2) === "{{") {
        braceCount++;
        i += 2;
        continue;
      }
      if (text.slice(i, i + 2) === "}}") {
        braceCount--;
        i += 2;
        if (braceCount === 0) break;
        continue;
      }
      i++;
    }
    return { endIndex: i };
  }
  function parseTemplate(text, start) {
    const templateStart = start;
    const { endIndex: templateEnd } = findTemplateEnd(text, start);
    const innerStart = start + 2;
    const innerEnd = templateEnd - 2;
    const innerContent = text.slice(innerStart, innerEnd);
    const tokens = splitParameters(innerContent, innerStart);
    let nameToken = trimToken(tokens[0]);
    let templateObj = {
      name: nameToken.text,
      nameLocation: {
        start: nameToken.start,
        end: nameToken.end
      },
      params: {},
      location: {
        start: templateStart,
        end: templateEnd
      }
    };
    if (templateObj.name.startsWith("ACG提名2")) {
      let kvGroups = {};
      for (let j = 1; j < tokens.length; j++) {
        let token = tokens[j];
        let tokenTrim = trimToken(token);
        if (tokenTrim.text === "") continue;
        const eqIndex = tokenTrim.text.indexOf("=");
        if (eqIndex === -1) continue;
        let rawKey = tokenTrim.text.substring(0, eqIndex);
        let rawValue = tokenTrim.text.substring(eqIndex + 1);
        let keyText = rawKey.trim();
        let valueText = rawValue.trim();
        let keyLeading = rawKey.match(/^\s*/)[0].length;
        let keyLocation = {
          start: tokenTrim.start + keyLeading,
          end: tokenTrim.start + keyLeading + keyText.length
        };
        let valueLeading = rawValue.match(/^\s*/)[0].length;
        let valueLocation = {
          start: tokenTrim.start + eqIndex + 1 + valueLeading,
          end: tokenTrim.end
        };
        let m = keyText.match(/^(.+?)(\d+)$/);
        if (m) {
          let prefix = m[1].trim();
          let num = parseInt(m[2], 10);
          if (!kvGroups[num]) kvGroups[num] = {};
          kvGroups[num][prefix] = {
            value: valueText,
            keyLocation,
            valueLocation,
            fullLocation: {
              start: token.start,
              end: token.end
            }
          };
        } else {
          if (!kvGroups["0"]) kvGroups["0"] = {};
          kvGroups["0"][keyText] = {
            value: valueText,
            keyLocation,
            valueLocation,
            fullLocation: {
              start: token.start,
              end: token.end
            }
          };
        }
      }
      let entries = [];
      let groupNums = Object.keys(kvGroups).filter((k) => k !== "0").map(Number).sort((a, b) => a - b);
      for (let num of groupNums) {
        let group = kvGroups[num];
        let allTokens = Object.values(group);
        let startPos = Math.min(...allTokens.map((t) => t.fullLocation.start));
        let endPos = Math.max(...allTokens.map((t) => t.fullLocation.end));
        group.fullLocation = {
          start: startPos,
          end: endPos
        };
        entries.push(group);
      }
      templateObj.entries = entries;
    } else {
      for (let j = 1; j < tokens.length; j++) {
        let token = tokens[j];
        let tokenTrim = trimToken(token);
        if (tokenTrim.text === "") continue;
        const eqIndex = tokenTrim.text.indexOf("=");
        if (eqIndex !== -1) {
          let rawKey = tokenTrim.text.substring(0, eqIndex);
          let rawValue = tokenTrim.text.substring(eqIndex + 1);
          let keyText = rawKey.trim();
          let valueText = rawValue.trim();
          let keyLeading = rawKey.match(/^\s*/)[0].length;
          let keyLocation = {
            start: tokenTrim.start + keyLeading,
            end: tokenTrim.start + keyLeading + keyText.length
          };
          let valueLeading = rawValue.match(/^\s*/)[0].length;
          let valueLocation = {
            start: tokenTrim.start + eqIndex + 1 + valueLeading,
            end: tokenTrim.end
          };
          templateObj.params[keyText] = {
            value: valueText,
            keyLocation,
            valueLocation,
            fullLocation: {
              start: token.start,
              end: token.end
            }
          };
        } else {
          templateObj.params[j] = {
            value: tokenTrim.text,
            fullLocation: {
              start: token.start,
              end: token.end
            }
          };
        }
      }
      if (templateObj.params["額外提名"]) {
        const extraParam = templateObj.params["額外提名"];
        extraParam.nestedTemplates = parseMultipleTemplates(text, extraParam.valueLocation.start, extraParam.valueLocation.end);
      }
    }
    return {
      template: templateObj,
      endIndex: templateEnd
    };
  }
  function parseMultipleTemplates(text, regionStart, regionEnd) {
    const templates = [];
    const regionText = text.slice(regionStart, regionEnd);
    const regex = /(^|\n)({{ACG提名\/extra)/g;
    let match;
    while ((match = regex.exec(regionText)) !== null) {
      let extraStart = regionStart + match.index + match[1].length;
      const {
        template,
        endIndex
      } = parseTemplate(text, extraStart);
      templates.push(template);
      regex.lastIndex = endIndex - regionStart;
    }
    return templates;
  }
  function getDateSections(text) {
    const regex = /^===\s*(.+?)\s*===/gm;
    let sections = [];
    let matches = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push({
        date: match[1].trim(),
        start: match.index,
        end: regex.lastIndex
      });
    }
    for (let i = 0; i < matches.length; i++) {
      const sectionStart = matches[i].start;
      const sectionDate = matches[i].date;
      const sectionEnd = i < matches.length - 1 ? matches[i + 1].start : text.length;
      sections.push({
        date: sectionDate,
        start: sectionStart,
        end: sectionEnd
      });
    }
    return sections;
  }
  function collectEntriesInSection(text, section) {
    let entries = [];
    const sectionText = text.slice(section.start, section.end);
    const regex = /{{(?:ACG提名2|ACG提名(?!\/extra))/g;
    let match;
    while ((match = regex.exec(sectionText)) !== null) {
      let absolutePos = section.start + match.index;
      let {
        template,
        endIndex
      } = parseTemplate(text, absolutePos);
      if (template.name.startsWith("ACG提名2")) {
        if (template.entries) {
          for (let entry of template.entries) {
            entries.push({
              template: entry,
              // entry holds the grouped key-value parameters
              start: entry.fullLocation.start,
              end: entry.fullLocation.end,
              type: "acg2"
            });
          }
        }
      } else {
        entries.push({
          template,
          start: template.location.start,
          end: template.location.end,
          type: "main"
        });
        if (template.params["額外提名"] && template.params["額外提名"].nestedTemplates) {
          for (let nested of template.params["額外提名"].nestedTemplates) {
            entries.push({
              template: nested,
              start: nested.location.start,
              end: nested.location.end,
              type: "extra"
            });
          }
        }
      }
      regex.lastIndex = endIndex - section.start;
    }
    entries.sort((a, b) => a.start - b.start);
    return entries;
  }
  function queryEntry(text, date, index) {
    const sections = getDateSections(text);
    const targetSection = sections.find((sec) => sec.date === date);
    if (!targetSection) return null;
    const entries = collectEntriesInSection(text, targetSection);
    if (index < 1 || index > entries.length) return null;
    return entries[index - 1];
  }
  function updateEntryParameters(original, entry, changes) {
    let mods = [];
    if (entry.type === "main" || entry.type === "extra") {
      let params = entry.template.params;
      for (let key in changes) {
        if (params[key] && params[key].valueLocation) {
          mods.push({
            start: params[key].valueLocation.start,
            end: params[key].valueLocation.end,
            replacement: changes[key]
          });
        }
      }
    } else if (entry.type === "acg2") {
      for (let key in changes) {
        if (entry.template[key]) {
          let token = entry.template[key];
          mods.push({
            start: token.valueLocation.start,
            end: token.valueLocation.end,
            replacement: changes[key]
          });
        }
      }
    }
    mods.sort((a, b) => b.start - a.start);
    let updated = original;
    for (let mod of mods) {
      updated = updated.slice(0, mod.start) + mod.replacement + updated.slice(mod.end);
    }
    return updated;
  }
  function removeComments(text) {
    text = text.replace(new RegExp("<!--.*?-->", "gs"), "");
    return text.trim();
  }
  function parseUserReason(reason) {
    reason = removeComments(reason);
    let ruleStatus = {};
    if (reason.startsWith("{{ACG提名2/request|ver=1|")) {
      reason = reason.slice("{{ACG提名2/request|ver=1|".length, -2);
    }
    let reasonList = reason.split(/\s+/);
    let ruleSet = NominationRuleSet();
    let ruleNames = ruleSet.ruleNames;
    let ruleAliases = NominationRuleAliases();
    for (let rule of reasonList) {
      if (rule.endsWith("?")) {
        rule = rule.slice(0, -1);
      }
      let ruleNameMod = "", ruleScoreMod = "";
      while (rule.endsWith(")") || rule.endsWith("]")) {
        if (rule.endsWith(")")) {
          let lastLeftParen = rule.lastIndexOf("(");
          if (lastLeftParen === -1) break;
          ruleNameMod = rule.slice(lastLeftParen + 1, -1);
          rule = rule.slice(0, lastLeftParen);
        }
        if (rule.endsWith("]")) {
          let lastLeftBracket = rule.lastIndexOf("[");
          if (lastLeftBracket === -1) break;
          ruleScoreMod = rule.slice(lastLeftBracket + 1, -1);
          rule = rule.slice(0, lastLeftBracket);
        }
      }
      if (rule === "") continue;
      if (ruleAliases[rule]) {
        rule = ruleAliases[rule];
      }
      if (ruleNames.includes(rule)) {
        ruleStatus[rule] = { selected: true };
        if (ruleNameMod !== "") {
          ruleStatus[rule].desc = ruleNameMod;
        }
        if (ruleScoreMod !== "") {
          ruleStatus[rule].score = parseFloat(ruleScoreMod);
          if (isNaN(ruleStatus[rule].score)) {
            console.log("[ACGATool] 分數不是數字", ruleScoreMod);
            return null;
          }
        }
      } else {
        console.log("[ACGATool] 不在提名規則中", rule);
        return null;
      }
    }
    return ruleStatus;
  }
  function queried2NomData(queried) {
    let nomData = {};
    if (queried.type === "main" || queried.type === "extra") {
      let params = queried.template.params;
      nomData.pageName = params["條目名稱"].value;
      nomData.awarder = params["用戶名稱"].value;
      let reasonWikitext = params["提名理由"].value;
      nomData.ruleStatus = parseUserReason(reasonWikitext);
      if (nomData.ruleStatus == null) {
        return null;
      }
      return nomData;
    } else if (queried.type === "acg2") {
      let params = queried.template;
      nomData.pageName = removeComments(params["條目名稱"].value);
      nomData.awarder = removeComments(params["用戶名稱"].value);
      let reasonWikitext = params["提名理由"].value;
      nomData.ruleStatus = parseUserReason(reasonWikitext);
      if (nomData.ruleStatus == null) {
        return null;
      }
      return nomData;
    } else {
      return null;
    }
  }
  async function getXToolsInfo(pageName) {
    try {
      return await $.get("https://xtools.wmcloud.org/api/page/pageinfo/" + mw.config.get("wgServerName") + "/" + pageName.replace(/["?%&+\\]/g, escape) + "?format=html&uselang=" + mw.config.get("wgUserLanguage"));
    } catch (error) {
      console.error("Error fetching XTools data:", error);
      return "";
    }
  }
  async function editPage(pageName, newText, editSummary) {
    let response = await mwApi.postWithToken("csrf", {
      action: "edit",
      title: pageName,
      text: newText,
      summary: editSummary
    });
    if (response.edit && response.edit.result === "Success") {
      return true;
    } else {
      console.error("Edit failed:", response);
      return false;
    }
  }
  async function appendToPage(pageName, appendText, editSummary) {
    let response = await mwApi.postWithToken("csrf", {
      action: "edit",
      title: pageName,
      appendtext: appendText,
      summary: editSummary
    });
    if (response.edit && response.edit.result === "Success") {
      return true;
    } else {
      console.error("Edit failed:", response);
      return false;
    }
  }
  async function editACGAScoreList(awarder, score) {
    let scorelistText = await getFullText("Module:ACGaward/list");
    let scorelistLines = scorelistText.trim().split("\n").slice(1, -1);
    let scorelist = {};
    for (let line of scorelistLines) {
      let match = line.match(/^\s*\[?(?:'([^']+)'|"([^"]+)")\]?\s*=\s*([+-]?[\d.]+)\s*,?\s*$/);
      if (match) {
        let name = match[1] || match[2];
        scorelist[name] = parseFloat(match[3]);
      }
    }
    let originalScore = scorelist[awarder] || 0;
    scorelist[awarder] = originalScore + score;
    let editSummary = awarder + " " + originalScore + "+" + score + "=" + scorelist[awarder];
    let sortedNames = Object.keys(scorelist).sort((a, b) => {
      return a.toLowerCase().localeCompare(b.toLowerCase(), "en");
    });
    let newScorelistText = "return {\n";
    for (let name of sortedNames) {
      let nameQuoted = name.includes('"') ? "'" + name + "'" : '"' + name + '"';
      newScorelistText += "    [" + nameQuoted + "] = " + scorelist[name].toString() + ",\n";
    }
    newScorelistText += "}";
    let success = await editPage("Module:ACGaward/list", newScorelistText, editSummary + "（[[User:SuperGrey/gadgets/ACGATool|核對分數]]）");
    if (success) {
      mw.notify(state_default.convByVar({
        hant: "Module:ACGaward/list 已成功更新！",
        hans: "Module:ACGaward/list 已成功更新！"
      }), {
        title: state_default.convByVar({
          hant: "成功",
          hans: "成功"
        }),
        autoHide: true
      });
      return false;
    } else {
      mw.notify(state_default.convByVar({
        hant: "Module:ACGaward/list 更新失敗！",
        hans: "Module:ACGaward/list 更新失败！"
      }), {
        type: "error",
        title: state_default.convByVar({
          hant: "錯誤",
          hans: "错误"
        })
      });
      return true;
    }
  }
  function refreshPage() {
    setTimeout(function() {
      location.reload();
    }, 2e3);
  }

  // src/dom.js
  function editNomination(date, index) {
    getFullText().then(function(fulltext) {
      state_default.queried = queryEntry(fulltext, date, index);
      let nomData = queried2NomData(state_default.queried);
      if (nomData == null) {
        mw.notify(state_default.convByVar({
          hant: "小工具無法讀取該提名，請手動編輯。",
          hans: "小工具无法读取该提名，请手动编辑。"
        }), {
          type: "error",
          title: state_default.convByVar({
            hant: "錯誤",
            hans: "错误"
          })
        });
      } else {
        showEditNominationDialog(nomData);
      }
    });
  }
  async function checkNomination(date, index, multiCheckStatus = null) {
    const fulltext = await getFullText();
    state_default.queried = queryEntry(fulltext, date, index);
    const nomData = queried2NomData(state_default.queried);
    if (nomData == null) {
      mw.notify(state_default.convByVar({
        hant: "小工具無法讀取該提名，請手動編輯。",
        hans: "小工具无法读取该提名，请手动编辑。"
      }), {
        type: "error",
        title: state_default.convByVar({
          hant: "錯誤",
          hans: "错误"
        })
      });
      return;
    }
    await showCheckNominationDialog(nomData, multiCheckStatus);
  }
  function multiCheckNomination() {
    $(".multi-nomCheck").each(function() {
      let $this = $(this);
      let checkbox = $('<input type="checkbox" class="multi-nomCheck-checkbox">');
      checkbox.data("date", $this.data("date"));
      checkbox.data("index", $this.data("index"));
      checkbox.on("change", function() {
        if ($(this).is(":checked")) {
          $this.closest("td").css("background-color", "#d4edda");
        } else {
          $this.closest("td").css("background-color", "");
        }
      });
      let startCheckingButton = $("<a>").text(state_default.convByVar({
        hant: "開始批次核對",
        hans: "开始批量核对"
      })).addClass("multi-nomCheck-startBtn").attr("href", "#");
      startCheckingButton.on("click", async function(e) {
        e.preventDefault();
        const $checkboxes = $(".multi-nomCheck-checkbox:checked");
        if (!$checkboxes.length) {
          mw.notify(state_default.convByVar({
            hant: "請至少選擇一個提名進行核對。",
            hans: "请至少选择一个提名进行核对。"
          }), {
            type: "warning",
            title: state_default.convByVar({
              hant: "提示",
              hans: "提示"
            })
          });
          return;
        }
        state_default.multiNomCheckOngoing = true;
        state_default.multiNomCheckChanged = false;
        for (let i = 0; i < $checkboxes.length; i++) {
          const $checkbox = $($checkboxes[i]);
          const date = $checkbox.data("date");
          const index = $checkbox.data("index");
          const status = `${i + 1}/${$checkboxes.length}`;
          await checkNomination(date, index, status);
        }
        state_default.multiNomCheckOngoing = false;
        if (state_default.multiNomCheckChanged) {
          refreshPage();
        }
      });
      $this.empty();
      $this.append(checkbox);
      $this.append(" ");
      $this.append(startCheckingButton);
    });
  }
  function newNomination() {
    showNewNominationDialog();
  }
  function archiveChapter(date) {
    OO.ui.confirm(state_default.convByVar({
      hant: "確定要歸檔「",
      hans: "确定要归档「"
    }) + date + state_default.convByVar({
      hant: "」章節嗎？",
      hans: "」章节吗？"
    })).done(async function(confirmed) {
      if (!confirmed) return;
      const fulltext = await getFullText();
      let sections = getDateSections(fulltext);
      let targetSection = sections.find((sec) => sec.date === date);
      if (!targetSection) {
        mw.notify(state_default.convByVar({
          hant: "小工具無法讀取該章節，請手動歸檔。",
          hans: "小工具无法读取该章节，请手动归档。"
        }), {
          type: "error",
          title: state_default.convByVar({
            hant: "錯誤",
            hans: "错误"
          })
        });
        return;
      }
      let sectionText = fulltext.slice(targetSection.start, targetSection.end);
      let fulltextWithoutSection = fulltext.slice(0, targetSection.start) + fulltext.slice(targetSection.end);
      let utcRegex = /提名人：.+?(\d{4})年(\d{1,2})月(\d{1,2})日 \((.*?)\) (\d{1,2}:\d{2}) \(UTC\)/;
      let utcMatch = sectionText.match(utcRegex);
      if (!utcMatch) {
        mw.notify(state_default.convByVar({
          hant: "小工具無法讀取該章節的UTC時間，請手動歸檔。",
          hans: "小工具无法读取该章节的UTC时间，请手动归档。"
        }), {
          type: "error",
          title: state_default.convByVar({
            hant: "錯誤",
            hans: "错误"
          })
        });
        return;
      }
      let yearMonth = utcMatch[1] + "年" + utcMatch[2] + "月";
      let archiveTarget = "WikiProject:ACG/維基ACG專題獎/存檔/" + yearMonth;
      mw.notify(state_default.convByVar({
        hant: "小工具正在歸檔中，請耐心等待。",
        hans: "小工具正在归档中，请耐心等待。"
      }), {
        type: "info",
        title: state_default.convByVar({
          hant: "提示",
          hans: "提示"
        }),
        autoHide: false
      });
      const archivePageText = await getFullText(archiveTarget);
      if (!archivePageText) {
        sectionText = "{{Talk archive|WikiProject:ACG/維基ACG專題獎/登記處}}\n\n" + sectionText;
      } else {
        sectionText = "\n\n" + sectionText;
      }
      const success = await appendToPage(archiveTarget, sectionText, "[[User:SuperGrey/gadgets/ACGATool|" + state_default.convByVar({
        hant: "歸檔",
        hans: "归档"
      }) + "]]「" + date + "」" + state_default.convByVar({
        hant: "章節",
        hans: "章节"
      }));
      if (success) {
        const success2 = await editPage("WikiProject:ACG/維基ACG專題獎/登記處", fulltextWithoutSection, "[[User:SuperGrey/gadgets/ACGATool|" + state_default.convByVar({
          hant: "歸檔",
          hans: "归档"
        }) + "]]「" + date + "」" + state_default.convByVar({
          hant: "章節至",
          hans: "章节至"
        }) + "「[[" + archiveTarget + "]]」");
        if (success2) {
          mw.notify(state_default.convByVar({
            hant: "小工具已歸檔",
            hans: "小工具已归档"
          }) + "「" + date + "」" + state_default.convByVar({
            hant: "章節至",
            hans: "章节至"
          }) + "「[[" + archiveTarget + "]]」。", {
            type: "success",
            title: state_default.convByVar({
              hant: "成功",
              hans: "成功"
            })
          });
          refreshPage();
        } else {
          mw.notify(state_default.convByVar({
            hant: "編輯提名頁面失敗，小工具無法歸檔，請手動歸檔。",
            hans: "编辑提名页面失败，小工具无法归档，请手动归档。"
          }), {
            type: "error",
            title: state_default.convByVar({
              hant: "錯誤",
              hans: "错误"
            })
          });
        }
      } else {
        mw.notify(state_default.convByVar({
          hant: "編輯存檔頁面失敗，小工具無法歸檔，請手動歸檔。",
          hans: "编辑存档页面失败，小工具无法归档，请手动归档。"
        }), {
          type: "error",
          title: state_default.convByVar({
            hant: "錯誤",
            hans: "错误"
          })
        });
      }
    });
  }
  function addEditButtonsToPage() {
    let newNominationButton = $('span[role="button"]').filter(function() {
      return $(this).text() === "登記新提名" || $(this).text() === "登记新提名";
    });
    if (newNominationButton.length > 0) {
      newNominationButton.text(state_default.convByVar({
        hant: "手動登記新提名",
        hans: "手动登记新提名"
      }));
      newNominationButton.removeClass("mw-ui-progressive");
      let newNominationButtonParent = newNominationButton.parent().parent();
      let editUIButton = $("<span>").addClass("mw-ui-button").addClass("mw-ui-progressive").attr("role", "button").text(state_default.convByVar({
        hant: "登記新提名",
        hans: "登记新提名"
      }));
      let editButton = $("<a>").attr("href", "javascript:void(0)").append(editUIButton).click(newNomination);
      newNominationButtonParent.append(" ").append(editButton);
    }
    $("div.mw-heading3").each(function() {
      let h3div = $(this);
      let h3 = h3div.find("h3").first();
      let date = h3.text().trim();
      let index = 0;
      let editsection = h3div.find("span.mw-editsection").first();
      let editsectionA = editsection.find("a").first();
      $("<a>").attr("href", "javascript:void(0)").click(function() {
        archiveChapter(date);
      }).append(state_default.convByVar({
        hant: "歸檔",
        hans: "归档"
      })).insertAfter(editsectionA);
      $("<span>&nbsp;|&nbsp;</span>").insertAfter(editsectionA);
      h3div.nextUntil("div.mw-heading3", "table.acgnom-table").each(function() {
        let table = $(this);
        let rows = table.find("tr").slice(1);
        let title = "";
        rows.each(function() {
          let row = $(this);
          let th = row.find("th");
          if (th.length !== 0) {
            let nomEntry = th.first();
            let nomEntryA = nomEntry.find("a");
            if (nomEntryA.length !== 0) {
              title = nomEntry.find("a").first().attr("title");
            } else {
              title = nomEntry.text().trim();
            }
            ++index;
            let editIcon = $("<img>").attr("src", "https://upload.wikimedia.org/wikipedia/commons/8/8a/OOjs_UI_icon_edit-ltr-progressive.svg").css({ "width": "12px" });
            const currentIndex = index;
            let editButton = $("<a>").attr("href", "javascript:void(0)").append(editIcon).click(function() {
              editNomination(date, currentIndex);
            });
            nomEntry.append(" ").append(editButton);
          } else {
            let td = row.find("td").first();
            let mwNoTalk = td.find(".mw-notalk").first();
            const currentIndex = index;
            let checkIcon = $("<img>").attr("src", "https://upload.wikimedia.org/wikipedia/commons/3/30/OOjs_UI_icon_highlight-progressive.svg").css({
              "width": "12px",
              "vertical-align": "sub"
            });
            let checkButton = $("<a>").css({
              "display": "inline-block",
              "margin-left": "5px",
              "font-size": ".857em",
              "font-weight": "bold"
            }).append(checkIcon).append(" ").append(state_default.convByVar({
              hant: "核對",
              hans: "核对"
            })).attr("href", "javascript:void(0)").click(async function() {
              await checkNomination(date, currentIndex);
            });
            mwNoTalk.append(checkButton);
            let multiCheckDiv = $("<div>").addClass("multi-nomCheck").attr("data-date", date).attr("data-index", currentIndex).css({
              "display": "inline-block",
              "margin-left": "5px",
              "font-size": ".857em"
            });
            let multiCheckButton = $("<a>").attr("href", "javascript:void(0)").text(state_default.convByVar({
              hant: "多選",
              hans: "多选"
            })).click(function() {
              multiCheckNomination();
            });
            multiCheckDiv.append(multiCheckButton);
            mwNoTalk.append(multiCheckDiv);
          }
        });
      });
    });
  }
  async function saveNewNomination() {
    let proposedWikitext = "{{ACG提名2";
    for (let i = 0; i < state_default.nominations.length; i++) {
      let nomination = state_default.nominations[i];
      if (nomination.awarder === "" || nomination.pageName === "") {
        mw.notify(state_default.convByVar({
          hant: "得分者或得分條目未填寫，請檢查！",
          hans: "得分者或得分条目未填写，请检查！"
        }), {
          type: "error",
          title: state_default.convByVar({
            hant: "錯誤",
            hans: "错误"
          })
        });
        return true;
      }
      let reasonText = generateReason(nomination.ruleStatus);
      if (reasonText == null) {
        return true;
      }
      if (reasonText === "") {
        mw.notify(state_default.convByVar({
          hant: "未選擇任何評審規則，請檢查！",
          hans: "未选择任何评审规则，请检查！"
        }), {
          type: "error",
          title: state_default.convByVar({
            hant: "錯誤",
            hans: "错误"
          })
        });
        return true;
      }
      proposedWikitext += "\n|條目名稱" + (i + 1) + " = " + nomination.pageName.trim();
      proposedWikitext += "\n|用戶名稱" + (i + 1) + " = " + nomination.awarder.trim();
      proposedWikitext += "\n|提名理由" + (i + 1) + " = {{ACG提名2/request|ver=1|" + reasonText + "}}";
      proposedWikitext += "\n|核對用" + (i + 1) + " = {{ACG提名2/check|ver=1|}}";
    }
    const signature = "~~~~";
    proposedWikitext += "\n}}\n'''提名人：'''" + signature;
    let message = newNominationDialog.messageInput.getValue().trim();
    if (message !== "") {
      proposedWikitext += "\n: {{說明}}：" + message + "--" + signature;
    }
    let today = /* @__PURE__ */ new Date();
    let todayDate = today.getMonth() + 1 + "月" + today.getDate() + "日";
    let fulltext = await getFullText();
    if (!fulltext.includes("=== " + todayDate + " ===")) {
      proposedWikitext = "=== " + todayDate + " ===\n" + proposedWikitext;
    }
    let success = await appendToPage("WikiProject:ACG/維基ACG專題獎/登記處", "\n" + proposedWikitext, "[[User:SuperGrey/gadgets/ACGATool|新提名]]");
    if (success) {
      mw.notify(state_default.convByVar({
        hant: "新提名已成功提交！",
        hans: "新提名已成功提交！"
      }), {
        title: state_default.convByVar({
          hant: "成功",
          hans: "成功"
        }),
        autoHide: true
      });
      refreshPage();
      return false;
    } else {
      mw.notify(state_default.convByVar({
        hant: "新提名提交失敗：",
        hans: "新提名提交失败："
      }), {
        type: "error",
        title: state_default.convByVar({
          hant: "錯誤",
          hans: "错误"
        })
      });
      return true;
    }
  }
  async function saveModifiedNomination() {
    let nomination = state_default.nominations[0];
    if (nomination.awarder === "" || nomination.pageName === "") {
      mw.notify(state_default.convByVar({
        hant: "得分者或得分條目未填寫，請檢查！",
        hans: "得分者或得分条目未填写，请检查！"
      }), {
        type: "error",
        title: state_default.convByVar({
          hant: "錯誤",
          hans: "错误"
        })
      });
      return true;
    }
    let reasonText = generateReason(nomination.ruleStatus);
    if (reasonText == null) {
      return true;
    }
    if (reasonText === "") {
      mw.notify(state_default.convByVar({
        hant: "未選擇任何評審規則，請檢查！",
        hans: "未选择任何评审规则，请检查！"
      }), {
        type: "error",
        title: state_default.convByVar({
          hant: "錯誤",
          hans: "错误"
        })
      });
      return true;
    }
    let fulltext = await getFullText(), updatedText;
    if (state_default.queried.type === "main" || state_default.queried.type === "extra") {
      let changes = {
        "條目名稱": nomination.pageName,
        "用戶名稱": nomination.awarder,
        "提名理由": "{{ACG提名2/request|ver=1|" + reasonText + "}}"
      };
      updatedText = updateEntryParameters(fulltext, state_default.queried, changes);
    } else if (state_default.queried.type === "acg2") {
      let changes = {
        "條目名稱": nomination.pageName,
        "用戶名稱": nomination.awarder,
        "提名理由": "{{ACG提名2/request|ver=1|" + reasonText + "}}"
      };
      updatedText = updateEntryParameters(fulltext, state_default.queried, changes);
    }
    if (updatedText === fulltext) {
      mw.notify(state_default.convByVar({
        hant: "提名並未改動！",
        hans: "提名并未改动！"
      }), {
        type: "warn",
        title: state_default.convByVar({
          hant: "提示",
          hans: "提示"
        })
      });
      return true;
    }
    let success = await editPage("WikiProject:ACG/維基ACG專題獎/登記處", updatedText, "[[User:SuperGrey/gadgets/ACGATool|編輯提名]]");
    if (success) {
      mw.notify(state_default.convByVar({
        hant: "提名已成功修改！",
        hans: "提名已成功修改！"
      }), {
        title: state_default.convByVar({
          hant: "成功",
          hans: "成功"
        }),
        autoHide: true
      });
      refreshPage();
      return false;
    } else {
      mw.notify(state_default.convByVar({
        hant: "提名修改失敗！",
        hans: "提名修改失败！"
      }), {
        type: "error",
        title: state_default.convByVar({
          hant: "錯誤",
          hans: "错误"
        })
      });
      return true;
    }
  }
  async function saveNominationCheck() {
    let nomination = state_default.nominations[0];
    let checkText = "{{ACG提名2/check|ver=1|";
    let reasonScore = 0;
    if (nomination.invalid) {
      checkText += "0";
    } else {
      let reasonObject = generateReason(nomination.ruleStatus, true);
      if (reasonObject == null) {
        return true;
      }
      let reasonText = reasonObject.reasonText;
      let unselectedReasonText = reasonObject.unselectedReasonText;
      reasonScore = reasonObject.reasonScore;
      checkText += reasonText;
      if (unselectedReasonText !== "") {
        checkText += "|no=" + unselectedReasonText;
      }
    }
    checkText += "}}" + nomination.message;
    let signature = "~~~~";
    checkText += "--" + signature;
    let fulltext = await getFullText(), updatedText;
    if (state_default.queried.type === "main" || state_default.queried.type === "extra") {
      let changes = { "核對用": checkText };
      updatedText = updateEntryParameters(fulltext, state_default.queried, changes);
    } else if (state_default.queried.type === "acg2") {
      let changes = { "核對用": checkText };
      updatedText = updateEntryParameters(fulltext, state_default.queried, changes);
    }
    if (updatedText === fulltext) {
      mw.notify(state_default.convByVar({
        hant: "核分並未改動！",
        hans: "核分并未改动！"
      }), {
        type: "warn",
        title: state_default.convByVar({
          hant: "提示",
          hans: "提示"
        })
      });
      return true;
    }
    let success = await editPage("WikiProject:ACG/維基ACG專題獎/登記處", updatedText, "[[User:SuperGrey/gadgets/ACGATool|核對分數]]");
    if (success) {
      mw.notify(state_default.convByVar({
        hant: "核分已成功提交！",
        hans: "核分已成功提交！"
      }), {
        title: state_default.convByVar({
          hant: "成功",
          hans: "成功"
        }),
        autoHide: false
      });
      if (reasonScore > 0) {
        await editACGAScoreList(nomination.awarder, reasonScore);
      }
      if (!state_default.multiNomCheckOngoing) {
        refreshPage();
      }
      state_default.multiNomCheckChanged = true;
      return false;
    } else {
      mw.notify(state_default.convByVar({
        hant: "核分提交失敗！",
        hans: "核分提交失败！"
      }), {
        type: "error",
        title: state_default.convByVar({
          hant: "錯誤",
          hans: "错误"
        })
      });
      return true;
    }
  }

  // src/dialog.js
  var windowManager = null;
  var newNominationDialog = null;
  var editNominationDialog = null;
  var editNominationDialogContent = new OO.ui.FieldsetLayout();
  var checkNominationDialog = null;
  var checkNominationDialogContent = new OO.ui.FieldsetLayout();
  function initOOUI() {
    initDynamicWidthTextInputWidget();
    initRuleCheckboxInputWidget();
    initNewNominationDialog();
    initEditNominationDialog();
    initCheckNominationDialog();
    initWindowManager();
  }
  function initWindowManager() {
    windowManager = new OO.ui.WindowManager();
    $(document.body).append(windowManager.$element);
  }
  function DynamicWidthTextInputWidget(config) {
    DynamicWidthTextInputWidget.parent.call(this, config);
    this.$measure = $("<span>").css({
      position: "absolute",
      visibility: "hidden",
      whiteSpace: "pre",
      fontSize: "14px",
      fontFamily: "sans-serif"
    }).appendTo(document.body);
    this.$input.on("input", this.adjustWidth.bind(this));
  }
  function initDynamicWidthTextInputWidget() {
    OO.inheritClass(DynamicWidthTextInputWidget, OO.ui.TextInputWidget);
    mw.util.addCSS(".DynamicWidthTextInputWidget { display: inline-block; vertical-align: baseline; width: auto; margin: 0; } .DynamicWidthTextInputWidget input { height: 20px !important; border: none !important; border-bottom: 2px solid #ccc !important; padding: 0 !important; text-align: center; } .DynamicWidthTextInputWidget input:focus { outline: none !important; box-shadow: none !important; border-bottom: 2px solid #36c !important; } .DynamicWidthTextInputWidget input:disabled { background-color: transparent !important; color: #101418 !important; -webkit-text-fill-color: #101418 !important; text-shadow: none !important; border-bottom: 2px solid #fff !important; }");
    DynamicWidthTextInputWidget.prototype.adjustWidth = function() {
      let text = this.getValue() || "";
      this.$measure.text(text);
      let newWidth = this.$measure.width() + 5;
      this.$input.css("width", newWidth + "px");
    };
  }
  function RuleCheckboxInputWidget(config) {
    RuleCheckboxInputWidget.parent.call(this, config);
    this.ruleset = config.ruleset;
    this.nomidx = config.nomidx;
    this.check = config.check || false;
    if (!state_default.nominations[this.nomidx].ruleStatus[this.ruleset.rule]) {
      state_default.nominations[this.nomidx].ruleStatus[this.ruleset.rule] = {
        selected: this.isSelected(),
        desc: this.ruleset.desc,
        ogDesc: this.ruleset.desc,
        score: this.ruleset.score,
        maxScore: this.ruleset.score
      };
    } else {
      this.setSelected(state_default.nominations[this.nomidx].ruleStatus[this.ruleset.rule].selected);
      if (!state_default.nominations[this.nomidx].ruleStatus[this.ruleset.rule].desc) {
        state_default.nominations[this.nomidx].ruleStatus[this.ruleset.rule].desc = this.ruleset.desc;
      }
      state_default.nominations[this.nomidx].ruleStatus[this.ruleset.rule].ogDesc = this.ruleset.desc;
      if (!state_default.nominations[this.nomidx].ruleStatus[this.ruleset.rule].score) {
        state_default.nominations[this.nomidx].ruleStatus[this.ruleset.rule].score = this.ruleset.score;
      }
      state_default.nominations[this.nomidx].ruleStatus[this.ruleset.rule].maxScore = this.ruleset.score;
    }
    this.ruleInputWidget = new DynamicWidthTextInputWidget({
      value: state_default.nominations[this.nomidx].ruleStatus[this.ruleset.rule].desc,
      disabled: this.check ? false : !this.isSelected()
    });
    this.ruleInputWidget.$element.addClass("DynamicWidthTextInputWidget");
    this.ruleInputWidget.$element.css({ "margin-left": "5px" });
    this.ruleInputWidget.adjustWidth();
    this.leftBracketLabelWidget = new OO.ui.LabelWidget({ label: "(" });
    this.leftBracketLabelWidget.$element.css({
      "vertical-align": "baseline",
      "border-bottom": "2px solid #fff"
    });
    this.scoreInputWidget = new DynamicWidthTextInputWidget({
      value: state_default.nominations[this.nomidx].ruleStatus[this.ruleset.rule].score,
      disabled: this.check ? false : !this.isSelected()
    });
    this.scoreInputWidget.$element.addClass("DynamicWidthTextInputWidget");
    this.scoreInputWidget.adjustWidth();
    this.rightBracketLabelWidget = new OO.ui.LabelWidget({ label: "分)" });
    this.rightBracketLabelWidget.$element.css({
      "vertical-align": "baseline",
      "border-bottom": "2px solid #fff",
      "margin-right": "10px"
    });
    this.$element.append(this.ruleInputWidget.$element);
    this.$element.append(this.leftBracketLabelWidget.$element);
    this.$element.append(this.scoreInputWidget.$element);
    this.$element.append(this.rightBracketLabelWidget.$element);
    this.on("change", this.handleCheckboxChange.bind(this));
    this.ruleInputWidget.on("change", this.handleRuleInputChange.bind(this));
    this.scoreInputWidget.on("change", this.handleScoreInputChange.bind(this));
  }
  function initRuleCheckboxInputWidget() {
    OO.inheritClass(RuleCheckboxInputWidget, OO.ui.CheckboxInputWidget);
    RuleCheckboxInputWidget.prototype.handleCheckboxChange = function(isChecked) {
      state_default.nominations[this.nomidx].ruleStatus[this.ruleset.rule].selected = isChecked;
      let disableCheck = this.check ? false : !isChecked;
      this.ruleInputWidget.setDisabled(disableCheck);
      this.scoreInputWidget.setDisabled(disableCheck);
      if (disableCheck) {
        this.ruleInputWidget.setValue(this.ruleset.desc);
        this.ruleInputWidget.adjustWidth();
        this.scoreInputWidget.setValue(this.ruleset.score);
        this.scoreInputWidget.adjustWidth();
      }
    };
    RuleCheckboxInputWidget.prototype.handleRuleInputChange = function(newValue) {
      state_default.nominations[this.nomidx].ruleStatus[this.ruleset.rule].desc = newValue;
    };
    RuleCheckboxInputWidget.prototype.handleScoreInputChange = function(newValue) {
      state_default.nominations[this.nomidx].ruleStatus[this.ruleset.rule].score = parseFloat(newValue);
    };
  }
  function generateNominationFieldset(nomData = null) {
    let awarder, pageName, ruleStatus;
    if (nomData) {
      awarder = nomData.awarder;
      pageName = nomData.pageName;
      ruleStatus = nomData.ruleStatus;
    } else {
      awarder = mw.config.get("wgUserName");
      pageName = "";
      ruleStatus = {};
    }
    const currentNomidx = state_default.nominations.length;
    state_default.nominations.push({
      awarder,
      pageName,
      ruleStatus
    });
    let userNameInput = new OO.ui.TextInputWidget({ value: state_default.nominations[currentNomidx].awarder });
    userNameInput.on("change", function(newValue) {
      state_default.nominations[currentNomidx].awarder = newValue;
    });
    let userNameField = new OO.ui.FieldLayout(userNameInput, {
      label: state_default.convByVar({
        hant: "得分者",
        hans: "得分者"
      }),
      align: "left"
    });
    let pageNameInput = new OO.ui.TextInputWidget({ value: state_default.nominations[currentNomidx].pageName });
    pageNameInput.on("change", function(newValue) {
      state_default.nominations[currentNomidx].pageName = newValue;
    });
    let pageNameField = new OO.ui.FieldLayout(pageNameInput, {
      label: state_default.convByVar({
        hant: "得分條目",
        hans: "得分条目"
      }),
      align: "left",
      help: state_default.convByVar({
        hant: "可填「他薦」",
        hans: "可填「他荐」"
      }),
      helpInline: true
    });
    let reasonFieldsetLayout = new OO.ui.FieldsetLayout();
    reasonFieldsetLayout.$element.css({ "padding-top": "15px" });
    let rules = NominationRules();
    for (let i = 0; i < rules.length; i++) {
      let ruleGroup = rules[i];
      let ruleGroupFieldset = new OO.ui.FieldsetLayout({
        label: ruleGroup.group,
        align: "top",
        help: ruleGroup.explanation,
        helpInline: true
      });
      if (ruleGroup.rules) {
        let ruleItems = [];
        for (let j = 0; j < ruleGroup.rules.length; j++) {
          let rule = ruleGroup.rules[j];
          let ruleCheckbox = new RuleCheckboxInputWidget({
            value: rule.rule,
            ruleset: rule,
            nomidx: currentNomidx
          });
          ruleItems.push(ruleCheckbox);
        }
        let horizontalLayout = new OO.ui.HorizontalLayout({ items: ruleItems });
        ruleGroupFieldset.addItems(horizontalLayout);
      } else {
        for (let j = 0; j < ruleGroup.tabs.length; j++) {
          let tab = ruleGroup.tabs[j];
          let tabFieldset = new OO.ui.FieldsetLayout({ label: tab.tab });
          tabFieldset.$element.find("legend > span").css({ "font-size": "1.05em" });
          let ruleItems = [];
          for (let k = 0; k < tab.rules.length; k++) {
            let rule = tab.rules[k];
            let ruleCheckbox = new RuleCheckboxInputWidget({
              value: rule.rule,
              ruleset: rule,
              nomidx: currentNomidx
            });
            ruleItems.push(ruleCheckbox);
          }
          let horizontalLayout = new OO.ui.HorizontalLayout({ items: ruleItems });
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
        reasonFieldsetLayout
      ]
    });
    nominationFieldset.$element.css({ "margin-top": 0 });
    if (!nomData) {
      let hr = $("<hr>").css({
        "margin-top": "15px",
        "margin-bottom": "15px"
      });
      nominationFieldset.$element.prepend(hr);
    }
    return nominationFieldset;
  }
  async function generateChecklistFieldset(nomData) {
    let awarder = nomData.awarder;
    let pageName = nomData.pageName;
    let ruleStatus = nomData.ruleStatus;
    state_default.nominations.push({
      awarder,
      pageName,
      ruleStatus,
      invalid: false,
      message: ""
    });
    let userNameLinkLabelWidget = new OO.ui.LabelWidget({ label: $("<a>").attr("href", mw.util.getUrl("User:" + awarder)).text(awarder) });
    let userTalkLinkLabelWidget = new OO.ui.LabelWidget({
      label: $("<a>").attr("href", mw.util.getUrl("User talk:" + awarder)).text(state_default.convByVar({
        hant: "討論",
        hans: "讨论"
      }))
    });
    let userContribsLinkLabelWidget = new OO.ui.LabelWidget({
      label: $("<a>").attr("href", mw.util.getUrl("Special:用户贡献/" + awarder)).text(state_default.convByVar({
        hant: "貢獻",
        hans: "贡献"
      }))
    });
    let userNameHorizontalLayout = new OO.ui.HorizontalLayout({
      items: [
        userNameLinkLabelWidget,
        new OO.ui.LabelWidget({ label: "（" }),
        userTalkLinkLabelWidget,
        new OO.ui.LabelWidget({ label: "·" }),
        userContribsLinkLabelWidget,
        new OO.ui.LabelWidget({ label: "）" })
      ]
    });
    userNameHorizontalLayout.$element.css({
      "gap": "4px",
      "width": "80%",
      "flex-shrink": "0",
      "flex-wrap": "wrap"
    });
    let userNameLabelWidget = new OO.ui.LabelWidget({
      label: state_default.convByVar({
        hant: "得分者",
        hans: "得分者"
      })
    });
    userNameLabelWidget.$element.css({
      "flex-grow": 1,
      "align-self": "stretch"
    });
    let userNameField = new OO.ui.HorizontalLayout({
      items: [
        userNameLabelWidget,
        userNameHorizontalLayout
      ]
    });
    let pageNameHorizontalLayout, pageNameLabelWidget;
    if (pageName === "他薦" || pageName === "他荐") {
      pageNameLabelWidget = new OO.ui.LabelWidget({
        label: state_default.convByVar({
          hant: "他薦",
          hans: "他荐"
        })
      });
      pageNameHorizontalLayout = new OO.ui.HorizontalLayout({ items: [pageNameLabelWidget] });
    } else {
      pageNameLabelWidget = new OO.ui.LabelWidget({ label: $("<a>").attr("href", mw.util.getUrl(pageName)).text(pageName) });
      let pageTalkLabelWidget = new OO.ui.LabelWidget({
        label: $("<a>").attr("href", mw.util.getUrl("Talk:" + pageName)).text(state_default.convByVar({
          hant: "討論",
          hans: "讨论"
        }))
      });
      let pageHistoryLabelWidget = new OO.ui.LabelWidget({
        label: $("<a>").attr("href", mw.util.getUrl(pageName, { action: "history" })).text(state_default.convByVar({
          hant: "歷史",
          hans: "历史"
        }))
      });
      let pagesLinkedToPageLabelWidget = new OO.ui.LabelWidget({
        label: $("<a>").attr("href", mw.util.getUrl("Special:链入页面/" + pageName)).text(state_default.convByVar({
          hant: "連入",
          hans: "链入"
        }))
      });
      let xtoolsData = await getXToolsInfo(pageName);
      let xtoolsPageInfoLabelWidget = new OO.ui.LabelWidget({ label: $("<div>").html(xtoolsData) });
      xtoolsPageInfoLabelWidget.$element.css({ "font-size": "0.9em" });
      pageNameHorizontalLayout = new OO.ui.HorizontalLayout({
        items: [
          pageNameLabelWidget,
          new OO.ui.LabelWidget({ label: "（" }),
          pageTalkLabelWidget,
          new OO.ui.LabelWidget({ label: "·" }),
          pageHistoryLabelWidget,
          new OO.ui.LabelWidget({ label: "·" }),
          pagesLinkedToPageLabelWidget,
          new OO.ui.LabelWidget({ label: "）" }),
          xtoolsPageInfoLabelWidget
        ]
      });
    }
    pageNameHorizontalLayout.$element.css({
      "gap": "4px",
      "width": "80%",
      "flex-shrink": "0",
      "flex-wrap": "wrap"
    });
    let pageLabelLabelWidget = new OO.ui.LabelWidget({
      label: state_default.convByVar({
        hant: "得分條目",
        hans: "得分条目"
      })
    });
    pageLabelLabelWidget.$element.css({
      "flex-grow": 1,
      "align-self": "stretch"
    });
    let pageNameField = new OO.ui.HorizontalLayout({
      items: [
        pageLabelLabelWidget,
        pageNameHorizontalLayout
      ]
    });
    pageNameField.$element.css({ "margin-top": "15px" });
    let invalidToggleSwitchWidget = new OO.ui.ToggleSwitchWidget({ value: false });
    invalidToggleSwitchWidget.on("change", function(isChecked) {
      state_default.nominations[0].invalid = isChecked;
    });
    let invalidField = new OO.ui.FieldLayout(invalidToggleSwitchWidget, {
      label: state_default.convByVar({
        hant: "提名無效",
        hans: "提名无效"
      }),
      align: "left"
    });
    invalidField.$element.css({ "margin-top": "15px" });
    invalidField.$element.addClass("checklist-field");
    let reasonField = new OO.ui.HorizontalLayout();
    reasonField.$element.css({ "margin-top": "15px" });
    let reasonLabelWidget = new OO.ui.LabelWidget({
      label: state_default.convByVar({
        hant: "提名理由",
        hans: "提名理由"
      })
    });
    reasonLabelWidget.$element.css({
      "flex-grow": 1,
      "align-self": "stretch"
    });
    let ruleItems = [];
    let {
      ruleNames,
      ruleDict
    } = NominationRuleSet();
    let orderedRuleStatus = getOrderedRuleStatus(ruleNames, ruleStatus);
    for (const ruleItem of orderedRuleStatus) {
      let ruleSet = ruleDict[ruleItem.rule];
      let ruleCheckbox = new RuleCheckboxInputWidget({
        value: ruleItem.rule,
        ruleset: ruleSet,
        nomidx: 0,
        check: true
      });
      ruleItems.push(ruleCheckbox);
    }
    let horizontalLayout = new OO.ui.HorizontalLayout({ items: ruleItems });
    horizontalLayout.$element.css({
      "width": "80%",
      "flex-shrink": "0",
      "flex-wrap": "wrap"
    });
    reasonField.addItems([
      reasonLabelWidget,
      horizontalLayout
    ]);
    let messageInput = new OO.ui.MultilineTextInputWidget({
      autosize: true,
      rows: 1
    });
    messageInput.on("change", function(newValue) {
      state_default.nominations[0].message = newValue;
    });
    messageInput.on("resize", function() {
      try {
        checkNominationDialog.updateSize();
      } catch (error) {
        console.error("[ACGATool] Error updating dialog size:", error);
      }
    });
    let messageField = new OO.ui.FieldLayout(messageInput, {
      label: state_default.convByVar({
        hant: "附加說明",
        hans: "附加说明"
      }),
      align: "left",
      help: state_default.convByVar({
        hant: "可不填；無須簽名",
        hans: "可不填；无须签名"
      }),
      helpInline: true
    });
    messageField.$element.css({ "margin-top": "15px" });
    messageField.$element.addClass("checklist-field");
    let nominationFieldset = new OO.ui.FieldsetLayout({
      items: [
        userNameField,
        pageNameField,
        invalidField,
        reasonField,
        messageField
      ]
    });
    nominationFieldset.$element.css({ "margin-top": 0 });
    return nominationFieldset;
  }
  function NewNominationDialog(config) {
    NewNominationDialog.super.call(this, config);
  }
  function initNewNominationDialog() {
    OO.inheritClass(NewNominationDialog, OO.ui.ProcessDialog);
    NewNominationDialog.static.name = "NewNominationDialog";
    NewNominationDialog.static.title = state_default.convByVar({
      hant: "新提名（維基ACG專題獎小工具）",
      hans: "新提名（维基ACG专题奖小工具）"
    });
    NewNominationDialog.static.actions = [
      {
        action: "save",
        label: state_default.convByVar({
          hant: "儲存",
          hans: "储存"
        }),
        flags: [
          "primary",
          "progressive"
        ]
      },
      {
        action: "cancel",
        label: state_default.convByVar({
          hant: "取消",
          hans: "取消"
        }),
        flags: "safe"
      },
      {
        action: "add",
        label: state_default.convByVar({
          hant: "額外提名 + 1",
          hans: "额外提名 + 1"
        })
      },
      {
        action: "minus",
        label: state_default.convByVar({
          hant: "額外提名 − 1",
          hans: "额外提名 − 1"
        })
      }
    ];
    NewNominationDialog.prototype.initialize = function() {
      NewNominationDialog.super.prototype.initialize.call(this);
      this.panel = new OO.ui.PanelLayout({
        padded: true,
        expanded: false
      });
      this.content = new OO.ui.FieldsetLayout();
      this.messageInput = new OO.ui.MultilineTextInputWidget({
        autosize: true,
        rows: 1
      });
      this.messageInput.connect(this, { resize: "onMessageInputResize" });
      this.messageInputField = new OO.ui.FieldLayout(this.messageInput, {
        label: state_default.convByVar({
          hant: "附加說明",
          hans: "附加说明"
        }),
        align: "top",
        help: state_default.convByVar({
          hant: "可不填；無須簽名",
          hans: "可不填；无须签名"
        }),
        helpInline: true
      });
      this.messageInputFieldSet = new OO.ui.FieldsetLayout({ items: [this.messageInputField] });
      this.content.addItems([
        this.messageInputFieldSet,
        generateNominationFieldset()
      ]);
      this.panel.$element.append(this.content.$element);
      this.$body.append(this.panel.$element);
    };
    NewNominationDialog.prototype.onMessageInputResize = function() {
      this.updateSize();
    };
    NewNominationDialog.prototype.getBodyHeight = function() {
      return this.panel.$element.outerHeight(true);
    };
    NewNominationDialog.prototype.getActionProcess = function(action) {
      if (action === "save") {
        return new OO.ui.Process(async function() {
          let response = await saveNewNomination();
          if (!response) {
            this.close();
          }
        }, this);
      } else if (action === "add") {
        return new OO.ui.Process(function() {
          let newFieldset = generateNominationFieldset();
          this.content.addItems([newFieldset]);
          this.updateSize();
        }, this);
      } else if (action === "minus") {
        return new OO.ui.Process(function() {
          if (this.content.items.length <= 2) {
            mw.notify(state_default.convByVar({
              hant: "至少需要一個提名！",
              hans: "至少需要一个提名！"
            }), {
              type: "error",
              title: state_default.convByVar({
                hant: "錯誤",
                hans: "错误"
              })
            });
            return;
          }
          this.content.removeItems([this.content.items[this.content.items.length - 1]]);
          state_default.nominations.pop();
          this.updateSize();
        }, this);
      } else if (action === "cancel") {
        return new OO.ui.Process(function() {
          this.close();
        }, this);
      }
      return NewNominationDialog.super.prototype.getActionProcess.call(this, action);
    };
    NewNominationDialog.prototype.getTearnDownProcess = function(data) {
      return NewNominationDialog.super.prototype.getTearnDownProcess.call(this, data);
    };
  }
  function showNewNominationDialog() {
    state_default.nominations.length = 0;
    newNominationDialog = new NewNominationDialog({
      size: "large",
      padded: true,
      scrollable: true
    });
    windowManager.addWindows([newNominationDialog]);
    windowManager.openWindow(newNominationDialog);
  }
  function EditNominationDialog(config) {
    EditNominationDialog.super.call(this, config);
  }
  function initEditNominationDialog() {
    OO.inheritClass(EditNominationDialog, OO.ui.ProcessDialog);
    EditNominationDialog.static.name = "EditNominationDialog";
    EditNominationDialog.static.title = state_default.convByVar({
      hant: "編輯提名（維基ACG專題獎小工具）",
      hans: "编辑提名（维基ACG专题奖小工具）"
    });
    EditNominationDialog.static.actions = [
      {
        action: "save",
        label: state_default.convByVar({
          hant: "儲存",
          hans: "储存"
        }),
        flags: [
          "primary",
          "progressive"
        ]
      },
      {
        action: "cancel",
        label: state_default.convByVar({
          hant: "取消",
          hans: "取消"
        }),
        flags: "safe"
      }
    ];
    EditNominationDialog.prototype.initialize = function() {
      EditNominationDialog.super.prototype.initialize.call(this);
      this.panel = new OO.ui.PanelLayout({
        padded: true,
        expanded: false
      });
      this.panel.$element.append(editNominationDialogContent.$element);
      this.$body.append(this.panel.$element);
    };
    EditNominationDialog.prototype.onMessageInputResize = function() {
      this.updateSize();
    };
    EditNominationDialog.prototype.getBodyHeight = function() {
      return this.panel.$element.outerHeight(true);
    };
    EditNominationDialog.prototype.getActionProcess = function(action) {
      if (action === "save") {
        return new OO.ui.Process(async function() {
          let response = await saveModifiedNomination();
          if (!response) {
            this.close();
          }
        }, this);
      } else if (action === "cancel") {
        return new OO.ui.Process(function() {
          this.close();
        }, this);
      }
      return EditNominationDialog.super.prototype.getActionProcess.call(this, action);
    };
    EditNominationDialog.prototype.getTearnDownProcess = function(data) {
      return EditNominationDialog.super.prototype.getTearnDownProcess.call(this, data);
    };
  }
  function showEditNominationDialog(nomData) {
    editNominationDialogContent.clearItems();
    state_default.nominations.length = 0;
    editNominationDialog = new EditNominationDialog({
      size: "large",
      padded: true,
      scrollable: true
    });
    editNominationDialogContent.addItems([generateNominationFieldset(nomData)]);
    windowManager.addWindows([editNominationDialog]);
    windowManager.openWindow(editNominationDialog);
  }
  function CheckNominationDialog(config) {
    CheckNominationDialog.super.call(this, config);
  }
  function initCheckNominationDialog() {
    OO.inheritClass(CheckNominationDialog, OO.ui.ProcessDialog);
    CheckNominationDialog.static.name = "CheckNominationDialog";
    CheckNominationDialog.static.title = state_default.convByVar({
      hant: "核對分數（維基ACG專題獎小工具）",
      hans: "核对分数（维基ACG专题奖小工具）"
    });
    CheckNominationDialog.static.actions = [
      {
        action: "save",
        label: state_default.convByVar({
          hant: "儲存",
          hans: "储存"
        }),
        flags: [
          "primary",
          "progressive"
        ]
      },
      {
        action: "cancel",
        label: state_default.convByVar({
          hant: "取消",
          hans: "取消"
        }),
        flags: "safe"
      }
    ];
    CheckNominationDialog.prototype.initialize = function() {
      CheckNominationDialog.super.prototype.initialize.call(this);
      this._header = this.$body.find(".oo-ui-processDialog-title");
      this.panel = new OO.ui.PanelLayout({
        padded: true,
        expanded: false
      });
      this.panel.$element.append(checkNominationDialogContent.$element);
      this.$body.append(this.panel.$element);
    };
    CheckNominationDialog.prototype.getSetupProcess = function(data) {
      return CheckNominationDialog.super.prototype.getSetupProcess.call(this, data).next(function() {
        if (data.title) {
          this._header.innerText = data.title;
        }
      }, this);
    };
    CheckNominationDialog.prototype.onMessageInputResize = function() {
      this.updateSize();
    };
    CheckNominationDialog.prototype.getBodyHeight = function() {
      return this.panel.$element.outerHeight(true);
    };
    CheckNominationDialog.prototype.getActionProcess = function(action) {
      if (action === "save") {
        return new OO.ui.Process(async function() {
          let response = await saveNominationCheck();
          if (!response) {
            this.close();
          }
        }, this);
      } else if (action === "cancel") {
        return new OO.ui.Process(function() {
          this.close();
        }, this);
      }
      return CheckNominationDialog.super.prototype.getActionProcess.call(this, action);
    };
    CheckNominationDialog.prototype.getTearnDownProcess = function(data) {
      return CheckNominationDialog.super.prototype.getTearnDownProcess.call(this, data);
    };
    mw.util.addCSS(".checklist-field .oo-ui-fieldLayout-field { width: 80% !important; }");
  }
  async function showCheckNominationDialog(nomData, multiCheckStatus) {
    checkNominationDialogContent.clearItems();
    state_default.nominations.length = 0;
    checkNominationDialog = new CheckNominationDialog({
      size: "large",
      padded: true,
      scrollable: true
    });
    const field = await generateChecklistFieldset(nomData);
    checkNominationDialogContent.addItems([field]);
    windowManager.addWindows([checkNominationDialog]);
    const instance = windowManager.openWindow(checkNominationDialog, multiCheckStatus ? {
      title: state_default.convByVar({
        hant: "核對分數，" + multiCheckStatus + "（維基ACG專題獎小工具）",
        hans: "核对分数，" + multiCheckStatus + "（维基ACG专题奖小工具）"
      })
    } : void 0);
    await instance.closed;
  }

  // src/main.js
  function init() {
    const pageName = mw.config.get("wgPageName");
    if (pageName !== "WikiProject:ACG/維基ACG專題獎" && pageName !== "WikiProject:ACG/維基ACG專題獎/登記處") return;
    mw.loader.using("ext.gadget.HanAssist").then((require2) => {
      const { convByVar } = require2("ext.gadget.HanAssist");
      state_default.init(convByVar);
      initOOUI();
      addEditButtonsToPage();
    });
  }
  init();
})();
// </nowiki>
