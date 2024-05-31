import Phaser from 'phaser'

export default class GameOverScene extends Phaser.Scene {
	constructor() {
		super('game-over-scene')
	}

    init(data){
        this.replayButton = undefined;
        this.score = data.score;
    }

    preload(){
        this.load.image('bg', 'images/background.png');
        this.load.image('replay-btn', 'images/replay.png');
    }

    create(){

        this.add.image(240, 320, 'bg');
        this.add.text(420, 150, 'Score: ' + this.score, {
            fontSize: '32px',
            //@ts-ignore
            fill: 'white'
        });

        this.replayButton = this.add.image(500, 120, 'replay-btn')
        .setInteractive().setScale(0.5);

        this.replayButton.once('pointerup', ()=>{
            this.scene.start('keep-movin-scene');
        }, this);
    }
}

