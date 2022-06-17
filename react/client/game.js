import Phaser from 'phaser';
import Master from './Master.js';
import StartScreen from './StartScreen';
import Tutorial1 from './Tutorial1.js';
import Tutorial2 from './Tutorial2.js';
import Tutorial3 from './Tutorial3.js';
import Level from './Level.js';
import Level1 from './Level1.js';
import Level2 from './Level2.js';
import Level3 from './Level3.js';
import Level4 from './Level4.js';
import Credits from './Credits.js';


const config = {
  type: Phaser.CANVAS,
  width: 1100,
  height: 1300,
  backgroundColor: 'b9eaff',
  parent: 'phaser-game',
  physics: {
    default: 'arcade',
    arcade: {
      enableBody: true,
    }
  },
  scene: [StartScreen, Tutorial1, Tutorial2, Tutorial3, Level1, Level2, Level3, Level4, Credits]
};

const game = new Phaser.Game(config);

export default game;
