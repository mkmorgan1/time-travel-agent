import Master from './Master.js';

const state = {};
class Tutorial3 extends Master {
  constructor() {
    super('Tutorial3')
  }

  create() {
    /*  BADDY  */
    state.baddy = this.physics.add.sprite(550, 500, 'baddy');
    this.createAnimations();
    state.baddy.anims.play('baddy-movement');

    /*  TEXT  */
    this.createTextAndShadowedBackground('baddyText', 25, 50, ' This is a Baddy', '100px', state);
    this.createTextAndShadowedBackground('baddyText', 25, 750, ' Baddies want to hurt you', '100px', state);

    /*  START  */
    state.startText = this.createText(850, 900, 'Start >', '75px', 5).setInteractive();
    this.textHoverFeature(state.startText);
    state.startText.on('pointerdown', () => {
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
  }
  update() {
    state.baddy.angle += 5;
  }
}

export default Tutorial3;