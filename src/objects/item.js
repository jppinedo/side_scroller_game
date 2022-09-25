class Item {

	constructor(game){
		this.game = game;
                this.id;
                this.name;
                this.cat = [];
                this.sprite;
                this.icon;


                
	}

	spawn(x, y, sprite){
		//  Create Player Sprite
		this.sprite = this.game.add.sprite(x, y, sprite);
		//  Enable physics on the player
                this.game.physics.arcade.enable(this.sprite);
                this.sprite.enableBody = true; 
                // Player stats
                this.sprite.setHealth = 100;
                this.sprite.body.gravity.y = 800;
                this.sprite.body.collideWorldBounds = true;
                this.sprite.anchor.setTo(.5, .5);   
                this.sprite.scale.setTo(this.size,this.size);
                // Set player collision offset
                this.sprite.body.setSize(10, 55, 12, 2);
                // Animations sheets
                this.sprite.animations.add('spawn', [1, 2, 3, 4, 5], 10, true);
   
	}

}

export default Item;