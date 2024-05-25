import Phaser from 'phaser';
import FallingObject from '../ui/FallingObject';

export default class KeepMovinScene extends Phaser.Scene {

    constructor() {
        super('keep-movin-scene');
    }

    init() {
        this.player = undefined;

        this.score = 0;
        this.scoreLabel = undefined;

        this.startGame = false;

        this.countdown = undefined;

        this.cursor = undefined;

        this.enemies = undefined;
        this.enemySpeed = 50;


    }

    preload() {
        this.load.image('bg', 'images/background.png');
        this.load.image('platform', 'images/fulltile.png')

        this.load.image('enemy', 'images/enemy.png')

        this.load.spritesheet('player-standby', 'images/player-standby.png', {
            frameWidth: 25, frameHeight: 25.4
        });

        this.load.spritesheet('player-moving', 'images/player-moving.png', {
            frameWidth: 117, frameHeight: 26
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


        // this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.cursor = this.input.keyboard.createCursorKeys();

        this.scoreLabel = this.add.text(450, 10, 'Score: 0',
            {
                // @ts-ignore
                fill: 'white',
            })

        this.enemies = this.physics.add.group({
            classType: FallingObject,
            maxSize: 10,
            runChildUpdate: true
        });


        this.time.addEvent({
            delay: Phaser.Math.Between(1000, 5000),
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        })

    }

    createAnimation() {
        //player animation
        this.anims.create({
            key: 'player-standby',
            frames: this.anims.generateFrameNumbers('player-standby', { start: 0, end: 4 }),
            frameRate: 8,
        });

        this.anims.create({
            key: 'player-moving',
            frames: this.anims.generateFrameNumbers('player-moving', { start: 0, end: 7 }),
            frameRate: 10,
        });
    }

    gameStart() {

        this.startGame = true;
        this.player.anims.play('player-moving', true);


    }

    update(time) {

        this.countdown = this.time.addEvent({
            delay: 500,
            callback: this.addScore,
            callbackScope: this,
            loop: true
        });

        if (this.cursor.up.isDown) {
            // If the up arrow key is pressed, set the velocity to move the player up
            this.player.setVelocity(0, -300);
        } else {
            // If the up arrow key is not pressed, set the velocity to move the player down
            this.player.setVelocity(0, 100);
        }


        this.scoreLabel.setText('Score :' + this.score);

    }

    addScore() {

        this.score++;

    }

    spawnEnemy() {

        const config = {
            speed: this.enemySpeed,
            rotation: 0.1
        }

        // @ts-ignore
        const enemy = this.enemies.get(100, 100, 'enemy', config);
        const positionX = Phaser.Math.Between(50, 350);

        if (enemy) {
            enemy.spawn(positionX);
        }

    }

}
