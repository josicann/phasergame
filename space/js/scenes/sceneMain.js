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
        
        var mediaManager = new MediaManager({scene:this});

        mediaManager.setBackgroundMusic('background')
        model.playerWon = true;
        this.shields=100;
        this.eshields=100;
        this.centerX = game.config.width/2;
        this.centerY = game.config.height/2;

        this.background = this.add.image(0, 0, 'background');
        this.background.setOrigin(0,0);
        this.ship = this.physics.add.sprite(this.centerX, this.centerY, 'ship');
        this.ship.body.collideWorldBounds = true;

        Align.scaleToGameW(this.ship, 0.125);
        this.eship = this.physics.add.sprite(this.centerX, 50, 'eship');
        this.eship.body.collideWorldBounds = true;
        Align.scaleToGameW(this.eship, 0.25);
        this.background.setInteractive();

        this.background.scaleX = this.ship.scaleX;
        this.background.scaleY = this.ship.scaleY;
        this.physics.world.setBounds(0,0, this.background.displayWidth, this.background.displayHeight);


        this.bullets = this.physics.add.group();
        this.ebullets = this.physics.add.group();
        this.rocks = this.physics.add.group();
        this.makeRocks();



        this.background.on('pointerup', this.moveShip, this);
        this.background.on('pointerdown', this.onDown, this);
        this.cameras.main.setBounds(0, 0, this.background.displayWidth, this.background.displayHeight);
        this.cameras.main.startFollow(this.ship, true);


        // var frameNames = this.anims.generateFrameNumbers('explosion');
        // var f2 = frameNames.slice().reverse().concat(frameNames);
        // this.anims.create({
        //     key: 'boom',
        //     frames: f2,
        //     frameRate: 48,
        //     repeat: false
        // });

        this.makeInfo();
        this.setColliders();

    }

    makeRocks(){
        if(this.rocks.getChildren().length === 0) {
            this.rocks= this.physics.add.group({
                key: 'rocks',
                frame: [0,1,2],
                frameQuantity: 4,
                bounceX: 1,
                bounceY: 1,
                angularVelocity: 1,
                collideWorldBounds: true
            });
            this.rocks.children.iterate(function(child){
                var xx = Math.floor(Math.random()*this.background.displayWidth);
                var yy = Math.floor(Math.random()*this.background.displayHeight);
    
                var vx = Math.floor(Math.random()*2) - 1;
                var vy = Math.floor(Math.random()*2) - 1;
    
                if(vx === 0 && vy === 0){
                    vx = 1;
                    vy = 1;
                }
    
                var speed = Math.floor(Math.random()*200) + 10;
                child.setVelocity(vx*speed, vy*speed);
    
    
    
                Align.scaleToGameW(child, 0.1)
                child.x = xx;
                child.y= yy;
            }.bind(this));

            this.setRockColliders();

        }
        var sb = new SoundButtons({scene:this});

    }

    downPlayer() {
        this.shields--;
        this.text1.setText('Score\n'+this.shields);
        if(this.shields === 0){
            model.playerWon = false;
            this.scene.start('SceneOver');
        }
    }

    downEnemy() {
        this.eshields--;
        this.text2.setText('Score\n'+this.eshields);
        if(this.eshields === 0){
            model.playerWon = true;
            this.scene.start('SceneOver');
        }
    }

    setColliders(){
        this.physics.add.collider(this.bullets, this.eship, this.damageEShip, null, this);
        this.physics.add.collider(this.ebullets, this.ship, this.damageShip, null, this);
  
    }

    setRockColliders() {
        this.physics.add.collider(this.rocks);
        this.physics.add.collider(this.bullets, this.rocks, this.destroyRock, null, this);
        this.physics.add.collider(this.ebullets, this.rocks, this.destroyRock, null, this);
        this.physics.add.collider(this.rocks, this.ship, this.rockHitShip, null, this);
        this.physics.add.collider(this.rocks, this.eship, this.rockHitEship, null, this);
    }
    rockHitEship(ship,rock){
        var explosion = this.add.sprite(rock.x, rock.y, 'explosion');
        explosion.play('boom');
        emitter.emit(G.PLAY_SOUND, 'explosion');
        rock.destroy();
        this.downEnemy();
        this.makeRocks();

    }

    rockHitShip(ship,rock){
        var explosion = this.add.sprite(rock.x, rock.y, 'explosion');
        explosion.play('boom');
        emitter.emit(G.PLAY_SOUND, 'explosion');

        rock.destroy();
        this.downPlayer();
        this.makeRocks();
    }
    damageShip(ship,bullet){
        var explosion = this.add.sprite(ship.x, ship.y, 'explosion');
        explosion.play('boom');
        emitter.emit(G.PLAY_SOUND, 'explosion');

        bullet.destroy();
        this.downPlayer();
    }
    damageEShip(ship, bullet){
        var explosion = this.add.sprite(bullet.x, bullet.y, 'explosions');
        explosion.play('boom');
        emitter.emit(G.PLAY_SOUND, 'explosion');

        bullet.destroy();
        this.downEnemy();

        var angle2 = this.physics.moveTo(this.eship, this.ship.x, this.ship.y,100);
        angle2 = this.toDegrees(angle2);
        this.eship.angle = angle2;
    }
    destroyRock(rock, bullet) {
        var explosion = this.add.sprite(rock.x, rock.y, 'explosion');
        explosion.play('boom');
        emitter.emit(G.PLAY_SOUND, 'explosion');

        bullet.destroy();
        rock.destroy();
        this.makeRocks();

    }
    moveShip() {
        var elapsed = Math.abs(this.downTime - this.getTimer());
        //console.log(this.downTime)
        if(elapsed < 300) {
            //move player ship
            var tx = this.background.input.localX*this.background.scaleX;
            var ty = this.background.input.localY*this.background.scaleY;
            this.tx = tx;
            this.ty= ty;
            //console.log(this.toDegrees(Phaser.Math.Angle.Between(this.ship.x, this.ship.y, tx, ty)));
            var angle = this.physics.moveTo(this.ship, tx, ty,100);
            angle = this.toDegrees(angle);
            this.ship.angle = angle;
            //
            //
            var distX2 = Math.abs(this.ship.x - tx);
            var distY2= Math.abs(this.ship.y - ty);
            // move enemy ship towards player
    
            if(distX2 > 30 && distY2 > 30) {
                var angle2 = this.physics.moveTo(this.eship, this.ship.x, this.ship.y,60);
                angle2 = this.toDegrees(angle2);
                this.eship.angle = angle2;
            }
        }else{

            //fire player bullet
            this.makeBullet();
        }



    }
    getDirFromAngle(angle){
        var rads=angle*Math.PI/180;
        var tx = Math.cos(rads);
        var ty = Math.sin(rads);
        return {tx,ty}
    }

    makeBullet(){
        emitter.emit(G.PLAY_SOUND, 'laser');
        var dirObj = this.getDirFromAngle(this.ship.angle);
        var bullet = this.physics.add.sprite(this.ship.x + dirObj.tx*30 , this.ship.y + dirObj.ty*30, 'bullet');
        bullet.angle = this.ship.angle;
        this.bullets.add(bullet);
        bullet.body.setVelocity(dirObj.tx*200, dirObj.ty*200);

    }
    makeInfo() {
        this.text1 = this.add.text(0,0,"Shields\n"+this.shields, {fontSize: game.config.width/30, align:"center", backgroundColor: '#000000'});
        this.text2 = this.add.text(0,0,"Enemy Shields\n"+this.eshields, {fontSize: game.config.width/30, align:"center", backgroundColor: '#000000'});

        this.text1.setOrigin(0.5,0.5);
        this.text2.setOrigin(0.5,0.5);

        this.uiGrid = new AlignGrid({scene:this,rows:11,cols:11});
       // this.uiGrid.showNumbers();
        this.uiGrid.placeAtIndex(9, this.text2);
        this.uiGrid.placeAtIndex(2, this.text1);

        this.icon1 = this.add.image(0,0, 'ship');
        this.icon2 = this.add.image(0,0, 'eship');
        Align.scaleToGameW(this.icon1, 0.05);
        Align.scaleToGameW(this.icon2, 0.05);
        this.icon1.angle=-90;
        this.icon2.angle=-90;

        this.uiGrid.placeAtIndex(1, this.icon1);
        this.uiGrid.placeAtIndex(7, this.icon2);
        
        this.text1.setScrollFactor(0);
        this.text2.setScrollFactor(0);

        this.icon1.setScrollFactor(0);
        this.icon2.setScrollFactor(0);


    }

    fireEBullet() {
        

        var elapsed = Math.abs(this.lastEbullet - this.getTimer());
        if(elapsed < 500) {
            return;
        }
        this.lastEbullet = this.getTimer();
        var ebullet = this.physics.add.sprite(this.eship.x , this.eship.y, 'ebullet');
        this.ebullets.add(ebullet);
        ebullet.body.setAngularVelocity(30);
        this.physics.moveTo(ebullet, this.ship.x,this.ship.y, 100);
        emitter.emit(G.PLAY_SOUND, 'enemyShoot');
    }
    toDegrees(angle) {
        return angle*(180/Math.PI);
    }

    getTimer(){
        var d = new Date();
        return d.getTime();
    }
    onDown(){
        this.downTime = this.getTimer();
    }
    update() {
        //distance from pointer down
        var distX = Math.abs(this.tx - this.ship.x);
        var distY = Math.abs(this.ty - this.ship.y);

        if(distX < 10 && distY < 10) {
            this.ship.setVelocity(0,0);
        }
        
        //distance from enemy ship
        var distX2 = Math.abs(this.eship.x - this.ship.x);
        var distY2= Math.abs(this.eship.y - this.ship.y);

        if(distX2 < game.config.width/5 && distY2 < game.config.height/5) {
            this.fireEBullet();
        }


    }
}