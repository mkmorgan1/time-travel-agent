import Level from './Level.js';

class Level2 extends Level {
	constructor() {
		super('Level2')
		this.baddyY = [800,300,800,300,800,300,800,800,300,800];
		this.levelName = 'LEVEL 2'
		this.baddyPath = 200;
	}
}

export default Level2;
