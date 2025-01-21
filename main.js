import PreloadScene from "./scenes/preload.js";
import GameScene from "./scenes/game.js";
import GameOverScene from "./scenes/gameover.js";

// 画面サイズ
const D_WIDTH = 480;
const D_HEIGHT = 320;

// Phaser3の設定
const config = {
    type: Phaser.AUTO,
    width: D_WIDTH,
    height: D_HEIGHT,
    antialias: false,
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: { y: 300 }
        }
    },
    scene: [PreloadScene, GameScene, GameOverScene]
};

// Phaserゲームの作成
let game = new Phaser.Game(config);
