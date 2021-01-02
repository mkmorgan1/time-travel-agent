import Phaser from 'phaser';
import Level from './Level.js';
import Level1 from './Level1.js';
import Level2 from './Level2.js';

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 1000,
  backgroundColor: "b9eaff",
  physics: {
    default: 'arcade',
    arcade: {
      enableBody: true,
      // debug: true
    }
  },
  scene: [Level1, Level2]
};

const game = new Phaser.Game(config);

export default game;
