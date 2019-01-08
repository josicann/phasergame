class MediaManager {
    constructor(config) {
        this.scene = config.scene;
        emitter.on(G.PLAY_SOUND, this.playSound, this);

    }
    playSound(key) {
        var sound = this.scene.sound.add(key);
        sound.play();
    }
}