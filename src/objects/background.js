

class Background {
	
	constructor(game){
		this.game = game;
		this.initLayers();
	}

	initLayers(){
		this.sky = this.game.add.sprite(0, 0, 'sky');
        this.sky.scale.setTo(1, 1);
        this.sky.height = this.game.height;
        this.sky.width = this.game.width;
        this.sky.fixedToCamera = true;


		

        this.layer1 = this.game.add.tileSprite(0,
            this.game.world.height - this.game.cache.getImage('mountains-mid1').height,
            this.game.world.width,
            this.game.cache.getImage('mountains-mid1').height,
            'mountains-mid1'
        );
     
        this.layer2 = this.game.add.tileSprite(0,
            this.game.world.height - this.game.cache.getImage('mountains-mid2').height,
            this.game.world.width,
            this.game.cache.getImage('mountains-mid2').height,
            'mountains-mid2'
        );
        //console.log("world.height: "+this.game.world.height+", image.height: "+this.game.cache.getImage('mountains-mid2').height+", resta: "+ (this.game.world.height - this.game.cache.getImage('mountains-mid2').height));
        this.clouds = this.game.add.tileSprite(0,
            this.game.camera.view.y + this.game.cache.getImage('afternoon-clouds').height,
            this.game.world.width,
            this.game.cache.getImage('afternoon-clouds').height,
            'afternoon-clouds'
        );
        // Setting layers depth
            this.clouds.depth = 0.8; 
            this.layer1.depth = 0.6;
            this.layer2.depth = 0.4;
	}
}

export default Background;