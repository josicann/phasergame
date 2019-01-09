class Scorebox extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene);
        this.scene = config.scene;

        this.text1 = this.scene.add.text(0,0, "SCORE: 0");
        this.text1.setOrigin(0.5, 0.5);
        this.text1.setBackgroundColor('#000000');
        this.add(this.text1);

        this.scene.add.existing(this);

        emitter.on(G.SCORE_UPDATED, this.scoreUpdated, this);
    }
    scoreUpdated() {
        //this.text1.setText("Score: "+ model.score);
        if(model.score/5 == Math.floor(model.score/5)){
            model.speed+= 0.25;
            if(model.speed > 1.5){
                model.speed = 1.5;
            }


        }
        this.text1.setText("Score: "+ model.score);


    }
}