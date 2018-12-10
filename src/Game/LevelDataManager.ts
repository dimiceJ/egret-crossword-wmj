// TypeScript file
class LevelDataItem {
    public answer: string;
    public img: string;
    public word: string;
    public tip: string;
    public content: string;
}

class LevelDataManager {
    // 单例
    private static shared: LevelDataManager
    public static Shared() {
        if (LevelDataManager.shared == null) {
            LevelDataManager.shared = new LevelDataManager
        }
        return LevelDataManager.shared
    }

    // 一个关卡的保存数据组
    private items: LevelDataItem[] = [];

    public constructor() {
        this.items = RES.getRes('questions_json');
        
    }

    public GetLevel(level: number): LevelDataItem {
        if (level < 0) level = 0;
        if (level >= this.items.length) level = this.items.length - 1
        return this.items[level]
    }

    public get Milestone(): number {
        var milestone = egret.localStorage.getItem('CYDTZ_Milestone')

        if (milestone == '' || milestone == null) {
            milestone = '1'
        }

        return parseInt(milestone)
    }

    public set Milestone(value: number) {
        egret.localStorage.setItem('CYDTZ_Milestone',value.toString())
    }

}