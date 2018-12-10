// // TypeScript file
class LevelIcon extends eui.Button {
    private lb_level: eui.Label;
    private lb_level_str: any = "";
    private lb_state:boolean

    public constructor() {
        super();
        this.skinName = "src/Game/LevelIconSkin.exml";
         this.addEventListener(eui.UIEvent.COMPLETE, this.complete, this)
    }
    public complete() {
        // console.log(this.lb_level_str)
        this.lb_level.text = this.lb_level_str;
        this.enabled = this.lb_state
    }

    public setState(value:boolean){
        this.lb_state = value;
        if(this.lb_level){
            this.enabled = value
        }
    }


    public get Level():number {
        return parseInt(this.lb_level_str) ;
    }
    public set Level(value: number) {
        this.lb_level_str = value.toString();
        if(this.lb_level){
             this.complete()
        }
    }

}

