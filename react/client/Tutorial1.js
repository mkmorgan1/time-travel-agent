import Master from './Master.js';

const state = {};
class Tutorial1 extends Master {
  constructor() {
    super('Tutorial1')
  }

  create () {
    this.createBackground(state);

    /*  MOVE TEXT  */
    this.createTextAndShadowedBackground('move', 25, 50, ' Arrow Keys To Move ', '100px', state);

    /*  PORTAL TEXT  */
    this.createTextAndShadowedBackground('portal', 25, 550, ' Space Bar To Shoot Portals', '100px', state);

    /*  NEXT TEXT  */
    state.nextText = this.createText(900, 900, 'Next >', '75px', 5).setInteractive();
    this.textHoverFeature(state.nextText);
    state.nextText.on('pointerdown', () => {
      this.scene.stop(this.level);
			this.scene.start(this.nextLevel[this.level]);
    });

    /*  BACK  */
    state.backText = this.createText(50, 900, '< Back', '75px', 5).setInteractive();
    this.textHoverFeature(state.backText);
    state.backText.on('pointerdown', () => {
      this.scene.stop(this.level);
			this.scene.start(this.previousLevel[this.level]);
    });

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