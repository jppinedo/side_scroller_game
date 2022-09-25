import Player from 'objects/player';
import Background from 'objects/background';

class Main extends Phaser.State {

	create() {

		//Enable Arcade Physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.world.setBounds(0, 0, 1920, 1120);
		//Set the games background colour
		this.game.stage.backgroundColor = '#ceceff';

		this.bg = new Background(this.game);

        //this.platformsInit();

        this.map = this.game.add.tilemap('testLevel');
        //console.log(this.map);
        this.map.addTilesetImage('testTile', 'testTile');
        this.map.setCollisionBetween(5, 8);
        this.map.setCollisionBetween(18, 39);
        this.map.setCollisionBetween(31, 32);

        this.mapLayer1 = this.map.createLayer(0);
        this.mapLayer1.resizeWorld();
        this.mapLayer1.wrap = true;

        //  Here we create our containers group
        this.containers = this.game.add.group();
        this.containers.enableBody = true;
        //this.mapObjects = this.map.createLayer(1);
        this.map.createFromObjects('objects', 1, 'suitcase', 0, true, false, this.containers);
        console.log(this.containers);

        this.player = new Player(this.game);
        this.player.spawn(1200, this.game.world.height - 350, 'player');

        this.cursors = this.game.input.keyboard.createCursorKeys();
        // Advanced controls to show FPS
        this.game.time.advancedTiming = true;

        this.game.camera.follow(this.player.sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
	}

	update() {
		this.game.physics.arcade.collide(this.player.sprite, this.mapLayer1, this.collisionHandler, null, this);

		//  Reset the players velocity (movement)
        this.player.sprite.body.velocity.x = 0;

        // Activate falling state
        if(this.player.sprite.body.velocity.y > this.player.fallingVel && this.player.sprite.animations.currentAnim.name == "jump" && this.player.sprite.animations.currentAnim.isFinished){
            this.player.falling = true;
            this.player.jumping = false;
            console.log("falling");
        }

        //  Allow the player to jump 
        if (this.cursors.up.isDown && !this.player.climbing){
            if(!this.player.jumping && this.player.canMove && !this.player.falling){
                this.player.sprite.body.velocity.y = -350;
                this.player.sprite.animations.play('jump');
                this.player.jumping = true;
            }

            // hanging
            if(this.player.hanging){
                if(this.player.sprite.animations.currentAnim.name == "hang" && this.player.sprite.animations.currentAnim.isFinished){ 
                    this.player.hanging = false;
                    this.player.jumping = false;
                    this.player.climbing = true;  
                }
                
            }
            if(this.player.climbing){

                this.player.sprite.body.allowGravity = true;
                this.player.sprite.body.velocity.y = -300;
                //player.body.velocity.x = -300;
                this.player.sprite.animations.play('climb');
                this.player.canMove = true;

            }   
           
        }

        // translation
        if(this.player.canMove){

            // walk left
            if (this.cursors.left.isDown){
                this.player.sprite.body.velocity.x = -115;
                    
                if(!this.player.jumping && !this.player.climbing && !this.player.falling){
                  this.player.sprite.animations.play('walk');  
                }
                this.player.sprite.scale.setTo(-this.player.size,this.player.size);
                this.player.facing = "left";
            }

            // walk right
            else if (this.cursors.right.isDown){
                //  Move to the right
                this.player.sprite.body.velocity.x = 115;
                if(!this.player.jumping && !this.player.climbing){
                  this.player.sprite.animations.play('walk');  
                }
                this.player.sprite.scale.setTo(this.player.size,this.player.size);
                this.player.facing = "right";
            }

            // idle
            else if(!this.player.jumping && !this.player.climbing && !this.player.falling){
                //  Stand still
                this.player.sprite.animations.stop();
                this.player.sprite.frame = 0;
                
            }
        }
        
        // Make the camera follow player
        //this.game.camera.setPosition((this.game.width * -0.5) + this.player.sprite.x, this.player.sprite.y);

        // Animate layers with parallax
        this.bg.clouds.tilePosition.set(this.game.camera.x * this.bg.clouds.depth, 0 /** this.bg.afternoon-clouds.depth*/);
        this.bg.layer1.tilePosition.set(this.game.camera.x * this.bg.layer1.depth, 0 /** this.bg.layer1.depth*/);
        this.bg.layer2.tilePosition.set(this.game.camera.x * this.bg.layer2.depth, 0 /** this.bg.layer2.depth*/);
	}

	platformsInit(){

		// create platforms group
		this.platforms = this.game.add.group();

		//  enable physics for any object that is created in this group
       	this.platforms.enableBody = true;

        // Here we create the ground.
        let ground = this.platforms.create(0, this.game.world.height - 64, 'ground');

        ground.size = 2;
        ground.scale.setTo(50, ground.size);
        ground.body.immovable = true;

        //  create ledges
        let ledgeH = 1;
        let grounded = (ground.y + this.game.cache.getImage('ground').height) - (this.game.cache.getImage('ground').height * ground.size);
        let ledge = this.platforms.create(400, grounded * ledgeH, 'ground');
        //console.log((game.world.height - game.cache.getImage('ground').height) - (game.cache.getImage('ground').height * ground.size));
        ledge.scale.setTo(2, ledgeH);
        ledge.body.immovable = true;

        ledgeH = 4;
        ledge = this.platforms.create(450, grounded - this.game.cache.getImage('ground').height * ledgeH, 'ground');
        ledge.scale.setTo(1, ledgeH);
        ledge.body.immovable = true;

        ledgeH = 8;
        ledge = this.platforms.create(450, grounded - this.game.cache.getImage('ground').height * ledgeH, 'ground');
        ledge.scale.setTo(0.5, ledgeH);
        ledge.body.immovable = true;

        let slope = this.platforms.create(368, grounded, 'slope');
        //ledge.scale.setTo(2, 2);
        slope.body.immovable = true;
	}

	collisionHandler(pl, obj){
		// hanging animations 
        if(this.player.jumping){

            //console.log(obj);

            if((pl.body.blocked.left || pl.body.blocked.right) && obj.faceTop && !pl.body.blocked.down){
                //console.log("hanging");

                // grab player top pivot (default pivot on center)
                let plY = pl.position.y - (pl.body.height * 0.5);
                let safezone = 15;

                //console.log(obj);
                // check if close enough for hanging
                if(plY <= obj.worldY && (pl.position.y - safezone)>= obj.worldY){

                    // hang
                    this.player.sprite.body.allowGravity = false;
                    let landOffset;

                    // move player to top corner of platform
                    // check if comming from up or down
                    if(this.player.sprite.body.velocity.y < 0){
                        landOffset = obj.worldY - (this.player.sprite.body.height * -0.5);
                    } else {
                        landOffset = obj.worldY + (this.player.sprite.height * 0.5);
                    }

                    // stop player and run animation
                    this.player.sprite.body.velocity.x = 0;
                    this.player.sprite.body.velocity.y = 0;
                    this.player.sprite.body.y = obj.worldY;
                    this.player.sprite.animations.play('hang');
                    this.player.hanging = true;
                    this.player.canMove = false;
                }
            
            // landing animations for jumping
            } else if(pl.body.blocked.down){
                
                if(pl.animations.currentAnim.name == "jump"){
                    this.player.sprite.animations.play('jump_land');

                }else if(pl.animations.currentAnim.name == "jump_land" && pl.animations.currentAnim.isFinished){
                    this.player.jumping = false; 
                }     
            }
        // landing animations for climbing
        } else if(this.player.climbing){
            if(pl.body.blocked.down){
                if(pl.animations.currentAnim.name == "climb"){
                    this.player.sprite.animations.play('jump_land');
                } else if(pl.animations.currentAnim.name == "jump_land" && pl.animations.currentAnim.isFinished){
                    this.player.climbing = false;

                }
            }
        } else if(this.player.falling){
            if(pl.body.blocked.down){
                if(pl.animations.currentAnim.name == "land" && pl.animations.currentAnim.isFinished){
                    console.log("land animation finished");
                    this.player.falling = false;
                    this.player.canMove = true;


                } else if(pl.animations.currentAnim.name != "land"){
                    this.player.sprite.animations.play('land');
                    this.player.canMove = false;
                }

            }
        }
	}

	render(){
        this.game.debug.text("falling = "+this.player.falling+", jumping = "+this.player.jumping+", climbing = "+this.player.climbing+", hanging = "+this.player.hanging, 15, this.game.world.height - 15);
	}

}

export default Main;
