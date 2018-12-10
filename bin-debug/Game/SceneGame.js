var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SceneGame = (function (_super) {
    __extends(SceneGame, _super);
    // constructor
    function SceneGame() {
        var _this = _super.call(this) || this;
        _this.skinName = 'src/Game/SceneGameSkin.exml';
        _this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.backFn, _this);
        _this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_next, _this);
        return _this;
    }
    SceneGame.Shared = function () {
        if (SceneGame.shared == null) {
            SceneGame.shared = new SceneGame();
        }
        return SceneGame.shared;
    };
    SceneGame.prototype.backFn = function () {
        this.parent.addChild(Levels.Shared());
        this.parent.removeChild(this);
    };
    //初始化关卡
    SceneGame.prototype.InitLevel = function (level) {
        this.levelIndex = level;
        console.log(typeof this.levelIndex);
        var levelData = LevelDataManager.Shared().GetLevel(level);
        var words = levelData.answer + levelData.word;
        while (words.length == 10) {
            var i = Math.floor(Math.random() * 400); /*400道题目随机选取*/
            if (i != level) {
                var temp = LevelDataManager.Shared().GetLevel(i);
                words += temp.word + temp.answer;
            }
        }
        var wordList = [];
        for (var i = 0; i < words.length; i++) {
            wordList.push(words.charAt(i));
        }
        wordList = this.randomlist(wordList);
        for (var i = 0; i < this.group_words.numChildren; i++) {
            var wordrect = this.group_words.getChildAt(i);
            wordrect.setWordText(wordList[i]);
            wordrect.visible = true;
        }
        for (var i = 0; i < this.group_answer.numChildren; i++) {
            var answerrect = this.group_answer.getChildAt(i);
            answerrect.setWordText(null);
            answerrect.visible = true;
            answerrect.SetSelectWord(null);
        }
        this.img_question.source = 'resource/assets/' + levelData.img;
    };
    //将一个数列随机
    SceneGame.prototype.randomlist = function (arr) {
        var array = [];
        while (arr.length > 0) {
            var i = Math.floor(Math.random() * arr.length);
            array.push(arr[i]);
            arr.splice(i, 1);
        }
        return array;
    };
    SceneGame.prototype.onclick_word = function (word) {
        var sel = null;
        for (var i = 0; i < this.group_answer.numChildren; i++) {
            var answer = this.group_answer.getChildAt(i);
            if (answer.SelectWord == null) {
                sel = answer;
                sel.SetSelectWord(word);
                break;
            }
        }
        //当有一个合适的位置的时候就会将字填充，并判断是否胜利
        if (sel != null) {
            sel.SetSelectWord(word);
            //判断是否胜利
            var check_str = "";
            for (var i = 0; i < this.group_answer.numChildren; i++) {
                var answer = this.group_answer.getChildAt(i);
                check_str += answer.getWordText();
            }
            if (check_str == LevelDataManager.Shared().GetLevel(this.levelIndex).answer) {
                //胜利
                SoundMenager.Shared().PlayRight();
                this.show_win();
            }
            else {
                if (check_str.length == 4) {
                    SoundMenager.Shared().PlayWrong();
                }
            }
        }
    };
    SceneGame.prototype.onclick_next = function () {
        this.group_win.visible = false;
        console.log(typeof this.levelIndex);
        Levels.Shared().openLevel(this.levelIndex + 1);
        this.InitLevel(this.levelIndex + 1);
    };
    SceneGame.prototype.show_win = function () {
        this.group_win.visible = true;
        var leveldata = LevelDataManager.Shared().GetLevel(this.levelIndex);
        this.lb_from.text = leveldata.tip;
        this.lb_explain.text = leveldata.content;
    };
    return SceneGame;
}(eui.Component));
__reflect(SceneGame.prototype, "SceneGame");
