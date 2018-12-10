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
// // TypeScript file
var LevelIcon = (function (_super) {
    __extends(LevelIcon, _super);
    function LevelIcon() {
        var _this = _super.call(this) || this;
        _this.lb_level_str = "";
        _this.skinName = "src/Game/LevelIconSkin.exml";
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.complete, _this);
        return _this;
    }
    LevelIcon.prototype.complete = function () {
        // console.log(this.lb_level_str)
        this.lb_level.text = this.lb_level_str;
        this.enabled = this.lb_state;
    };
    LevelIcon.prototype.setState = function (value) {
        this.lb_state = value;
        if (this.lb_level) {
            this.enabled = value;
        }
    };
    Object.defineProperty(LevelIcon.prototype, "Level", {
        get: function () {
            return parseInt(this.lb_level_str);
        },
        set: function (value) {
            this.lb_level_str = value.toString();
            if (this.lb_level) {
                this.complete();
            }
        },
        enumerable: true,
        configurable: true
    });
    return LevelIcon;
}(eui.Button));
__reflect(LevelIcon.prototype, "LevelIcon");
