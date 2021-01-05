// import Phaser from 'phaser';
import Master from './Master.js';
const state = {}

class StartScreen extends Master {
  constructor() {
    super('StartScreen')
  }

  create() {
    /*  PORTAL  */
    state.portal = this.physics.add.sprite(550, 475, 'portal').setScale(1.5);

    /*  PLAYER  */
    state.player = this.add.sprite(550,400, 'player', 3);
    state.player.angle = -20;

    /*  TITLE  */
    state.gameTitle = this.createText(205, 110, 'TIME TRAVEL AGENT', '100px');
    state.gameTitle.angle = -10;

    /*  START  */
    state.start = this.createText(405, 800, 'CLICK TO START', '74px').setInteractive();
    state.start.angle = -10;

    /*  TUTORIAL  */
    state.tutorial = this.createText(450, 885, 'How To Play', '74px').setInteractive();
    state.tutorial.angle = -10;

    /*  LISTENER FUNTIONS  */
    this.textHoverFeature(state.start);
    state.start.on('pointerdown', () => {
      this.scene.start('Level1');
    }, this);

    this.textHoverFeature(state.tutorial);
    state.tutorial.on('pointerdown', () => {
      this.scene.stop(this.level);
			this.scene.start(this.nextLevel[this.level]);
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
    // this.input.on('pointerdown', () => {
    //   this.scene.start('Level1');
    // }, this);
  }

  update() {

  }

}

export default StartScreen;