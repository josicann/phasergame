class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {

    }
    create() {
        // emitter = new Phaser.Events.EventEmitter();
        // controller = new Controller(); 


        model.gameOver=false;
        //this.sb = new Scorebox({scene: this});
        

        this.road = new Road({scene:this});
        this.road.x = game.config.width*.25;
        this.road.makeLines();

        this.road2 = new Road({scene:this});
        this.road2.x = game.config.width*.75;
        this.road2.makeLines();

        this.alignGrid = new AlignGrid({cols:12, rows:12, scene:this});
        //this.alignGrid.showNumbers();
        let sb = new Scorebox({scene: this});
        sb.x = game.config.width/2;
        sb.y = 50;
        //this.alignGrid.placeAtIndex(6 , this.sb);

        var soundButtons = new SoundButtons({scene:this});
      // emitter.on(G.SCORE_UPDATED, this.scoreUpdated, this);
      model.score=0;
      model.speed=1;

        console.log("Ready!");
    }

    // scoreUpdated(){
    //     if(model.score/5 == Math.floor(model.score/5)){
    //         model.speed+= 0.25;
    //         if(model.speed > 1.5){
    //             model.speed = 1.5;
    //         }


    //     }
    // }
    update() {
        this.road.moveLines();
        this.road.moveObjects();

        this.road2.moveLines();
        this.road2.moveObjects();
    }
}