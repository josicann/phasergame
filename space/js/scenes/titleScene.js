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
       // grid.showNumbers();
        this.background = this.add.image(0, 0, 'background');
        this.background.setOrigin(0.5,0.5);
        this.title = this.add.image(0,0, 'title');
        this.ship = this.add.image(0,0, 'ship');
        grid.placeAtIndex(60, this.ship);
        Align.scaleToGameW(this.ship, 0.125)
        this.ship.angle = -90;

        Align.scaleToGameW(this.title, 0.8);
        grid.placeAtIndex(38, this.title);

        Align.scaleToGameW(this.title, 0.8);

        var startBtn = new FlatButton({scene:this, key:'button', text:'start', event: 'start_game'});
        var sb = new SoundButtons({scene:this});

        grid.placeAtIndex(93, startBtn);
        //Align.scaleToGameW(startBtn, 0.2);
        emitter.on('start_game',this.startGame, this);
        console.log("SceneTitle");
       // this.scene.start('SceneMain');
    }

    startGame() {
        this.scene.start('SceneMain');
    }
    update() {}
}