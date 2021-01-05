import Level from './Level.js';

class Level1 extends Level {
	constructor() {
		super('Level1')
		this.baddyY = [800,300,800,300,800,800,800,300,800,300];
		this.levelName = 'LEVEL 1';
		this.baddyPath = 100;
	}
}

export default Level1;