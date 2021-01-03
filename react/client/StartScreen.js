// import Phaser from 'phaser';
import Master from './Master.js';
const state = {}

class StartScreen extends Master {
  constructor() {
    super('StartScreen')
  }

  create() {

    state.graphics = this.add.graphics();
    // state.graphics.lineStyle(5, 0xFF00FF, 1.0);
    state.graphics.fillStyle(0xFFFFFF, 1.0);
    state.graphics.fillRect(50, 50, 400, 200);
    state.graphics.strokeRect(50, 50, 400, 200);

    state.portal = this.physics.add.sprite(550, 525, 'portal').setScale(1.5);
    state.player = this.add.sprite(550,450, 'player', 3);
    state.player.angle = -20;
    // createText(x, y, string, fontSize)
    state.gameTitle = this.createText(205, 155, 'TIME TRAVEL AGENT', '100px');

    state.clickToStart = this.createText(405, 885, 'CLICK TO START', '74px');

    state.gameTitle.angle = -10;
    state.clickToStart.angle = -10;


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
    // Phaser.Actions.Call(state.end.getChildren(), (end) => {
    //   end.angle = 90
    //   end.anims.play('end-grow').once('animationcomplete', () => {
    //     end.anims.play('end-open');
    //   });
    // });

    this.input.on('pointerdown', () => {
      this.scene.start('Level1');
    }, this);
  }

  update() {

  }

}

export default StartScreen;