class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
        this.load.image('apple', 'images/apple.png' );
        this.load.image('ground', 'images/ground.png');
    	
    }
    create() {
        this.apple = this.physics.add.sprite(240, 300, 'apple');
        this.ground = this.physics.add.sprite(240,600,'ground');
        this.apple.setGravityY(200);

        this.physics.add.collider(this.apple, this.ground);
        this.ground.setImmovable();
        this.apple.setBounce(0,.5);

        this.input.on('pointerdown', this.setVelocity, this)
        console.log("Ready!");
    }

    setVelocity(){
        this.apple.setVelocity(0,-100);
    }
    update() {}
}