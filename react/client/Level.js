import Master from './Master.js';
// import Phaser from 'phaser';

const state = {};
class Level extends Master {
// class Level extends Phaser.Scene {
	// constructor(level) {
	// 	super(level)
	// 	this.level = level;
	// 	this.nextLevel = {
	// 		'StartScreen': 'Level1',
	// 		'Level1': 'Level2',
	// 		'Level2': 'Level1',
	// 	}
	// }
	// preload() {
	// 	/*	BACKGROUNDS	*/
	// 	this.load.image('city-1', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/city1.png');
	// 	this.load.image('city-2', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/city2.png');
	// 	this.load.image('trees-1', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/forest.png');
	// 	this.load.image('trees-2', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/forest2.png');
	// 	this.load.image('grass', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/grass.png');
	// 	this.load.image('ground', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/ground.png');

	// 	/*	SPRITES	*/
	// 	this.load.spritesheet('player', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/player1.png', {frameWidth: 500, frameHeight: 500});
	// 	this.load.spritesheet('portal', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/portal.png', {frameWidth: 500, frameHeight: 500});
	// 	this.load.spritesheet('orb', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/orb.png', {frameWidth: 500, frameHeight: 500});
	// 	this.load.spritesheet('baddy', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/badGuy.png', {frameWidth: 500, frameHeight: 500});
	// 	this.load.spritesheet('end', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/endPortal.png', {frameWidth: 125, frameHeight: 500});
  // }

  create() {
		state.active = true;

		/*	FOREST	*/
		state.trees2 = this.add.image(2500,750, 'trees-2').setTint('0xccaacc');
		state.grass = this.add.image(2500,750,'grass');
		state.trees1 = this.add.image(2500,700,'trees-1');

		/*	CITY	*/
		state.city2 = this.add.image(2500,250, 'city-2');
		state.city1 = this.add.image(2500,250,'city-1');

		/* Title */
		state.titleWhite = this.add.text(25, 25, `${this.levelName}`, {font: `50px 'Staatliches', cursive`,fill: '#FAEFF1'}).setOrigin(0,0);
		state.titlePink = this.add.text(20, 20, `${this.levelName}`, {font: `50px 'Staatliches', cursive`,fill: '#ffa0d0'}).setOrigin(0,0);

		/*	PLAYER	*/
		state.player = this.physics.add.sprite(50,300, 'player').setScale(.5);
		state.player.setCollideWorldBounds(true);
		state.player.body.setGravityY(1000);
		state.player.body.setSize(100,400);
		state.player.body.setOffset(200,100);

		/*	END PORTAL	*/
		state.end = this.physics.add.group();

		/*	BADDY	*/
		state.baddy = this.physics.add.group();
		this.createBaddies();

		/*	GROUND	*/
		state.ground = this.physics.add.staticGroup();
		state.ground.create(2500,500, 'ground');
		state.ground.create(2500,0, 'ground');
		state.ground.create(2500,1000, 'ground');

		/* END */
		state.endOpen = false;
		// state.end = this.physics.add.sprite(500, 5000, 'end');

		/*	ANIMATIONS CREATOR FUNCTION / CURSORS	*/
		state.cursors = this.input.keyboard.createCursorKeys();
		this.createAnimations();
		Phaser.Actions.Call(state.baddy.getChildren(), (child) => {
			child.setSize(400, 400);
			child.setOffset(50, 50);
			child.body.setGravityY(1000);
			child.anims.play('baddy-movement');
			child.move = this.tweens.add({
				targets: child,
				x: child.x + 200,
				ease: 'Linear',
				duration: 1000,
				repeat: -1,
				yoyo: true
			})
		})

		/*	CAMERAS */
		this.cameras.main.setBounds(0, 0, state.city2.width, 1000);
		this.physics.world.setBounds(0, 0, state.city2.getBounds().width, 1000 + state.player.height);

		/*	SCROLLFACTORS	*/
		state.city2.setScrollFactor(.9);
		state.trees2.setScrollFactor(.7);
		this.cameras.main.startFollow(state.player, true, 0.5, 0.5)

		/*	COLLIDERS	*/
		this.physics.add.collider(state.player, state.ground);
		this.physics.add.collider(state.baddy, state.ground);
		this.physics.add.collider(state.player, state.baddy, () => {
			// GAMEOVER TEXT
			this.add.text(this.cameras.main.midPoint.x - 250, 300, 'Game Over', {font: `150px 'Staatliches', cursive`, fill: '#FAEFF1' });
			this.add.text(this.cameras.main.midPoint.x - 250, 500, 'Click To Restart', { font: `95px 'Staatliches', cursive`, fill: '#FAEFF1' });
			this.add.text(this.cameras.main.midPoint.x - 255, 295, 'Game Over', { font: `150px 'Staatliches', cursive`, fill: '#ffa0d0' });
			this.add.text(this.cameras.main.midPoint.x - 255, 495, 'Click To Restart', { font: `95px 'Staatliches', cursive`, fill: '#ffa0d0' });
			// PAUSING EVERYTHING
			state.pause = true;
			this.physics.pause();
			this.anims.pauseAll();
			Phaser.Actions.Call(state.baddy.getChildren(), (child) => {
				child.move.stop();
			});
			// RESTART FUNCTION
			this.input.once('pointerdown', () =>{
				this.anims.resumeAll();
				this.scene.restart();
				state.pause = false;
				state.portalOpen = false;
			});
		})
		this.physics.add.collider(state.player, state.end, () => {
			this.scene.stop(this.level)
			this.scene.start(this.nextLevel[this.level])
		});
	}
	createBaddies() {
		for (let i = 1; i < this.baddyY.length; i++) {
			var x = i * 500;
			var y = this.baddyY[i];
			state.baddy.create(x, y, 'baddy').setScale(.5);
		}
	}

