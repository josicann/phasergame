class SceneOver extends Phaser.Scene {
    constructor() {
        super('SceneOver');
    }
    preload()
    {

    }
    create() {


        var grid = new AlignGrid({rows:11, cols: 11, scene:this});
       // grid.showNumbers();

        this.title = this.add.image(0,0, 'title');

        Align.scaleToGameW(this.title, 0.8);
        grid.placeAtIndex(16, this.title);

        Align.scaleToGameW(this.title, 0.8);

        if(model.playerWon){
            this.winner = this.add.image(0,0, 'ship');

        }else {
            this.winner = this.add.image(0,0, 'eship');

        }
        Align.scaleToGameW(this.winner, 0.25);
        this.winner.angle = -90;
        grid.placeAtIndex(60, this.winner);
        this.winner.angle = -90;

        this.winnerText = this.add.text(0,0,"WINNER", {fontSize: game.config.width/10, color:"#3FE213"})
        this.winnerText.setOrigin(0.5,0.5);
        grid.placeAtIndex(49, this.winnerText)

        var startBtn = new FlatButton({scene:this, key:'button', text:'Play Again', event: 'start_game'});

        grid.placeAtIndex(93, startBtn);
        //Align.scaleToGameW(startBtn, 0.2);
        var sb = new SoundButtons({scene:this});

        emitter.on('start_game',this.startGame, this);
        //console.log("SceneOver");
    }

    startGame() {
        this.scene.start('SceneMain');
    }
    update() {}
}