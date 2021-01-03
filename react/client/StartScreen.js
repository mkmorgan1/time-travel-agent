// import Phaser from 'phaser';
import Master from './Master.js';
const state = {}

class StartScreen extends Master {
  constructor() {
    super('StartScreen')
  }

  create() {
    // state.end = this.physics.add.group();
    // state.end.create(550, 50, 'end').setScale(2);
    // state.end.create(550, 950, 'end').setScale(2);
    state.portal = this.physics.add.sprite(550, 500, 'portal').setScale(2);
    state.player = this.add.sprite(550,450, 'player', 3);
    state.player.angle = -20;

    state.gameTitleWhite = this.add.text(205, 155, `TIME TRAVEL AGENT`, {font: `100px 'Staatliches', cursive`,fill: '#FAEFF1'}).setOrigin(0,0);
    state.gameTitlePink = this.add.text(200, 150, `TIME TRAVEL AGENT`, {font: `100px 'Staatliches', cursive`,fill: '#ffa0d0'}).setOrigin(0,0);

    state.clickWhite = this.add.text(405, 885, `CLICK TO START`, {font: `74px 'Staatliches', cursive`,fill: '#FAEFF1'}).setOrigin(0,0);
    state.clickPink = this.add.text(400, 880, `CLICK TO START`, {font: `75px 'Staatliches', cursive`,fill: '#ffa0d0'}).setOrigin(0,0);

    state.clickWhite.angle = -10;
    state.clickPink.angle = -10;
    state.gameTitleWhite.angle = -10;
    state.gameTitlePink.angle = -10;


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