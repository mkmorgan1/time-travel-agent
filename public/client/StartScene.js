// const Phaser = require('phaser');
const state = {};
class StartScene extends Phaser.Scene {
	constructor() {
		super({ key: 'StartScene' })
	}
	preload() {
		/*	BACKGROUNDS	*/
		this.load.image('city-1', './assets/city1.png');
		this.load.image('city-2', './assets/city2.png');
		this.load.image('trees-1', './assets/forest.png');
		this.load.image('trees-2', './assets/forest2.png');
		this.load.image('grass', './assets/grass.png');
		this.load.image('ground', './assets/ground.png');

		/*	SPRITES	*/
		this.load.spritesheet('player', './assets/player.png', {frameWidth: 500, frameHeight: 500});
		this.load.spritesheet('portal', './assets/portal.png', {frameWidth: 500, frameHeight: 500});
		this.load.spritesheet('orb', './assets/orb.png', {frameWidth: 500, frameHeight: 500});
		this.load.spritesheet('baddy', './assets/badGuy.png', {frameWidth: 500, frameHeight: 500});
	}

  create() {
		state.active = true;

		/*	FOREST	*/
		state.trees2 = this.add.image(2500,750, 'trees-2').setTint('0xccaacc')
		state.grass = this.add.image(2500,750,'grass')//.setScale(.5);
		state.trees1 = this.add.image(2500,700,'trees-1')//.setScale(.5);

		/*	CITY	*/
		state.city2 = this.add.image(2500,250, 'city-2')//.setTint('0xccaacc');
		state.city1 = this.add.image(2500,250,'city-1')//.setScale(.5);

		/* Title */
		this.add.text(20, 20, 'TIME TRAVELER AGENT', {font: "40px Times New Roman", fill: "#ffa0d0"}).setOrigin(0,0);
		this.add.text(20, 60, "by Matt", { font: "20px Times New Roman", fill: "#ffa0d0"}).setOrigin(0,0);

		/*	PLAYER	*/
		state.player = this.physics.add.sprite(50,300, 'player').setScale(.5);
		state.player.setCollideWorldBounds(true);
		state.player.body.setGravityY(1000);
		state.player.body.setSize(100,400);
		state.player.body.setOffset(200,50);



		/*	BADDY	*/
		state.baddy = this.physics.add.group();
		state.baddy.create(500, 300, 'baddy').setScale(.5);
		state.baddy.create(1000, 800, 'baddy').setScale(.5);
		state.baddy.create(1500, 300, 'baddy').setScale(.5);
		state.baddy.create(2000, 300, 'baddy').setScale(.5);
		state.baddy.create(2500, 800, 'baddy').setScale(.5);
		state.baddy.create(3000, 300, 'baddy').setScale(.5);
		state.baddy.create(3500, 800, 'baddy').setScale(.5);
		state.baddy.create(4000, 300, 'baddy').setScale(.5);
		state.baddy.create(4500, 800, 'baddy').setScale(.5)

		/*	GROUND	*/
		state.ground = this.physics.add.staticGroup();
		state.ground.create(2500,500, 'ground')
		state.ground.create(2500,0, 'ground')
		state.ground.create(2500,1000, 'ground')

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
			this.add.text(this.cameras.main.midPoint.x - 250, 300, 'Game Over', { fontSize: '100px', fill: '#FAEFF1' });
			this.add.text(this.cameras.main.midPoint.x - 350, 400, 'Click To Restart', { fontSize: '75px', fill: '#FAEFF1' });
			this.add.text(this.cameras.main.midPoint.x - 255, 295, 'Game Over', { fontSize: '100px', fill: '#ffa0d0' });
			this.add.text(this.cameras.main.midPoint.x - 355, 395, 'Click To Restart', { fontSize: '75px', fill: '#ffa0d0' });
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
			});
		})
		/*	LEVEL PROGRESION FOR DEVs	*/
		// this.input.on('pointerdown', () => {
		// 	this.scene.stop('StartScene')
		// 	this.scene.start('Scene2')
		// })
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
			frames: this.anims.generateFrameNumbers('player', {start: 1, end: 4}),
			frameRate: 10,
			repeat: 0
		})
		this.anims.create({
			key: 'shoot',
			frames: this.anims.generateFrameNumbers('player', {start: 5, end: 8}),
			frameRate: 10,
			repeat: 0
		})
		this.anims.create({
			key: 'idle',
			frames: this.anims.generateFrameNumbers('player', {start: 1, end: 1}),
			frameRate: 5,
			repeat: 0
		})
		this.anims.create({
			key: 'baddy-movement',
			frames: this.anims.generateFrameNumbers('baddy', {start: 0, end: 9}),
			frameRate: 10,
			repeat: -1
		})
	}

	update() {
		if (!state.pause) {
			/* SPACE SHOOTS ORB THEN PORTAL OPENS	*/
			if (Phaser.Input.Keyboard.JustDown(state.cursors.space) && !state.alreadyOrb) {
				state.player.anims.play('shoot', true).once('animationcomplete', () => {

					if (state.player.flipX && state.cursors.space.isDown) {
						state.orb = this.physics.add.sprite(state.player.x - 25, state.player.y - 10, 'orb').setScale(.1);
						state.orb.anims.play('orb-rotate', true);
						state.orb.body.velocity.x = - 1000;

					} else if (!state.player.flipX && state.cursors.space.isDown) {
						state.orb = this.physics.add.sprite(state.player.x + 25, state.player.y - 10, 'orb').setScale(.1);
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
				state.player.x += 5;
			} else if (state.cursors.left.isDown) {
				state.player.flipX = true;
				state.player.anims.play('run', true).once('animationcomplete', () => {
					state.player.anims.play('idle', true);
				})
				state.player.x -= 5;
			} else if (state.cursors.up.isDown) {
				state.player.anims.play('run', true).once('animationcomplete', () => {
					state.player.anims.play('idle', true);
				})
				state.player.y -= 10;
			// } else if (state.cursors.down.isDown) {
			// 	state.player.anims.play('run', true);
			// 	state.player.y += 10;
			} else {
				// state.player.anims.play('idle', true);
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
	}
}