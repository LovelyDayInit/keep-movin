import Phaser from 'phaser';

export default class GameStartScene extends Phaser.Scene {

    constructor() {
        super('game-start-scene');
    }

    init(data) {
        this.playButton = undefined;
    }

    preload() {
        this.load.image('bg', 'images/background.png');
        this.load.image('play-button', 'images/play.png');
    }

    create() {

        this.add.image(512, 320, 'bg');

        this.playButton = this.add.image(512, 125, 'play-button')
            .setInteractive().setScale(0.5);

        this.playButton.once('pointerup', () => {
            this.scene.start('keep-movin-scene');
        }, this);

    }

}
