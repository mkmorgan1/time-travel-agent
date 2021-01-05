import Level from './Level.js';

class Level3 extends Level {
	constructor() {
		super('Level3')
		this.baddyY = [800,300,800,300,800,800,800,300,800,300];
    this.levelName = 'LEVEL 3';
    this.baddyPath = 300;
	}
}

export default Level3;