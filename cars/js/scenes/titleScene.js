class SceneTitle extends Phaser.Scene {
    constructor() {
        super('SceneTitle');
    }
    preload()
    {
        this.load.image('title', 'images/title.png');
        this.load.image('button', 'images/ui/buttons/2/1.png');
    }
    create() {
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller(); 

        var grid = new AlignGrid({rows:11, cols: 11, scene:this});
        grid.showNumbers();

        this.title = this.add.image(0,0, 'title');

        Align.scaleToGameW(this.title, 0.8);
        grid.placeAtIndex(38, this.title);

        Align.scaleToGameW(this.title, 0.8);

        var startBtn = new FlatButton({scene:this, key:'button', text:'start', event: 'start_game'});

        grid.placeAtIndex(93, startBtn);
        //Align.scaleToGameW(startBtn, 0.2);
        emitter.on('start_game',this.startGame, this);
        console.log("SceneTitle");
    }

    startGame() {
        this.scene.start('SceneMain');
    }
    update() {}
}