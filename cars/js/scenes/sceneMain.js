class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
        this.load.image('road', 'images/road.jpg');
        this.load.spritesheet('cars', 'images/cars.png',{frameWidth: 60, frameHeight: 126});
        this.load.image('pcar1', 'images/pcar1.png');
        this.load.image('pcar2', 'images/pcar2.png');
        this.load.image('barrier', 'images/barrier.png');
        this.load.image('cone', 'images/cone.png');
        this.load.image('line', 'images/line.png');
    }
    create() {
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller(); 

        this.sb = new Scorebox({scene: this});
        

        this.road = new Road({scene:this});
        this.road.x = game.config.width/2;
        this.road.makeLines();

        this.alignGrid = new AlignGrid({cols:5, rows:5, scene:this});
        this.alignGrid.showNumbers();

        this.alignGrid.placeAtIndex(4 , this.sb)
        console.log("Ready!");
    }
    update() {
        this.road.moveLines();
        this.road.moveObjects();
    }
}