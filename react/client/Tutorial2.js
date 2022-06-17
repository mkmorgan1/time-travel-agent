import Master from './Master.js';
import { createButton } from './buttons/controls'

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

    /*  ANIMATIONS AND CONTROLS  */
    this.createAnimations();
    state.cursors = this.input.keyboard.createCursorKeys();

    /*  COLLIDERS */
    this.physics.add.collider(state.player, state.ground);
    this.physics.add.collider(state.player, state.end, () => {
      state.portalOpen = false;
			this.scene.stop(this.level)
			this.scene.start(this.nextLevel[this.level])
		});

    state.pointer = this.input.activePointer;

		state.leftButton = createButton(this, [150, 1150], [200, 200], '<')
		state.leftButton.on('pointerdown', () => state.leftPressed = true)
		state.leftButton.on('pointerup', () => state.leftPressed = false)

		state.spaceBar = createButton(this, [550, 1150], [400, 200], 'Space')
		state.spaceBar.on('pointerdown', () => state.spacePressed = true)
		state.spaceBar.on('pointerup', () => state.spacePressed = false)

		state.rightButton = createButton(this, [950, 1150], [200, 200], '>')
		state.rightButton.on('pointerdown', () => state.rightPressed = true)
		state.rightButton.on('pointerup', () => state.rightPressed = false)
  }

  update() {
		if (!state.pause) {
			this.shootAnimation(state, state.player);
    	this.characterMovement(state, state.player);
			this.portalTravel(state.player, state);
		}
	}

}

export default Tutorial2;