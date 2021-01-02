// import Phaser from 'phaser';
import Master from './Master.js';
const state = {}

class StartScreen extends Master {
  constructor() {
    super('StartScreen')
  }

  create() {
    state.player = this.physics.add.sprite(550,500, 'player')
    this.physics.add.group();
    this.input.on('pointerdown', () => {
      // this.scene.stop();

      this.scene.start('Level1');

    }, this);
  }

  update() {

  }

}

export default StartScreen;