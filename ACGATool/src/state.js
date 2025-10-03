const state = {
    convByVar: (langDict) => "繁簡轉換未初始化！",  // 簡繁轉換
    queried: null,  // 查詢到的提名
    nominations: [],  // 提名
    multiNomCheckOngoing: false,  // 多選核對進度狀態
    multiNomCheckChanged: false,  // 多選核對是否有變更

    init(convByVar) {
        this.convByVar = convByVar;
    }
};

export default state;