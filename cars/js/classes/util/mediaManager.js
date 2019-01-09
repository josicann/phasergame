class MediaManager {
    constructor(config) {
        this.scene = config.scene;
        emitter.addListener(G.PLAY_SOUND, this.playSound, this);
        emitter.addListener(G.MUSIC_CHANGED, this.musicChanged, this);
    }
    playSound(key) {
        if(model.soundOn) {
            console.log(key);
            var sound = this.scene.sound.add(key);
            sound.play();
        }

    }

    setBackgroundMusic(key){
        if(model.musicOn) {
            this.backGround = this.scene.sound.add(key, {volume: .5, loop: true});
            this.backGround.play();            
        }
    }
    musicChanged() {
        if(this.backGround) {

            if(!model.musicOn){
                this.backGround.stop()
            }else {
                this.backGround.play();
            }

        }
    }
}