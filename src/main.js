import Phaser from 'phaser';
import KeepMovinScene from './scenes/KeepMovinScene';

const config = {
    type: Phaser.AUTO,
    parent: 'app',
    width: 1025,
    height: 250,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: true,
        },
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH 
    },
    scene: [KeepMovinScene],
}

export default new Phaser.Game(config)
