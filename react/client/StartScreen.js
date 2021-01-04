// import Phaser from 'phaser';
import Master from './Master.js';
const state = {}

class StartScreen extends Master {
  constructor() {
    super('StartScreen')
  }

  create() {
    /*  PORTAL  */
    state.portal = this.physics.add.sprite(550, 525, 'portal').setScale(1.5);

    /*  PLAYER  */
    state.player = this.add.sprite(550,450, 'player', 3);
    state.player.angle = -20;

    /*  TITLE  */
    state.gameTitle = this.createText(205, 155, 'TIME TRAVEL AGENT', '100px');
    state.gameTitle.angle = -10;

    /*  START  */
    state.start = this.createText(405, 885, 'CLICK TO START', '74px').setInteractive();
    state.start.angle = -10;

    /*  LISTENER FUNTIONS  */
    this.textHoverFeature(state.start);
    state.start.on('pointerdown', () => {
      this.scene.start('Level1');
    }, this);

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