import Master from './Master.js';
const state = {};

class  Credits extends Master {
  constructor() {
    super('Credits')
  }
  create() {
    /*  PORTAL  */
    this.add.rectangle(800,500,600,1000, 0x0CE6FF);
    state.portal = this.physics.add.sprite(250, 575, 'portal').setScale(1.5);

    /*  PLAYER  */
    state.player = this.createGravityPlayer(250,550)//
    state.player.body.setGravityY(0);
    // state.player = this.physics.add.sprite(250,550, 'player', 3);
    // state.player.angle = -10;

    /*  TITLE  */
    state.gameTitle = this.createText(55, 110, 'CREDITS', '100px');
    state.gameTitle.angle = -10;

    this.createAnimations();

    state.player.move = this.tweens.add({
      targets: state.player,
      scale:1,
      // x: state.player.x,
      ease: 'Linear',
      duration: 800,
      repeat: -1,
      yoyo: true,
      onRepeat: () => {
        if (state.player.angle % 20 === 0) {
          state.player.flipX = !state.player.flipX;
        }
      }
    });

    state.credits = this.createText(550, 100, 'GAME ENGINE:\n   PHASER.js\n\nART & ANIMATIONS:\n   MATTHEW MORGAN\n\nCONCEPT & DESIGN:\n   MATTHEW MORGAN\n\nPROGRAMING:\n   MATTHEW MORGAN', '75px');

    state.credits.setInteractive().on('pointerup', () => {
      window.open('https://github.com/mkmorgan1', '_blank');
    })


    state.player.anims.play('dance');

    state.portal.anims.play('portal-grow').once('animationcomplete', () => {
      state.portal.anims.play('portal-open-forever');
    })

    state.backText = this.createText(50, 900, '< Main Menue', '75px', 5).setInteractive();
    this.textHoverFeature(state.backText);
    state.backText.on('pointerdown', () => {
      this.scene.start('StartScreen');
    }, this);
  }
  update() {
    state.player.angle += 1;
  }
}


export default Credits;
