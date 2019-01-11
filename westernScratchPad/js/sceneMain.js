class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
        this.load.spritesheet('cowboy', 'images/cowboy-walk-no-gun.png', {frameWidth: 50, frameHeight: 55});
    	
    }
    create() {
        this.anims.create({
            key: 'walk',
            frames: [
                { key: 'cowboy',frame:0 },
                { key: 'cowboy',frame:1 },
                { key: 'cowboy',frame:2 },
                { key: 'cowboy',frame:3 },
            ],
            frameRate: 8,
            repeat: 3
        });

        this.cowboy = this.add.sprite(game.config.width/2, game.config.height/2, 'cowboy');
        this.cowboy.play('walk');
        console.log("Ready!");
    }
    update() {}
}