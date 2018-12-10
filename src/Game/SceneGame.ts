class SceneGame extends eui.Component {
    private group_answer: eui.Group
    private group_words: eui.Group
    private img_question: eui.Image
    private btn_back: eui.Button
    private levelIndex: number

    private group_win: eui.Group
    private btn_next: eui.Button
    private lb_explain: eui.Label
    private lb_from: eui.Label


    // 单例
    public static shared: SceneGame
    public static Shared() {
        if (SceneGame.shared == null) {
            SceneGame.shared = new SceneGame()
        }
        return SceneGame.shared
    }
    // constructor
    public constructor() {
        super()
        this.skinName = 'src/Game/SceneGameSkin.exml'
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backFn, this)
        this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_next, this)
    }



    public backFn() {
        this.parent.addChild(Levels.Shared())
        this.parent.removeChild(this)

    }
    //初始化关卡
    public InitLevel(level: number) {
        this.levelIndex = level
        console.log(typeof this.levelIndex)
        var levelData = LevelDataManager.Shared().GetLevel(level);
        var words = levelData.answer + levelData.word


        while (words.length == 10) {
            var i = Math.floor(Math.random() * 400);      /*400道题目随机选取*/
            if (i != level) {                               /*选择的题目和本题不一样的话就添加*/
                var temp = LevelDataManager.Shared().GetLevel(i);
                words += temp.word + temp.answer;
            }
        }

        var wordList: string[] = []
        for (var i = 0; i < words.length; i++) {
            wordList.push(words.charAt(i))
        }
        wordList = this.randomlist(wordList)


        for (var i = 0; i < this.group_words.numChildren; i++) {
            var wordrect = <Word>this.group_words.getChildAt(i)
            wordrect.setWordText(wordList[i]);
            wordrect.visible = true;
        }

        for (var i = 0; i < this.group_answer.numChildren; i++) {
            var answerrect = <AnswerWord>this.group_answer.getChildAt(i)
            answerrect.setWordText(null)
            answerrect.visible = true;
            answerrect.SetSelectWord(null)
        }

        this.img_question.source = 'resource/assets/' + levelData.img
    }

    //将一个数列随机
    private randomlist(arr: any[]): any[] {
        var array = [];
        while (arr.length > 0) {
            var i = Math.floor(Math.random() * arr.length);
            array.push(arr[i]);
            arr.splice(i, 1);
        }
        return array;
    }

    public onclick_word(word: Word) {
        var sel: AnswerWord = null;
        for (var i = 0; i < this.group_answer.numChildren; i++) {
            let answer = <AnswerWord>this.group_answer.getChildAt(i)

            if (answer.SelectWord == null) {
                sel = answer
                sel.SetSelectWord(word);
                break
            }
        }

        //当有一个合适的位置的时候就会将字填充，并判断是否胜利
        if (sel != null) {
            sel.SetSelectWord(word);
            //判断是否胜利
            var check_str: string = "";
            for (var i = 0; i < this.group_answer.numChildren; i++) {
                let answer = <AnswerWord>this.group_answer.getChildAt(i);
                check_str += answer.getWordText();
            }
            if (check_str == LevelDataManager.Shared().GetLevel(this.levelIndex).answer) {
                //胜利
                SoundMenager.Shared().PlayRight()

                this.show_win()
            } else {
                if (check_str.length == 4) {
                    SoundMenager.Shared().PlayWrong()
                }
            }
        }
    }

    private onclick_next() {
        this.group_win.visible = false;
        console.log(typeof this.levelIndex)
        Levels.Shared().openLevel(this.levelIndex + 1)
        this.InitLevel(this.levelIndex + 1)
    }

    private show_win() {
        this.group_win.visible = true;
        var leveldata = LevelDataManager.Shared().GetLevel(this.levelIndex)
        this.lb_from.text = leveldata.tip
        this.lb_explain.text = leveldata.content
    }
}