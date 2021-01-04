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

    /*  NEXT TEXT  */
    state.nextText = this.createText(900,900, 'Next', '100px', 5).setInteractive();
    this.textHoverFeature(state.nextText);
    state.nextText.on('pointerdown', () => {
      this.scene.start('Level1');
    }, this);

    /*  TUTORIAL CHARACTERS  */
    state.walker = this.createGravityPlayer(500, 300);
    state.shooter = this.createGravityPlayer(500, 800);

    /*  ANIMATIONS AND CONTROLES  */
    this.createAnimations();
    state.cursors = this.input.keyboard.createCursorKeys();

    /*  COLLIDERS */
    this.physics.add.collider(state.walker, state.ground);
    this.physics.add.collider(state.walker, state.ground);
  }

  update() {
    this.shootAnimation(state.shooter, state);

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
  }
}

export default Tutorial1;