import Phaser from 'phaser';
import FallingObject from '../ui/FallingObject';

export default class KeepMovinScene extends Phaser.Scene {

    constructor() {
        super('keep-movin-scene');
    }

    init() {

        this.player = undefined;
        this.life = 1;

        this.score = 0;
        this.scoreLabel = undefined;

        this.startGame = false;

        this.countdown = undefined;

        this.cursor = undefined;

        this.enemies = undefined;
        this.enemySpeed = 450;

        this.backsound = undefined;

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

        this.load.audio('bg-intro', 'sfx/BossIntro.wav');
        this.load.audio('bg-music', 'sfx/BossMain.wav');
        this.load.audio('jumpsfx', 'sfx/jump.ogg');
        this.load.audio('explode', 'sfx/8bit_bomb_explosion.wav');
        this.load.audio('ambience', 'sfx/wind1.wav');

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

        this.cursor = this.input.keyboard.createCursorKeys();

        this.scoreLabel = this.add.text(450, 10, 'Score: 0',
            {
                // @ts-ignore
                fill: 'white',
            });

        this.enemies = this.physics.add.group({
            classType: FallingObject,
            maxSize: 10,
            runChildUpdate: true
        });

        this.physics.add.collider(this.player, this.enemies, this.death, null, this);

        this.time.addEvent({
            delay: Phaser.Math.Between(200, 700),
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        });

        this.backsound = this.sound.add('bg-music');
        var soundConfig = {
            loop: true,
            volume: 1,
        };
        this.backsound.play(soundConfig);

        this.backsound = this.sound.add('ambience');
        var soundConfig = {
            loop: true,
            volume: 2.5,
        };
        this.backsound.play(soundConfig)

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
            this.sound.play('jumpsfx')
            this.player.setVelocity(0, -1500);
        }

        if (this.cursor.down.isDown) {
            // If the down arrow key is pressed, set the velocity to move the player up
            this.sound.play('jumpsfx')
            this.player.setVelocity(0, 1500);
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
        const positionX = Phaser.Math.Between(50, 190);

        if (enemy) {
            enemy.spawn(positionX);
        }

    }

    death(player, enemy) {
        this.life--;
        if (this.life <= 0) {
            this.sound.stopAll();
            this.sound.play('explode');
            this.scene.start('game-over-scene', { score: this.score });
        }
    }

}
