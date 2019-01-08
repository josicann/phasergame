class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {

    }
    create() {
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller(); 
        model.gameOver=false;

        this.sb = new Scorebox({scene: this});
        

        this.road = new Road({scene:this});
        this.road.x = game.config.width/2;
        this.road.makeLines();

        this.alignGrid = new AlignGrid({cols:5, rows:5, scene:this});
       // this.alignGrid.showNumbers();
        this.alignGrid.placeAtIndex(4 , this.sb);

        var soundButtons = new SoundButtons({scene:this});
        var mediaManager = new MediaManager({scene:this});
        console.log("Ready!");
    }
    update() {
        this.road.moveLines();
        this.road.moveObjects();
    }
}