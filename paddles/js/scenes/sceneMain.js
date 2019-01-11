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
        model.score = 0;
        var mediaManager = new MediaManager({scene:this});
        var sb = new SoundButtons({scene:this});

        this.centerX = game.config.width/2;
        this.centerY = game.config.height/2;
        this.quarterY = game.config.height/4;
        this.velocity = 100;
        this.bar = this.add.image(this.centerX, this.centerY, 'background');
        this.bar.displayWidth = game.config.width/3;
        this.pMove=game.config.height/32;

        this.ball = this.physics.add.sprite(this.centerX, this.centerY, 'balls');
        Align.scaleToGameW(this.ball, 0.05);

        this.paddle = this.physics.add.sprite(this.centerX, this.quarterY, 'paddles');
        Align.scaleToGameW(this.paddle, 0.25);
        this.pScale = this.paddle.scaleX;

        this.paddle2 = this.physics.add.sprite(this.centerX, this.quarterY*3, 'paddles');
        Align.scaleToGameW(this.paddle2, 0.25);

        this.ball.setVelocity(0, this.velocity);

        this.paddle.setImmovable();
        this.paddle2.setImmovable();

        this.physics.add.collider(this.ball, this.paddle, this.ballHit, null, this);
        this.physics.add.collider(this.ball, this.paddle2,this.ballHit, null, this);
        this.setBallColor();

        this.input.on('pointerdown', this.changePaddle, this);
        this.input.on('pointerup', this.onUp, this);

        this.scoreBox = new Scorebox({scene:this});
        var aGrid = new AlignGrid({scene:this, cols:11, rows:11});
       // aGrid.showNumbers();
        aGrid.placeAtIndex(5, this.scoreBox)
    }

    onUp(pointer){
        var diffY = Math.abs(this.downY - pointer.y);
        if(diffY > 200) {
            this.tweens.add({targets: this.paddle,duration: 1000,y:this.quarterY});
            this.tweens.add({targets: this.paddle2,duration: 1000,y:this.quarterY*3});
        }
    }

    changePaddle(pointer) {
        var paddle = (this.velocity<0)?this.paddle:this.paddle2;


        this.downY=pointer.y;
        this.tweens.add({
            targets: paddle,
            duration: 500,
            scaleX:0,
            onComplete:this.onCompleteHandler ,
            onCompleteParams:[{scope:this,paddle:paddle}]
        });
        emitter.emit(G.PLAY_SOUND, 'flip');
    }

    onCompleteHandler (tween, targets, custom)
    {
        var paddle=custom.paddle;
        paddle.scaleX=custom.scope.pScale;
        var color = (paddle.frame.name==1)?0:1;
        paddle.setFrame(color);
    }

    setBallColor(){
        var r = Math.floor(Math.random()*100);
        if(r < 50){
            this.ball.setFrame(0);
        }else{
            this.ball.setFrame(1);
        }
    }
    doOver(){
        emitter.emit(G.PLAY_SOUND, 'lose');
        this.scene.start('SceneOver');
    }
    ballHit(ball, paddle) {
        this.velocity = -this.velocity;
        this.velocity*=1.05;
        ball.setVelocity(0, this.velocity);
        var distY = Math.abs(this.paddle.y - this.paddle2.y);

        emitter.emit(G.PLAY_SOUND, 'hit');
        var points = 1;
        if(ball.frame.name == paddle.frame.name){
            if(distY < game.config.height/3){
                points = 2;
            }

            if(distY < game.config.height/4) {
                points = 3;
            }
            emitter.emit(G.UP_POINTS, points);
        }else {
            ball.setVelocity(0,0);
            this.time.addEvent({ 
                delay: 1000, 
                callback: this.doOver, 
                callbackScope: this, 
                loop: false 
            });
            return;
        }
        
        this.setBallColor();
        var targetY = 0;
        if(distY > game.config.height / 5){   
            if(paddle.y>this.centerY){
                targetY =paddle.y - this.pMove;
            }else{
                targetY = paddle.y + this.pMove;
            }
            this.tweens.add({targets: paddle,duration: 1000,y:targetY})
        }
    }
    update() {

    }
}