//const Phaser = require('phaser');

const gameState = {
  score: 0
};


const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 1000,
  backgroundColor: "b9eaff",
  physics: {
    default: 'arcade',
    arcade: {
      //gravity: {y: 300},
      enableBody: true,
      debug: true
    }
  },
  scene: [StartScene, Scene2, Scene3]
};

const game = new Phaser.Game(config);
