class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
        this.load.image('face', 'images/face.png');
        this.load.image('button1', 'images/ui/buttons/2/1.png');
        this.load.image('button2', 'images/ui/buttons/2/5.png');
        this.load.audio('cat', ['audio/meow.mp3', 'audio/meow.ogg']);
        this.load.audio('background', ['audio/Viktor Kraus - Victory!.mp3']);

        this.load.image('toggle1', 'images/ui/toggles/1.png');
        this.load.image('musicOff', 'images/ui/icons/music_off.png');
        this.load.image('musicOn', 'images/ui/icons/music_on.png');
        this.load.image('sfxOff', 'images/ui/icons/sfx_off.png');
        this.load.image('sfxOn', 'images/ui/icons/sfx_on.png');
    }
    create() {

        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller(); 
        var mediaManager = new MediaManager({scene:this})
        mediaManager.setBackgroundMusic('background');
        var gridConfig = {rows:5, cols:5, scene:this};
        var grid = new AlignGrid(gridConfig);
        grid.showNumbers();

        var fireText = {color:'red', fontSize:20};
        var button1 = new FlatButton({scene:this, key: 'button1', text: 'Fire!', x:240,y:100, event:'button_pressed', params:'fire_lasers', textConfig:fireText});
        var button2 = new FlatButton({scene:this, key: 'button2', text: 'Destruct!',x:240, y:300, event:'button_pressed', params:'self_destruct'});
        var toggleButton = new ToggleButton({scene:this, backKey:'toggle1', onIcon: 'musicOn', offIcon: "musicOff", event: G.TOGGLE_MUSIC, x: 240, y:450});
        //this.button = this.add.sprite(0,0,'face');
        emitter.on('button_pressed', this.buttonPressed, this);
        //grid.placeAtIndex(7, this.face);

    }
    buttonPressed(params) {
        console.log(params)
        emitter.emit(G.PLAY_SOUND, 'cat')
        //model.musicOn = !model.musicOn;
        //this.scene.start('SceneOver');
    }    
    update() {}
}