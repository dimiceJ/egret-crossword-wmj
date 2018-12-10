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
var SceneBegin = (function (_super) {
    __extends(SceneBegin, _super);
    function SceneBegin() {
        var _this = _super.call(this) || this;
        _this.skinName = "src/Game/SceneBeginSkin.exml";
        // this.addEventListener(eui.UIEvent.COMPLETE, this.complete, this);
        _this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclickBegin, _this);
        console.log(_this.btn_setting);
        _this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_setting, _this);
        return _this;
    }
    SceneBegin.Shared = function () {
        if (SceneBegin.shared == null) {
            SceneBegin.shared = new SceneBegin();
        }
        return SceneBegin.shared;
    };
    SceneBegin.prototype.onclickBegin = function () {
        this.parent.addChild(Levels.Shared());
        this.parent.removeChild(this);
    };
    SceneBegin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    SceneBegin.prototype.onclick_setting = function () {
        console.log('aaa');
        SoundMenager.Shared().PlayClick();
        this.addChild(GameSetting.Shared());
    };
    return SceneBegin;
}(eui.Component));
__reflect(SceneBegin.prototype, "SceneBegin");
