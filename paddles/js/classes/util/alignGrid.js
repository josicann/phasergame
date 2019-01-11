class AlignGrid {
    constructor(config) {
        this.config = config;

        // set default config values
        if(!config.scene) {
            console.log('missing scene');
            return;
        }
        if(!config.rows) {
            config.rows = 5;
        }

        if(!config.cols) {
            config.cols = 5;
        }

        if(!config.height){
            config.height = game.config.height;
        }

        if(!config.width){
            config.width = game.config.width;
        }
        this.scene = config.scene;

        //cell width
        this.cw = game.config.width/config.cols;
        //cell height
        this.ch = game.config.height/config.rows;
    }

    display() {
        this.graphics = this.scene.add.graphics();
        this.graphics.lineStyle(2, 0xff0000);

        for(var i = 0 ; i < game.config.width; i+= this.cw) {
            this.graphics.moveTo(i,0);
            this.graphics.lineTo(i, this.config.height)
        }

        for(var j = 0 ; j < game.config.height; j+= this.ch) {
            this.graphics.moveTo(0, j);
            this.graphics.lineTo(this.config.width, j)
        }


        this.graphics.strokePath();
    }

    placeAt(xx, yy, obj) {
        var x1 = this.cw*xx+this.cw/2;
        var y1 = this.ch*yy+this.ch/2;

        obj.x = x1;
        obj.y = y1;
    }

    placeAtIndex(index, obj) {
        var yy = Math.floor(index/this.config.cols);
        var xx = index-(yy*this.config.cols);

        this.placeAt(xx,yy, obj);
    }

    showNumbers() {
        var count = 0;

        this.display();
        for(var i = 0; i < this.config.rows; i++){
            for(var j = 0; j < this.config.cols; j++){
                var numText = this.scene.add.text(0,0,count,{color:'#ff0000'});
                numText.setOrigin(0.5,0.5);
                this.placeAtIndex(count, numText);
                
                count++;
            }
        }
    }
}