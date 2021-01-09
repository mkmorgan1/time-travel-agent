import Master from './Master.js';
// import Phaser from 'phaser';

const state = {};
class Level extends Master {

  create() {
		state.active = true;
		this.createBackground(state);
		/* Title */
		state.title = this.createText(25, 25, this.levelName, '60px', );
		/*	PLAYER	*/
		state.player = this.createGravityPlayer(50, 300);

		/*	END PORTAL	*/
		state.endOpen = false;
		state.end = this.physics.add.group();

		/*	BADDY	*/
		state.baddy = this.physics.add.group();
		this.createBaddies();


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
				x: child.x + this.baddyPath,
				y: child.y + 10,
				ease: 'Linear',
				duration: (Math.random() * 500) + 500,
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
			/*	GAMEOVER TEXT	*/
			state.gameOverTextSize = '175px';
			state.centerX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
			state.centerY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
			state.optionsTextSize = '105px';
			// RECTANGLE
			state.rectangle = this.add.rectangle(state.centerX, state.centerY, 750, 500, this.hoverColor)
			this.add.rectangle(state.centerX - 5, state.centerY - 5, 750, 500, 0x0CE6FF)
			// GAME OVER
			state.gameOver = this.createText(state.centerX, 350, 'Game Over', state.gameOverTextSize).setOrigin(.5);
			// RESTART
			state.restartText = this.createText(state.centerX, 525, 'Restart', state.optionsTextSize).setOrigin(.5).setInteractive();
			this.textHoverFeature(state.restartText);
			state.restartText.on('pointerdown', () => {
				this.anims.resumeAll();
				this.scene.restart();
				state.pause = false;
				state.portalOpen = false;
			}, this);

			// MAIN MENU
			state.mainText = this.createText(state.centerX, 625, 'Main Menu', state.optionsTextSize).setOrigin(.5).setInteractive();
			this.textHoverFeature(state.mainText);
			state.mainText.on('pointerdown', () => {
				this.scene.stop(this.level);
				this.scene.start('StartScreen');
				state.pause = false;
				state.portalOpen = false;
				this.anims.resumeAll();
			});

			// PAUSING EVERYTHING
			state.pause = true;
			this.physics.pause();
			this.anims.pauseAll();
			Phaser.Actions.Call(state.baddy.getChildren(), (child) => {
				child.move.stop();
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
			this.shootAnimation(state.player, state);
    	this.characterMovement(state.player, state);
			this.portalTravel(state.player, state);
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
