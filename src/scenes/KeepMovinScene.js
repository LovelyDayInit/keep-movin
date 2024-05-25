import Phaser from 'phaser';

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


    }

    preload() {
        this.load.image('bg', 'images/background.png');
        this.load.image('platform', 'images/fulltile.png')

        this.load.spritesheet('player-standby', 'images/player-standby.png', {
            frameWidth: 25, frameHeight: 25.4
        });

        this.load.spritesheet('player-moving', 'images/player-moving.png', {
            frameWidth: 117, frameHeight: 26
        });

        this.load.spritesheet('saw', 'images/saw.png', {
            frameWidth: 38, frameHeight: 38
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

        this.saw = this.physics.add.sprite(
            1025,
            150,
            'saw'
        );

        this.createAnimation();

        this.player.anims.play('player-standby', true);
        this.physics.add.collider(this.player, platform1);
        this.physics.add.collider(this.player, platform2);

        this.saw.anims.play('saw', true);
        this.physics.add.collider(this.saw, platform1);
        this.physics.add.collider(this.saw, platform2);

        // this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.cursor = this.input.keyboard.createCursorKeys();

        this.scoreLabel = this.add.text(450, 10, 'Score: 0',
            {
                // @ts-ignore
                fill: 'white',
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

        this.anims.create({
            key: 'saw',
            frames: this.anims.generateFrameNumbers('saw', { start: 0, end: 7 }),
            frameRate: 50,
            repeat: -1,
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
            this.player.setVelocity(0, -200);
         }

         this.scoreLabel.setText('Score :' + this.score);

    }

    addScore() {

        this.score++;

    }





}
