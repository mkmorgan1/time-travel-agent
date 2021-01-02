import Level from './Level.js';
// const Phaser = require('phaser');
class Level2 extends Level {
	constructor() {
		super('Level2')
		this.baddyY = [800,300,800,300,800,300,800,800,300,800];
		this.levelName = 'LEVEL 2'
	}
}

export default Level2;