	update() {
		if (!state.pause) {
			/* SPACE SHOOTS ORB THEN PORTAL OPENS	*/
			if (Phaser.Input.Keyboard.JustDown(state.cursors.space) && !state.alreadyOrb) {
				state.player.anims.play('shoot', true).once('animationcomplete', () => {

					if (state.player.flipX && state.cursors.space.isDown) {
						state.orb = this.physics.add.sprite(state.player.x - 50, state.player.y - 10, 'orb').setScale(.1);
						state.orb.anims.play('orb-rotate', true);
						state.orb.body.velocity.x = - 1000;

					} else if (!state.player.flipX && state.cursors.space.isDown) {
						state.orb = this.physics.add.sprite(state.player.x + 50, state.player.y - 10, 'orb').setScale(.1);
						state.orb.anims.play('orb-rotate', true);
						state.orb.body.velocity.x = 1000;
					}
				})
				/*	MOVEMENT	*/
			} else if (state.cursors.right.isDown) {
				state.player.flipX = false;
				state.player.anims.play('run', true).once('animationcomplete', () => {
					state.player.anims.play('idle', true);
				})
				state.player.x += 10;
			} else if (state.cursors.left.isDown) {
				state.player.flipX = true;
				state.player.anims.play('run', true).once('animationcomplete', () => {
					state.player.anims.play('idle', true);
				})
				state.player.x -= 10;
			} else if (state.cursors.up.isDown) {
				state.player.anims.play('run', true).once('animationcomplete', () => {
					state.player.anims.play('idle', true);
				})
				state.player.y -= 10;
			}
		}

		/*	ORB SHOOTS PORTAL OPENS	*/
		if (state.orb && state.orb.body && Phaser.Math.Distance.Between(state.orb.x, state.orb.y, state.player.x, state.player.y) > 200) {
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
		/*	TRAVELING CONDITIONAL	*/
		if (state.portalOpen) {
			if (Phaser.Math.Distance.Between(state.portal.x, state.portal.y, state.player.x, state.player.y) < 20) {
				if (state.player.y < 500) {
					state.player.y = 850;
					state.return = this.physics.add.sprite(state.player.x, state.player.y, 'portal').setScale(.5);
					state.return.anims.playReverse('portal-return').once('animationcomplete', () => {
						state.return.destroy();
					})
				} else {
					state.player.y = 350;
					state.return = this.physics.add.sprite(state.player.x, state.player.y, 'portal').setScale(.5);
					state.return.anims.playReverse('portal-return').once('animationcomplete', () => {
						state.return.destroy();
					})
				}
			}
		}
		/*	END PORTAL	*/
		if (state.player.x > 4500 && !state.endOpen) {
			state.endOpen = true;
			state.end.create(4975, 250, 'end').setScale(1.5);
			state.end.create(4975, 750, 'end').setScale(1.5);
			Phaser.Actions.Call(state.end.getChildren(), (end) => {
				end.anims.play('end-grow').once('animationcomplete', () => {
					end.anims.play('end-open');
				});
			})
		}
	}
}

export default Level;
