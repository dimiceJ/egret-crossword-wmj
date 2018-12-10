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
var Word = (function (_super) {
    __extends(Word, _super);
    function Word() {
        var _this = _super.call(this) || this;
        _this.skinName = 'src/Game/WordSkin.exml';
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.complete, _this);
        return _this;
    }
    Word.prototype.complete = function () {
        this.lb_text.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_tap, this);
    };
    Word.prototype.setWordText = function (value) {
        this.lb_text.text = value;
    };
    Word.prototype.getWordText = function () {
        return this.lb_text.text;
    };
    Word.prototype.onclick_tap = function () {
        SceneGame.Shared().onclick_word(this);
    };
    return Word;
}(eui.Component));
__reflect(Word.prototype, "Word");
var AnswerWord = (function (_super) {
    __extends(AnswerWord, _super);
    function AnswerWord() {
        var _this = _super.call(this) || this;
        _this.SelectWord = null;
        return _this;
    }
    AnswerWord.prototype.onclick_tap = function () {
        if (this.SelectWord != null) {
            this.SelectWord.visible = true;
            this.SelectWord = null;
            this.setWordText("");
        }
    };
    AnswerWord.prototype.SetSelectWord = function (word) {
        if (word) {
            this.setWordText(word.getWordText());
            word.visible = false;
        }
        else {
            this.setWordText('');
        }
        this.SelectWord = word;
    };
    return AnswerWord;
}(Word));
__reflect(AnswerWord.prototype, "AnswerWord");
