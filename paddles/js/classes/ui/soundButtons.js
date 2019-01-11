class SoundButtons {
    constructor(config){
        
        this.scene = config.scene;

        this.musicButton = new ToggleButton({scene:this.scene, backKey:'toggle1', onIcon: 'musicOn', offIcon: "musicOff", event: G.TOGGLE_MUSIC});
        this.sfxButton = new ToggleButton({scene:this.scene, backKey:'toggle1', onIcon: 'sfxOn', offIcon: "sfxOff", event: G.TOGGLE_SOUND});
    
        this.musicButton.y=this.musicButton.height/2;
        this.musicButton.x=this.musicButton.width/2;

        this.sfxButton.x=game.config.width-this.sfxButton.width/2;
        this.sfxButton.y=this.musicButton.y;

        if(!model.musicOn) {
            this.musicButton.toggle();
        }

        if(!model.soundOn){
            this.sfxButton.toggle();
        }
        this.musicButton.visible = false;
    }
}