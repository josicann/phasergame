class SceneTitle extends Phaser.Scene {
    constructor() {
        super('SceneTitle');
    }
    preload()
    {

    }
    create() {

        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller(); 
        var grid = new AlignGrid({rows:11, cols: 11, scene:this});
        grid.showNumbers();

        this.backGroundImgage = this.add.image(game.config.width/2, game.config.height/2, 'background');
        this.title = this.add.image(0,0, 'title');

        Align.scaleToGameW(this.title, 0.8);
        grid.placeAtIndex(38, this.title);

        Align.scaleToGameW(this.title, 0.8);

        var startBtn = new FlatButton({scene:this, key:'button', text:'start', event: 'start_game'});

        grid.placeAtIndex(93, startBtn);
        //Align.scaleToGameW(startBtn, 0.2);
        emitter.on('start_game',this.startGame, this);
        mediaManager = new MediaManager({scene:this});        
        mediaManager.setBackgroundMusic('backgroundMusic');
    }

    startGame() {
        this.scene.start('SceneMain');
    }
    update() {}
}