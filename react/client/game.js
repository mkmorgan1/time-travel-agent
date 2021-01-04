import Phaser from 'phaser';
import Master from './Master.js';
import StartScreen from './StartScreen';
import Tutorial1 from './Tutorial1.js';
import Tutorial2 from './Tutorial2.js';
import Level from './Level.js';
import Level1 from './Level1.js';
import Level2 from './Level2.js';

const config = {
  type: Phaser.CANVAS, //AUTO
  width: 1100,
  height: 1000,
  backgroundColor: "b9eaff",
  physics: {
    default: 'arcade',
    arcade: {
      enableBody: true,
      // debug: true
    }
  },
  scene: [StartScreen, Tutorial1, Tutorial2, Level1, Level2]
};

const game = new Phaser.Game(config);

export default game;
