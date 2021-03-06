import Master from './Master.js';

const state = {};
class Tutorial2 extends Master {
  constructor() {
    super('Tutorial2')
    this.baddyY = [300,300,300,300,300,300,300,300,300,300];
  }

  create() {
    this.createBackground(state);
    state.player = this.createGravityPlayer(500, 300);

    /*  PORTAL TEXT  */
    this.createTextAndShadowedBackground('header', 40, 50, ' Portal to the past to reach the end', '75px', state);


    /*  BACK TEXT  */
    state.backText = this.createText(50, 900, '< Back', '75px', 5).setInteractive();
    this.textHoverFeature(state.backText);
    state.backText.on('pointerdown', () => {
      state.portalOpen = false;
      this.scene.stop(this.level);
			this.scene.start(this.previousLevel[this.level]);
    });

    /*	END PORTAL	*/
		state.endOpen = false;
    state.end = this.physics.add.sprite(1100, 750, 'end').setScale(1.5);
    state.end.body.setSize(100,400);
    state.end.body.setOffset(0,100);
    state.end.anims.play('end-grow').once('animationcomplete', () => {
      state.end.anims.play('end-open');
    });

    /*  ANIMATIONS AND CONTROLES  */
    this.createAnimations();
    state.cursors = this.input.keyboard.createCursorKeys();

    /*  COLLIDERS */
    this.physics.add.collider(state.player, state.ground);
    this.physics.add.collider(state.player, state.end, () => {
      state.portalOpen = false;
			this.scene.stop(this.level)
			this.scene.start(this.nextLevel[this.level])
		});
  }

  update() {
		if (!state.pause) {
			this.shootAnimation(state.player, state);
    	this.characterMovement(state.player, state);
			this.portalTravel(state.player, state);
		}
	}

}

export default Tutorial2;