class SceneBegin extends eui.Component {
	public btn_begin: eui.Button;
	private group_levels: eui.Group;
	private btn_setting: eui.Button
	// 跳转
	private static shared: SceneBegin;
	public static Shared() {
		if (SceneBegin.shared == null) {
			SceneBegin.shared = new SceneBegin()
		}
		return SceneBegin.shared
	}
	private onclickBegin() {
		this.parent.addChild(Levels.Shared())
		this.parent.removeChild(this)
	}



	public constructor() {
		super()
		this.skinName = "src/Game/SceneBeginSkin.exml";
		// this.addEventListener(eui.UIEvent.COMPLETE, this.complete, this);

		this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclickBegin, this);
		console.log(this.btn_setting)
		this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_setting, this);
	}

	childrenCreated() {
		super.childrenCreated();

	}


	public onclick_setting() {
		console.log('aaa')
		SoundMenager.Shared().PlayClick();
		this.addChild(GameSetting.Shared());
	}





}


