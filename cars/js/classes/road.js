class Road extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene);
        this.scene = config.scene;
        this.back = this.scene.add.image(0,0,'road');
        this.add(this.back);
        this.scene.add.existing(this);

        Align.scaleToGameW(this.back, 0.5);

        this.setSize(this.back.displayWidth, game.config.height);

        this.lineGroup = this.scene.add.group();
        this.count = 0;

        this.car = this.scene.add.sprite(this.displayWidth/4, game.config.height*0.9, 'cars');
        Align.scaleToGameW(this.car, 0.10);
        this.add(this.car);
        
        this.back.setInteractive();
        this.back.on('pointerdown', this.changeLanes, this);
        this.addObject();
        //console.log(this);
    }

    addObject() {

        var objects = [{key:'pcar1', speed: 10, scale: 10}, {key: 'pcar2', speed: 10, scale: 10},{key: 'barrier', speed: 20, scale: 8}, {key:'cone',speed: 20, scale: 5}];
        var index = Math.floor(Math.random()*4);
        var key = objects[index].key;
        var speed = objects[index].speed;
        var scale = objects[index].scale/100;
        

        this.lane = Math.random()*100;
        if(this.lane >= 50) {
            this.object = this.scene.add.sprite(-this.displayWidth/4, 0, key);
        }else {
            this.object = this.scene.add.sprite(this.displayWidth/4, 0, key);
        }
        
        this.object.speed = speed;

        Align.scaleToGameW(this.object, scale);
        this.add(this.object);
    }
    changeLanes() {
        if(model.gameOver) {
            return;
        }
        emitter.emit(G.PLAY_SOUND, 'whoosh');
        this.car.x = -this.car.x;
    }
    makeLines() {
        this.vSpace=this.displayHeight/10;

        for ( var i = 0; i < 20; i++) {
            var line = this.scene.add.image(this.x, this.vSpace*i, 'line');
            line.oy = line.y;
            this.lineGroup.add(line);
        }
    }

    moveLines() {
        if(model.gameOver) {
            return;
        }
        this.lineGroup.children.iterate(function(child) {
            child.y+=this.vSpace/20;
        }.bind(this));

        this.count ++;
        if(this.count === 20){

            this.count = 0;
            this.lineGroup.children.iterate(function(child) {
                child.y=child.oy;
            }.bind(this));

        }
    }

    goSceneOver(){
        this.scene.start('SceneOver');
    }
    moveObjects() {
        if(model.gameOver) {
            return;
        }
        
        this.object.y+= this.vSpace/this.object.speed;

        if(Collision.checkCollide(this.car, this.object)){
            model.gameOver = true;
            emitter.emit(G.PLAY_SOUND, 'boom');
           // this.car.alpha = 0.5;
           this.scene.tweens.add({targets:this.car, duration: 1000, y:game.config.height, angle: -270});
           this.scene.time.addEvent({ delay: 2000, callback: this.goSceneOver, callbackScope: this.scene, loop: false });
        }else {
           // this.car.alpha = 1;
        }

        if(this.object.y > game.config.height) {
            this.object.destroy();
            this.addObject();
        }
    }
}