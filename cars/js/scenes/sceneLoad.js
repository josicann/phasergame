class SceneLoad extends Phaser.Scene {
    constructor() {
        super('SceneLoad');
    }
    preload(){
        this.bar = new Bar({scene:this, x:240, y:320});
        this.progText = this.add.text(game.config.width/2, game.config.height/2,'0%',{fontSize : 30, color: '#ffffff'});
        this.progText.setOrigin(0.5,0.5);
        this.load.on('progress', this.onProgress, this)

        this.load.image('background', 'images/titleBack.jpg')
        this.load.image('title', 'images/title.png');
        this.load.image('button', 'images/ui/buttons/2/1.png');
        this.load.image('road', 'images/road.jpg');
        this.load.spritesheet('cars', 'images/cars.png',{frameWidth: 60, frameHeight: 126});
        this.load.image('pcar1', 'images/pcar1.png');
        this.load.image('pcar2', 'images/pcar2.png');
        this.load.image('barrier', 'images/barrier.png');
        this.load.image('cone', 'images/cone.png');
        this.load.image('line', 'images/line.png');

        this.load.image('toggle1', 'images/ui/toggles/1.png');
        this.load.image('musicOff', 'images/ui/icons/music_off.png');
        this.load.image('musicOn', 'images/ui/icons/music_on.png');
        this.load.image('sfxOff', 'images/ui/icons/sfx_off.png');
        this.load.image('sfxOn', 'images/ui/icons/sfx_on.png');

        this.load.audio('boom', ['audio/boom.mp3', 'audio/boom.ogg']);
        this.load.audio('backgroundMusic', ['audio/random-race.mp3', 'audio/random-race.ogg']);
        this.load.audio('whoosh', ['audio/whoosh.mp3', 'audio/whoosh.ogg']);
    }
    onProgress(val){
        this.bar.setPercent(val);
        var per = val*100;
        this.progText.setText(Math.floor(per)+"%");
    }
    create(){
        this.scene.start('SceneTitle');
    }

    update(){

    }
}