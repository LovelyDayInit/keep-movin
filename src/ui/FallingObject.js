import Phaser from 'phaser';

export default class FallingObject extends Phaser.Physics.Arcade.Sprite {

    /**
     * Constructor for FallingObject.
     * @param {Phaser.Scene} scene - The scene to which this object belongs.
     * @param {number} x - The initial x position of the object.
     * @param {number} y - The initial y position of the object.
     * @param {string} texture - The texture key for the object's sprite.
     * @param {object} config - Configuration object containing speed and rotation values.
     * @param {number} config.speed - The speed at which the object moves horizontally.
     * @param {number} config.rotation - The rotation increment for each update.
     */
    constructor(scene, x, y, texture, config) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.speed = config.speed;
        this.rotationVal = -config.rotation;

        // Add the sprite to the scene's physics system
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }

    /**
     * Spawns the object at a given y position at the right edge of the screen.
     * @param {number} positionY - The y position where the object should spawn.
     */
    spawn(positionY) {
        const gameWidth = this.scene.scale.width;
        this.setPosition(gameWidth + 10, positionY);
        this.setActive(true);
        this.setVisible(true);
        //@ts-ignore
        this.body.setVelocityX(-this.speed);
    }

    /**
     * Destroys the object and removes it from the scene.
     */
    die() {
        this.destroy();
    }

    /**
     * Updates the object's position and rotation. Destroys the object if it goes off screen.
     * @param {number} time - The current time.
     * @param {number} delta - The time elapsed since the last update.
     */
    update(time, delta) {
        // Rotate the object
        this.rotation += this.rotationVal;

        // Check if the object has moved beyond the left edge of the screen
        if (this.x < -5) {
            this.die();
        }
    }

 
}
