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
        //grid.showNumbers();

        this.title = this.add.image(0,0, 'title');

        Align.scaleToGameW(this.title, 0.8);
        grid.placeAtIndex(38, this.title);

        Align.scaleToGameW(this.title, 0.8);

        var startBtn = new FlatButton({scene:this, key:'button', text:'start', event: 'start_game'});
        this.centerX = game.config.width/2;
        this.centerY = game.config.height/2;
        this.ball = this.physics.add.sprite(this.centerX, this.centerY, 'balls');
        this.ball.setBounce(0,1);
        this.ball.setVelocity(0,100);
        this.ball.body.collideWorldBounds=true;
        Align.scaleToGameW(this.ball, 0.05);

        grid.placeAtIndex(93, startBtn);
        //Align.scaleToGameW(startBtn, 0.2);
        emitter.on('start_game',this.startGame, this);
       // this.scene.start('SceneMain');
    }

    startGame() {
        this.scene.start('SceneMain');
    }
    update() {}
}