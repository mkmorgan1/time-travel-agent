import Master from './Master.js';
const state = {};
class Tutorial1 extends Master {
  constructor() {
    super('Tutorial1')
  }
  create () {
    this.createBackground(state);
    /*  MOVE TEXT  */
    state.moveTextBackground = this.add.rectangle(40,35,0,0, 0x0CE6FF);
    state.moveText = this.createText(50, 50, ' Arrows To Move ', '100px');
    const moveTextBounds = state.moveText.getBounds();
    state.moveTextBackground.height = moveTextBounds.height + 50;
    state.moveTextBackground.width = moveTextBounds.width + 50;
    /*  PORTAL TEXT  */
    state.portalTextBackground = this.add.rectangle(40,535,0,0, 0x0CE6FF);
    state.portalText = this.createText(50,550, 'Space To Shoot Portal', '100px').setBackgroundColor('#0CE6FF');
    const portalTextBounds = state.portalText.getBounds();
    state.portalTextBackground.height = portalTextBounds.height + 50;
    state.portalTextBackground.width = portalTextBounds.width + 50;


    state.nextText = this.createText(900,900, 'Next', '100px', 5).setInteractive();
    this.textHoverFeature(state.nextText);
    state.nextText.on('pointerdown', () => {
      this.scene.start('Level1');
    }, this);


    state.walker = this.createGravityPlayer(500, 300);
    state.shooter = this.createGravityPlayer(500, 800);

    this.createAnimations();
    state.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(state.walker, state.ground);
    this.physics.add.collider(state.walker, state.ground);
  }
  shootAnimation(character, state) {
    if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
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
  }
  update() {
    // this.shootAnimation(state.shooter, state);
    if (Phaser.Input.Keyboard.JustDown(state.cursors.space) && !state.alreadyOrb) {
      state.shooter.anims.play('shoot', true).once('animationcomplete', () => {
        if (state.shooter.flipX && state.cursors.space.isDown) {
          state.orb = this.physics.add.sprite(state.shooter.x - 50, state.shooter.y - 10, 'orb').setScale(.1);
          state.orb.anims.play('orb-rotate', true);
          state.orb.body.velocity.x = - 1000;

        } else if (!state.shooter.flipX && state.cursors.space.isDown) {
          state.orb = this.physics.add.sprite(state.shooter.x + 50, state.shooter.y - 10, 'orb').setScale(.1);
          state.orb.anims.play('orb-rotate', true);
          state.orb.body.velocity.x = 1000;
        }
      })
    }

    if (state.cursors.right.isDown) {
      state.walker.flipX = false;
      state.walker.anims.play('run', true).once('animationcomplete', () => {
        state.walker.anims.play('idle', true);
      })
      state.walker.x += 10;
    } else if (state.cursors.left.isDown) {
      state.walker.flipX = true;
      state.walker.anims.play('run', true).once('animationcomplete', () => {
        state.walker.anims.play('idle', true);
      })
      state.walker.x -= 10;
    } else if (state.cursors.up.isDown) {
      state.walker.anims.play('run', true).once('animationcomplete', () => {
        state.walker.anims.play('idle', true);
      })
      state.walker.y -= 10;
    }

    if (state.orb && state.orb.body && Phaser.Math.Distance.Between(state.orb.x, state.orb.y, state.shooter.x, state.shooter.y) > 200) {
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
}

export default Tutorial1;