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

        var sb = new SoundButtons({scene:this});

        this.centerX = game.config.width/2;
        this.centerY = game.config.height/2;

        this.background = this.add.image(0, 0, 'background');
        this.background.setOrigin(0,0);
        this.ship = this.physics.add.sprite(this.centerX, this.centerY, 'ship');
        Align.scaleToGameW(this.ship, 0.125);
        this.eship = this.physics.add.sprite(this.centerX, 50, 'eship');
        Align.scaleToGameW(this.eship, 0.25);
        this.background.setInteractive();

        this.background.scaleX = this.ship.scaleX;
        this.background.scaleY = this.ship.scaleY;
        this.physics.world.setBounds(0,0, this.background.displayWidth, this.background.displayHeight);

        this.rocks= this.physics.add.group({
            key: 'rocks',
            frame: [0,1,2],
            frameQuantity: 4,
            bounceX: 1,
            bounceY: 1,
            angularVelocity: 1,
            collideWorldBounds: true
        });
        this.physics.add.collider(this.rocks)
        this.bullets = this.physics.add.group();
        this.physics.add.collider(this.bullets, this.rocks, this.destroyRock, null, this);
        
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

        this.background.on('pointerup', this.moveShip, this);
        this.background.on('pointerdown', this.onDown, this);
        this.cameras.main.setBounds(0, 0, this.background.displayWidth, this.background.displayHeight);
        this.cameras.main.startFollow(this.ship, true);


        var frameNames = this.anims.generateFrameNumbers('explosion');
        var f2 = frameNames.slice().reverse().concat(frameNames);
        this.anims.create({
            key: 'boom',
            frames: f2,
            frameRate: 48,
            repeat: false
        });

        this.makeInfo();

    }
    destroyRock(bullet, rock) {
        var explosion = this.add.sprite(rock.x, rock.y, 'explosion');
        explosion.play('boom');
        bullet.destroy();
        rock.destroy();
    }
    moveShip() {
        var elapsed = Math.abs(this.downTime - this.getTimer());
        console.log(this.downTime)
        
        this.tx = this.background.input.localX*this.background.scaleX;
        this.ty = this.background.input.localY*this.background.scaleY;
        var angle = this.physics.moveTo(this.ship, this.tx, this.ty,200);
        angle = this.toDegrees(angle);
        this.ship.angle = angle;

        if(elapsed > 300){
            this.makeBullet();
        }

        var angle2 = this.physics.moveTo(this.eship, this.ship.x, this.ship.y,60);
        angle2 = this.toDegrees(angle2);
        this.eship.angle = angle2;

    }
    getDirFromAngle(angle){
        var rads=angle*Math.PI/180;
        var tx = Math.cos(rads);
        var ty = Math.sin(rads);
        return {tx,ty}
    }

    makeBullet(){
        var dirObj = this.getDirFromAngle(this.ship.angle);
        var bullet = this.physics.add.sprite(this.ship.x + dirObj.tx*30 , this.ship.y + dirObj.ty*30, 'bullet');
        bullet.angle = this.ship.angle;
        this.bullets.add(bullet);
        bullet.body.setVelocity(dirObj.tx*200, dirObj.ty*200);

    }
    makeInfo() {
        this.text1 = this.add.text(0,0,"Shields:\n100");
        this.text2 = this.add.text(0,0,"Enemy Shields:\n100");

        this.text1.setOrigin(0.5,0.5);
        this.text2.setOrigin(0.5,0.5);

        this.uiGrid = new AlignGrid({scene:this,rows:11,cols:11});
        this.uiGrid.showNumbers();
        this.uiGrid.placeAtIndex(8, this.text2);
        this.uiGrid.placeAtIndex(2, this.text1);


    }

    fireEBullet() {
        var elapsed = Math.abs(this.lastEbullet - this.getTimer());
        if(elapsed < 500) {
            return;
        }
        this.lastEbullet = this.getTimer();
        var ebullet = this.physics.add.sprite(this.eship.x , this.eship.y, 'ebullet');
        ebullet.body.setAngularVelocity(10);
        this.physics.moveTo(ebullet, this.ship.x,this.ship.y, 100);
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