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
var Levels = (function (_super) {
    __extends(Levels, _super);
    function Levels() {
        var _this = _super.call(this) || this;
        _this.LevelIcons = [];
        _this.sel_level = 0;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.complete, _this);
        _this.skinName = "src/Game/LevelSkin.exml";
        return _this;
    }
    Levels.Shared = function () {
        if (Levels.shared == null) {
            Levels.shared = new Levels();
        }
        return Levels.shared;
    };
    Levels.prototype.back = function () {
        this.parent.addChild(SceneBegin.Shared());
        this.parent.removeChild(this);
    };
    Levels.prototype.complete = function () {
        this.level_group.scrollPolicyH = eui.ScrollPolicy.OFF;
        //创建地图选项
        var row = 10;
        var col = 20;
        var spanx = 720 / row; //计算行x间隔
        var spany = 1136 / col; //计算列y间隔
        var group = new eui.Group(); //地图背景
        group.width = 720;
        group.height = (spany * 400); //算出最大尺寸
        //填充背景
        for (var i = 0; i <= (group.height / 1138); i++) {
            var img = new eui.Image();
            img.source = RES.getRes("GameBG2_jpg");
            img.y = i * 1138;
            img.touchEnabled = false;
            this.group_levels.addChildAt(img, 0);
            // var icon = new LevelIcon();
            // console.log(icon)
        }
        //以正弦曲线绘制关卡图标的路径
        var mileStone = LevelDataManager.Shared().Milestone;
        for (var i = 0; i < 400; i++) {
            var icon = new LevelIcon();
            icon.Level = i + 1;
            icon.y = spany * i / 2;
            icon.x = Math.sin(icon.y / 180 * Math.PI) * 200 + group.width / 2;
            icon.y += spany * i / 2;
            icon.y = group.height - icon.y - spany;
            group.addChild(icon);
            icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_level, this);
            icon.setState(i < mileStone);
            this.LevelIcons.push(icon);
        }
        //开启位图缓存模式
        // group.cacheAsBitmap = true;
        this.group_levels.addChild(group);
        //卷动到最底层
        this.group_levels.scrollV = group.height - 1100;
        this.img_arrow = new eui.Image();
        this.img_arrow.source = RES.getRes('PageDownBtn_png');
        this.img_arrow.anchorOffsetX = 124 / 2 - group.getChildAt(0).width / 2;
        this.img_arrow.anchorOffsetY = 76;
        this.img_arrow.touchEnabled = false;
        this.img_arrow.x = group.getChildAt(0).x;
        this.img_arrow.y = group.getChildAt(0).y;
        group.addChild(this.img_arrow);
        this.sel_level = mileStone;
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
    };
    Levels.prototype.onclick_level = function (e) {
        var icon = e.currentTarget;
        if (this.sel_level != icon.Level) {
            this.img_arrow.x = icon.x;
            this.img_arrow.y = icon.y;
            this.sel_level = icon.Level;
        }
        else {
            this.parent.addChild(SceneGame.Shared());
            SceneGame.Shared().InitLevel(icon.Level);
            this.parent.removeChild(this);
        }
    };
    Levels.prototype.openLevel = function (level) {
        var icon = this.LevelIcons[level - 1];
        icon.enabled = true;
        if (level > LevelDataManager.Shared().Milestone) {
            LevelDataManager.Shared().Milestone = level;
            this.img_arrow.x = icon.x;
            this.img_arrow.y = icon.y;
            this.sel_level = icon.Level;
        }
    };
    return Levels;
}(eui.Component));
__reflect(Levels.prototype, "Levels");
