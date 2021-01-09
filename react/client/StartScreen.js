// import Phaser from 'phaser';
import Master from './Master.js';
const state = {}

class StartScreen extends Master {
  constructor() {
    super('StartScreen')
  }

  create() {
    /*  PORTAL  */
    state.portal = this.physics.add.sprite(550, 470, 'portal').setScale(1.5);

    /*  PLAYER  */
    state.player = this.add.sprite(550,400, 'player', 3);
    state.player.angle = -20;

    /*  TITLE  */
    state.gameTitle = this.createText(175, 120, 'TIME TRAVEL AGENT', '100px');
    state.gameTitle.angle = -10;

    /*  START  */
    state.start = this.createText(420, 785, 'CLICK TO START', '70px').setInteractive();
    state.start.angle = -10;

    /*  TUTORIAL  */
    state.tutorial = this.createText(465, 855, 'How To Play', '70px').setInteractive();
    state.tutorial.angle = -10;

    state.credits = this.createText(565, 915, 'Credits', '40px').setInteractive();
    state.credits.angle = -10;

    /*  LISTENER FUNTIONS  */
    // START
    this.textHoverFeature(state.start);
    state.start.on('pointerdown', () => {
      this.scene.start('Level1');
    }, this);
    // TUTORIAL
    this.textHoverFeature(state.tutorial);
    state.tutorial.on('pointerdown', () => {
      this.scene.stop(this.level);
			this.scene.start(this.nextLevel[this.level]);
    });
    // CREDITS
    this.textHoverFeature(state.credits);
    state.credits.on('pointerdown', () => {
      this.scene.stop(this.level);
			this.scene.start(this.previousLevel[this.level]);
    });

    this.createAnimations();

    state.player.move = this.tweens.add({
      targets: state.player,
      y: state.player.y + 100,
      ease: 'Linear',
      duration: 1000,
      repeat: -1,
      yoyo: true
    })
    state.portal.anims.play('portal-grow').once('animationcomplete', () => {
      state.portal.anims.play('portal-open-forever');
    })
  }

  update() {

  }

}

export default StartScreen;