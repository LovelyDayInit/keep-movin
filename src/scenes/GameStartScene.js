import Phaser from 'phaser';

export default class GameStartScene extends Phaser.Scene {

    constructor() {
        super('game-start-scene');
    }

    init(data) {
        this.player = undefined;
        this.playButton = undefined;
    }

    preload() {
        this.load.image('bg', 'images/background.png');
        this.load.image('play-button', 'images/play.png');

        this.load.image('platform', 'images/fulltile.png')

        this.load.spritesheet('player-standby', 'images/player-standby.png', {
            frameWidth: 25, frameHeight: 25.4
        });
    }

    create() {

        this.add.image(512, 320, 'bg');

        const platform1 = this.physics.add.staticImage(500, 200, 'platform');
        const platform2 = this.physics.add.staticImage(500, 50, 'platform');


        this.player = this.physics.add.sprite(
            100,
            170,
            'player-standby'
        );

        this.createAnimation();

        this.player.anims.play('player-standby', true);
        this.physics.add.collider(this.player, platform1);
        this.physics.add.collider(this.player, platform2);

        this.playButton = this.add.image(512, 125, 'play-button')
            .setInteractive().setScale(0.5);

        this.playButton.once('pointerup', () => {
            this.scene.start('keep-movin-scene');
        }, this);
        

    }

    createAnimation() {
        //player animation
        this.anims.create({
            key: 'player-standby',
            frames: this.anims.generateFrameNumbers('player-standby', { start: 0, end: 4 }),
            frameRate: 8,
        });
    }

}
