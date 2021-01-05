import Level from './Level.js';

class Level4 extends Level {
	constructor() {
		super('Level4')
		this.baddyY = [800,300,800,300,800,300,800,300,800,800];
    this.levelName = 'LEVEL 4';
    this.baddyPath = 400;
	}
}

export default Level4;