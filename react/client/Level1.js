import Level from './Level.js';
// const Phaser = require('phaser');
class Level1 extends Level {
	constructor() {
		super('Level1')
		this.baddyY = [800,800,800,800,800,800,800,800,800,800];
		this.levelName = 'LEVEL 1';
	}
}

export default Level1;