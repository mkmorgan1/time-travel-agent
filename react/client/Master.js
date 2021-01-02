import Phaser from 'phaser';
class Master extends Phaser.Scene {
  constructor(level) {
		super(level)
		this.level = level;
		this.nextLevel = {
			'StartScreen': 'Level1',
			'Level1': 'Level2',
			'Level2': 'Level1',
		}
  }

	preload() {
		/*	BACKGROUNDS	*/
		this.load.image('city-1', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/city1.png');
		this.load.image('city-2', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/city2.png');
		this.load.image('trees-1', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/forest.png');
		this.load.image('trees-2', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/forest2.png');
		this.load.image('grass', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/grass.png');
		this.load.image('ground', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/ground.png');

		/*	SPRITES	*/
		this.load.spritesheet('player', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/player1.png', {frameWidth: 500, frameHeight: 500});
		this.load.spritesheet('portal', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/portal.png', {frameWidth: 500, frameHeight: 500});
		this.load.spritesheet('orb', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/orb.png', {frameWidth: 500, frameHeight: 500});
		this.load.spritesheet('baddy', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/badGuy.png', {frameWidth: 500, frameHeight: 500});
		this.load.spritesheet('end', 'https://time-travel-agent.s3.us-east-2.amazonaws.com/endPortal.png', {frameWidth: 125, frameHeight: 500});
  }

  createAnimations() {
		this.anims.create({
			key: 'portal-grow',
			frames: this.anims.generateFrameNumbers('portal', {start: 0, end: 19}),
			frameRate: 10,
			repeat: 0
		});
		this.anims.create({
			key: 'portal-open',
			frames: this.anims.generateFrameNumbers('portal', {start: 16, end: 19}),
			frameRate: 10,
			repeat: 0
		})
		this.anims.create({
			key: 'portal-return',
			frames: this.anims.generateFrameNumbers('portal', {start: 0, end: 8}),
			frameRate: 10,
			isReversed: true,
			repeat: 0
		})
		this.anims.create({
			key: 'orb-rotate',
			frames: this.anims.generateFrameNumbers('orb', {start: 0, end: 3}),
			frameRate: 40,
			repeat: -1
		})
		this.anims.create({
			key: 'run',
			frames: this.anims.generateFrameNumbers('player', {start: 1, end: 8}),
			frameRate: 25,
			repeat: 0
		})
		this.anims.create({
			key: 'shoot',
			frames: this.anims.generateFrameNumbers('player', {start: 13, end: 22}),
			frameRate: 20,
			repeat: 0
		})
		this.anims.create({
			key: 'idle',
			frames: this.anims.generateFrameNumbers('player', {start: 10, end: 12}),
			frameRate: 5,
			repeat: 0
		})
		this.anims.create({
			key: 'baddy-movement',
			frames: this.anims.generateFrameNumbers('baddy', {start: 0, end: 9}),
			frameRate: 20,
			repeat: -1
		})
		this.anims.create({
			key: 'end-grow',
			frames: this.anims.generateFrameNumbers('end', {start: 0, end: 18}),
			frameRate: 10,
			repeat: 0
		})
		this.anims.create({
			key: 'end-open',
			frames: this.anims.generateFrameNumbers('end', {start: 16, end: 18}),
			frameRate: 10,
			repeat: -1
		})
	}
}

export default Master;