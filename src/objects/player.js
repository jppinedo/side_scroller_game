class Player {

	constructor(game){
		this.game = game;
		// Player stats
                this.fallingVel = 480;

                // Animation states
                this.facing = "right";
                this.jumping = false;
                this.hanging = false;
                this.climbing = false;
                this.falling = false;
                this.canMove = true;
                this.size = 1;
                this.inventory = [];
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
                this.sprite.animations.add('walk', [1, 2, 3, 4, 5], 10, true);
                this.sprite.animations.add('jump', [6, 7, 8, 8, 9, 9, 10], 10, false);
                this.sprite.animations.add('jump_land', [11, 12, 13], 10, false);
                this.sprite.animations.add('hang', [14, 15, 16], 10, false);
                this.sprite.animations.add('climb', [ 6, 7, 8, 9, 10], 10, false);
                this.sprite.animations.add('land', [20, 20, 20, 18, 19], 10, false);
   
	}

}

export default Player;