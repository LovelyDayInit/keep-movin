import Phaser from 'phaser';
import KeepMovinScene from './scenes/KeepMovinScene';
import GameOverScene from './scenes/GameOverScene';
import GameStartScene from './scenes/GameStartScene';

const config = {
    type: Phaser.AUTO,
    parent: 'app',
    width: 1025,
    height: 250,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true,
        },
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [GameStartScene, KeepMovinScene, GameOverScene],
}

export default new Phaser.Game(config)
