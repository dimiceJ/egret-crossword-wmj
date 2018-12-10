class Word extends eui.Component {
    protected lb_text: eui.Label
    public constructor() {
        super()
        this.skinName = 'src/Game/WordSkin.exml'
        this.addEventListener(eui.UIEvent.COMPLETE, this.complete, this)
    }

    private complete() {
        this.lb_text.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_tap,this)
    }

    public setWordText(value: string) {
        this.lb_text.text = value;
    }
    public getWordText(): string {
        return this.lb_text.text;
    }

    protected onclick_tap() {
        SceneGame.Shared().onclick_word(this);
    }
}

class AnswerWord extends Word {
    public SelectWord: Word = null
    public constructor() {
        super()
    }

    protected onclick_tap() {
        if (this.SelectWord != null) {
            this.SelectWord.visible = true
            this.SelectWord = null
            this.setWordText("");
        }
    }

    public SetSelectWord(word: Word) {

        if (word) {
            this.setWordText(word.getWordText())
            word.visible = false
        } else {
            this.setWordText('')
        }
        this.SelectWord = word
    }

}