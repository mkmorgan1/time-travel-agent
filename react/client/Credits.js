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

    /*  TITLE  */
    state.gameTitle = this.createText(55, 110, 'CREDITS', '100px');
    state.gameTitle.angle = -10;

    /*  CREDITS  */
    state.nameX = 600;
    state.titleX = 550;
    state.matthewMorgan = this.add.group();
    state.creditTitle = this.add.group();
    state.creditTitle.add(this.createText(state.titleX, 100, 'GAME ENGINE:', '75px'));
    state.phaserText = this.createText(state.nameX, 175, 'PHASER.IO ', '75px');
    state.creditTitle.add(this.createText(state.titleX, 300, 'ART & ANIMATION:', '75px'));
    state.matthewMorgan.add(this.createText(state.nameX, 375, 'Matthew Morgan', '75px'));
    state.creditTitle.add(this.createText(state.titleX, 500, 'CONCEPT & DESIGN:', '75px'));
    state.matthewMorgan.add(this.createText(state.nameX, 575, 'Matthew Morgan', '75px'));
    state.creditTitle.add(this.createText(state.titleX, 700, 'PROGRAMING:', '75px'));
    state.matthewMorgan.add(this.createText(state.nameX, 775, 'Matthew Morgan', '75px'));

    /*  HOVER AND LINKS  */
    Phaser.Actions.Call(state.matthewMorgan.getChildren(), (matt) => {
      matt.setInteractive().on('pointerup', () => {
        window.open('https://github.com/mkmorgan1', '_blank');
      });
      this.textHoverFeature(matt);
    })
    state.phaserText.setInteractive().on('pointerup', () => {
      window.open('https://phaser.io/phaser3', '_blank');
    })
    this.textHoverFeature(state.phaserText);

    /*  ANIMATIONS  */
    this.createAnimations();

    state.player.move = this.tweens.add({
      targets: state.player,
      scale:1,
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
    state.player.anims.play('dance');
    state.portal.anims.play('portal-grow').once('animationcomplete', () => {
      state.portal.anims.play('portal-open-forever');
    })

    /*  MAIN MENUES  */
    state.backText = this.createText(50, 900, '< Main Menu', '75px', 5).setInteractive();
    this.textHoverFeature(state.backText);
    state.backText.on('pointerdown', () => {
      this.scene.stop(this.level)
			this.scene.start(this.nextLevel[this.level])
		});
  }

  update() {
    state.player.angle += 1;
  }
}


export default Credits;
