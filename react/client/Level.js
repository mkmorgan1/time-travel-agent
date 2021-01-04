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
			/*	GAMEOVER TEXT	*/
			state.gameOverTextSize = '175px';
			state.centerX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
			state.centerY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
			state.optionsTextSize = '105px';
			// RECTANGLE
			state.rectangle = this.add.rectangle(state.centerX, state.centerY, 750, 500, 0xffa0d0)
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

			// MAIN MENUE
			state.mainText = this.createText(state.centerX, 625, 'Main Menue', state.optionsTextSize).setOrigin(.5).setInteractive();
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
			/* SPACE SHOOTS ORB THEN PORTAL OPENS	*/
			if (Phaser.Input.Keyboard.JustDown(state.cursors.space)) {
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
