import Phaser from 'phaser';
class Master extends Phaser.Scene {
  constructor(level) {
		super(level)
		this.level = level;
		this.nextLevel = {
			'StartScreen': 'Tutorial1',
			'Tutorial1': 'Tutorial2',
			'Tutorial2': 'Tutorial3',
			'Tutorial3': 'Level1',
			'Level1': 'Level2',
			'Level2': 'Level3',
			'Level3': 'Level4',
			'Level4': 'Credits',
			'Credits': 'StartScreen'
		}
		this.previousLevel = {
			'StartScreen': 'Credits',
			'Tutorial1': 'StartScreen',
			'Tutorial2': 'Tutorial1',
			'Tutorial3': 'Tutorial2',
			'Level1': 'Tutorial3',
			'Level2': 'Level1',
			'Level3': 'Level2',
			'Level4': 'Level3',
			'Credits': 'Level4'
		}
		this.boxShadow = 0x0CE6FF;
		this.textColor = '#FF76FF';
		this.color = 0xFF76FF;
		this.hoverTextColor = '#FF0CFF';
		this.hoverColor = 0xFF0CFF;
		this.textShadowColor = '#FAEFF1';
		this.fontChoice = `'Staatliches', cursive`;
  }

	preload() {
		/*	BACKGROUNDS	*/
		this.load.image('city-1', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/city1.png');
		this.load.image('city-2', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/city2.png');
		this.load.image('trees-1', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/forest.png');
		this.load.image('trees-2', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/forest2.png');
		this.load.image('grass', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/grass.png');
		this.load.image('ground', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/ground.png');

		/*	SPRITES	*/
		this.load.spritesheet('player', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/player1.png', {frameWidth: 500, frameHeight: 500});
		this.load.spritesheet('portal', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/portal.png', {frameWidth: 500, frameHeight: 500});
		this.load.spritesheet('orb', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/orb.png', {frameWidth: 500, frameHeight: 500});
		this.load.spritesheet('baddy', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/badGuy.png', {frameWidth: 500, frameHeight: 500});
		this.load.spritesheet('end', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/endPortal.png', {frameWidth: 125, frameHeight: 500});
	}

	createBackground(obj) {
		/*	FOREST	*/
		obj.trees2 = this.add.image(2500,750, 'trees-2').setTint('0xccaacc');
		obj.grass = this.add.image(2500,750,'grass');
		obj.trees1 = this.add.image(2500,700,'trees-1');
		/*	CITY	*/
		obj.city2 = this.add.image(2500,250, 'city-2');
		obj.city1 = this.add.image(2500,250,'city-1');
		/*	GROUND	*/
		obj.ground = this.physics.add.staticGroup();
		obj.ground.create(2500,500, 'ground');
		obj.ground.create(2500,0, 'ground');
		obj.ground.create(2500,1000, 'ground');
	}

	createGravityPlayer(x, y) {
		const character = this.physics.add.sprite(x, y, 'player').setScale(.5);
		character.setCollideWorldBounds(true);
		character.body.setGravityY(1000);
		character.body.setSize(100,400);
		character.body.setOffset(200,100);
		return character;
	}

	createText(x, y, string, fontSize, shadow = 5) {
		return (this.add.text(x, y, string, { font: `${fontSize} ${this.fontChoice}`, fill: this.textColor}).setShadow(shadow, shadow, this.textShadowColor));
	}

	createTextAndShadowedBackground(name, x, y, string, px, state) {
    state.name = {};
    state.name.background = this.add.rectangle(x - 5,y - 5,0,0, this.hoverColor);
    state.name.backgroundShadow = this.add.rectangle(state.name.background.x - 5, state.name.background.y - 5, 0, 0, this.boxShadow);
    state.name.text = this.createText(x, y, string, px);
    const textBounds = state.name.text.getBounds();
    state.name.background.height = textBounds.height + 30;
    state.name.background.width = textBounds.width + 50;
    state.name.backgroundShadow.height = textBounds.height + 30;
    state.name.backgroundShadow.width = textBounds.width + 50;
	}

	textHoverFeature(text) {
		text.on('pointerout', () => {
			text.setShadow(5, 5, this.textShadowColor);
			text.setColor(this.textColor);
		});
		text.on('pointerover', () => {
			text.setShadow(3, 3, this.textShadowColor);
			text.setColor(this.hoverTextColor);
			// console.log(text);
		});

	}

  createAnimations() {
		this.anims.create({
			key: 'portal-grow',
			frames: this.anims.generateFrameNumbers('portal', {start: 0, end: 19}),
			frameRate: 10,
			repeat: 0
		});
		this.anims.create({
			key: 'portal-open',
			frames: this.anims.generateFrameNumbers('portal', {start: 16, end: 19}),
			frameRate: 10,
			repeat: 0
		})
		this.anims.create({
			key: 'portal-open-forever',
			frames: this.anims.generateFrameNumbers('portal', {start: 16, end: 19}),
			frameRate: 10,
			repeat: -1
		})
		this.anims.create({
			key: 'portal-return',
			frames: this.anims.generateFrameNumbers('portal', {start: 0, end: 8}),
			frameRate: 10,
			isReversed: true,
			repeat: 0
		})
		this.anims.create({
			key: 'orb-rotate',
			frames: this.anims.generateFrameNumbers('orb', {start: 0, end: 3}),
			frameRate: 40,
			repeat: -1
		})
		this.anims.create({
			key: 'run',
			frames: this.anims.generateFrameNumbers('player', {start: 1, end: 8}),
			frameRate: 25,
			repeat: 0
		})
		this.anims.create({
			key: 'dance',
			frames: this.anims.generateFrameNumbers('player', {start: 4, end: 8}),
			frameRate: 5,
			repeat: -1
		})
		this.anims.create({
			key: 'shoot',
			frames: this.anims.generateFrameNumbers('player', {start: 13, end: 22}),
			frameRate: 20,
			repeat: 0
		})
		this.anims.create({
			key: 'idle',
			frames: this.anims.generateFrameNumbers('player', {start: 10, end: 12}),
			frameRate: 5,
			repeat: 0
		})
		this.anims.create({
			key: 'baddy-movement',
			frames: this.anims.generateFrameNumbers('baddy', {start: 0, end: 9}),
			frameRate: 20,
			repeat: -1
		})
		this.anims.create({
			key: 'end-grow',
			frames: this.anims.generateFrameNumbers('end', {start: 0, end: 18}),
			frameRate: 10,
			repeat: 0
		})
		this.anims.create({
			key: 'end-open',
			frames: this.anims.generateFrameNumbers('end', {start: 16, end: 18}),
			frameRate: 10,
			repeat: -1
		})
	}

	shootAnimation(character, state) {
    /*  SPACEBAR SHOOTS  */
    if (Phaser.Input.Keyboard.JustDown(state.cursors.space)) {
      character.anims.play('shoot', true).once('animationcomplete', () => {
        if (character.flipX && state.cursors.space.isDown) {
          state.orb = this.physics.add.sprite(character.x - 50, character.y - 10, 'orb').setScale(.1);
          state.orb.anims.play('orb-rotate', true);
          state.orb.body.velocity.x = - 1000;

        } else if (!character.flipX && state.cursors.space.isDown) {
          state.orb = this.physics.add.sprite(character.x + 50, character.y - 10, 'orb').setScale(.1);
          state.orb.anims.play('orb-rotate', true);
          state.orb.body.velocity.x = 1000;
        }
      })
    }
    /*  ORB TURNS INTO PORTAL  */
    if (state.orb && state.orb.body && Phaser.Math.Distance.Between(state.orb.x, state.orb.y, character.x, character.y) > 200) {
			// DELETES EXISTING PORTAL
			if (state.portal) {
				state.portal.destroy();
			}
			// CREATES PORTAL
			state.orb.body.velocity.x = 0;
			state.portal = this.physics.add.sprite(state.orb.x, state.orb.y, 'portal').setScale(.5);
			state.portal.body.setSize(400, 400);
			state.portal.body.setOffset(50, 50);
			state.orb.destroy();
			state.portalOpen = true;
				state.portal.anims.play('portal-grow').once('animationcomplete', () => {
						state.portal.anims.playReverse('portal-grow').once('animationcomplete', () => {
							console.log('done again')
							state.portal.destroy();
							state.portalOpen = false;
						})
				})
		}
	}

	characterMovement(character, state) {
    if (state.cursors.right.isDown) {
      character.flipX = false;
      character.anims.play('run', true).once('animationcomplete', () => {
        character.anims.play('idle', true);
      })
      character.x += 10;
    } else if (state.cursors.left.isDown) {
      character.flipX = true;
      character.anims.play('run', true).once('animationcomplete', () => {
        character.anims.play('idle', true);
      })
      character.x -= 10;
    } else if (state.cursors.up.isDown) {
      character.anims.play('run', true).once('animationcomplete', () => {
        character.anims.play('idle', true);
      })
      character.y -= 10;
    }
	}

	portalTravel(character, state) {
		if (state.portalOpen) {
			if (Phaser.Math.Distance.Between(state.portal.x, state.portal.y, character.x, character.y) < 20) {
				if (character.y < 500) {
					character.y = 850;
					state.return = this.physics.add.sprite(character.x, character.y, 'portal').setScale(.5);
					state.return.anims.playReverse('portal-return').once('animationcomplete', () => {
						state.return.destroy();
					})
				} else {
					character.y = 350;
					state.return = this.physics.add.sprite(character.x, character.y, 'portal').setScale(.5);
					state.return.anims.playReverse('portal-return').once('animationcomplete', () => {
						state.return.destroy();
					})
				}
			}
		}

	}

}

export default Master;