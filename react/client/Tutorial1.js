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
    state.moveText = this.createText(50, 50, ' Arrow Keys To Move ', '100px');
    const moveTextBounds = state.moveText.getBounds();
    state.moveTextBackground.height = moveTextBounds.height + 30;
    state.moveTextBackground.width = moveTextBounds.width + 50;

    /*  PORTAL TEXT  */
    state.portalTextBackground = this.add.rectangle(40,535,0,0, 0x0CE6FF);
    state.portalText = this.createText(50,550, ' Space Bar To Shoot Portals', '100px').setBackgroundColor('#0CE6FF');
    const portalTextBounds = state.portalText.getBounds();
    state.portalTextBackground.height = portalTextBounds.height + 30;
    state.portalTextBackground.width = portalTextBounds.width + 50;

    /*  NEXT TEXT  */
    state.nextText = this.createText(900, 900, 'Next >', '75px', 5).setInteractive();
    this.textHoverFeature(state.nextText);
    state.nextText.on('pointerdown', () => {
      this.scene.start('Tutorial2');
    }, this);

    /*  BACK  */
    state.backText = this.createText(50, 900, '< Back', '75px', 5).setInteractive();
    this.textHoverFeature(state.backText);
    state.backText.on('pointerdown', () => {
      this.scene.start('StartScreen');
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
    this.characterMovement(state.walker, state);
  }
}

export default Tutorial1;