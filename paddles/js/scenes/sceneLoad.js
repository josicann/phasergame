class SceneLoad extends Phaser.Scene {
    constructor() {
        super('SceneLoad');
    }
    preload(){
        this.bar = new Bar({scene:this, x:game.config.width/2, y:game.config.height/2});
        this.progText = this.add.text(game.config.width/2, game.config.height/2,'0%',{fontSize : 30, color: '#ffffff'});
        this.progText.setOrigin(0.5,0.5);
        this.load.on('progress', this.onProgress, this)
        this.load.image('button1', 'images/ui/buttons/2/1.png');
        this.load.image('button2', 'images/ui/buttons/2/5.png');

        this.load.image('title', 'images/title.png');
        this.load.image('button', 'images/ui/buttons/2/1.png');

        // this.load.audio('cat', ['audio/meow.mp3', 'audio/meow.ogg']);
        // this.load.audio('background', ['audio/Viktor Kraus - Victory!.mp3']);

        this.load.image('toggle1', 'images/ui/toggles/2.png');
        this.load.image('musicOff', 'images/ui/icons/music_off.png');
        this.load.image('musicOn', 'images/ui/icons/music_on.png');
        this.load.image('sfxOff', 'images/ui/icons/sfx_off.png');
        this.load.image('sfxOn', 'images/ui/icons/sfx_on.png');

        this.load.spritesheet('balls', 'images/balls.png', {frameWidth: 100, frameHeight: 100});
        this.load.spritesheet('paddles', 'images/paddles.png', {frameWidth: 400, frameHeight: 50});
        this.load.image('background', 'images/bar.jpg')

        this.load.audio('flip', ['audio/flip.wav','audio/flip.wav']);
        this.load.audio('hit', ['audio/hit.wav','audio/hit.wav']);
        this.load.audio('lose', ['audio/lose.wav','audio/lose.wav']);
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