import Phaser from 'phaser';

export default class KeepMovinScene extends Phaser.Scene {

    constructor() {
        super('keep-movin-scene');
    }

    init() {
        this.player = undefined;

        this.score = 0;
        this.scoreLabel = undefined;



    }

    preload() {
        this.load.image('bg', 'images/background.png');
        this.load.image('platform', 'images/tile.png')

        this.load.spritesheet('player-standby', 'images/player-standby.png', {
            frameWidth: 117, frameHeight: 26
        });

        this.load.spritesheet('player-moving', 'images/player-moving.png', {
            frameWidth: 117, frameHeight: 26
        });
    }

    create() {
        this.add.image(512, 320, 'bg');
        const platform = this.physics.add.staticImage(75, 200, 'platform');

        this.player = this.physics.add.sprite(
            100,
            100,
            'player-standby'
        );

        this.createAnimation();

        this.physics.add.collider(this.player, platform);

        this.scoreLabel = this.add.text(450, 10, 'Score: 0',
            {
                fill: 'white', 
            })

    }

    createAnimation() {
        //player animation
        this.anims.create({
            key: 'player-standby',
            frames: this.anims.generateFrameNumbers('player-standby', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'player-moving',
            frames: this.anims.generateFrameNumbers('player-moving', { start: 0, end: 7 }),
            frameRate: 10,
        });
    }

    gameStart() {

        this.startGame = true;
        this.player.anims.play('player-standby', true);


    }



}
