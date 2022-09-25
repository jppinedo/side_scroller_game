class Preload extends Phaser.State {

	preload() {
		/* Preload required assets */
		//this.game.load.image('myImage', 'assets/my-image.png');
		//this.game.load.audio('myAudio', 'assets/my-audio.wav');
		//this.game.load.atlas('myAtlas', 'assets/my-atlas.png', 'assets/my-atlas.json');
		this.game.load.image('sky', 'assets/background1.jpg');
		this.game.load.tilemap('testLevel', 'tiled/test_level.csv', null, Phaser.Tilemap.CVS);
		this.game.load.image('testTile', 'assets/tile1.png');
        this.game.load.image('ground', 'assets/platform.png');
        this.game.load.image('slope', 'assets/platform_slope.png');
        this.game.load.spritesheet('player', 'assets/player1.png', 35, 57);

        // background layers
        this.game.load.image('afternoon-clouds', 'assets/afternoon_clouds2.png');
        this.game.load.image('mountains-mid1', 'assets/mountains-mid1.png');
        this.game.load.image('mountains-mid2', 'assets/mountains-mid2.png');
	}

	create() {
		//NOTE: Change to GameTitle if required
		this.game.state.start("Main");
	}

}

export default Preload;
