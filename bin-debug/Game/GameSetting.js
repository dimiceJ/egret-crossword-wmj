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
var GameSetting = (function (_super) {
    __extends(GameSetting, _super);
    function GameSetting() {
        var _this = _super.call(this) || this;
        _this.skinName = 'src/Game/GameSettingSkin.exml';
        _this.btn_agree.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.click_agree, _this);
        _this.btn_sound.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.click_sound, _this);
        _this.btn_music.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.click_music, _this);
        //通过声音管理类来处理界面显示
        _this.update_buttonstate();
        return _this;
    }
    GameSetting.Shared = function () {
        if (GameSetting.shared == null) {
            GameSetting.shared = new GameSetting();
        }
        return GameSetting.shared;
    };
    GameSetting.prototype.click_agree = function () {
        SoundMenager.Shared().PlayClick();
        this.parent.removeChild(this);
    };
    GameSetting.prototype.click_sound = function () {
        SoundMenager.Shared().PlayClick();
        SoundMenager.Shared().IsSound = !SoundMenager.Shared().IsSound;
        this.update_buttonstate();
    };
    GameSetting.prototype.click_music = function () {
        SoundMenager.Shared().PlayClick();
        SoundMenager.Shared().IsMusic = !SoundMenager.Shared().IsMusic;
        this.update_buttonstate();
    };
    GameSetting.prototype.update_buttonstate = function () {
        this.img_music_disable.visible = !SoundMenager.Shared().IsMusic;
        this.img_sound_disable.visible = !SoundMenager.Shared().IsSound;
    };
    return GameSetting;
}(eui.Component));
__reflect(GameSetting.prototype, "GameSetting");
