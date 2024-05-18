import Phaser from 'phaser'

export default class GameOverScene extends Phaser.Scene {
	constructor() {
		super('over-scene')
	}

    init(data){
        this.replayButton = undefined;
        this.score = data.score;
    }

    preload(){
        this.load.image('background', 'images/bg_layer1.png');
        this.load.image('replay-btn', 'images/replay.png');
    }

    create(){

        this.add.image(240, 320, 'background');
        this.add.image(240, 200, 'gameover');

        this.replayButton = this.add.image(240, 400, 'replay-btn')
        .setInteractive().setScale(0.5);

        this.replayButton.once('pointerup', ()=>{
            this.scene.start('game-start-scene');
        }, this);
    }
}