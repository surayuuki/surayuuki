import PreloadScene from "./scenes/preload.js";
import GameScene from "./scenes/game.js";
import GameOverScene from "./scenes/gameover.js";

// 画面サイズ
const D_WIDTH = 800;
const D_HEIGHT = 600;

// Phaserの設定
const config = {
    type: Phaser.AUTO,
    width: D_WIDTH,
    height: D_HEIGHT,
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: { y: 0 }  // 重力なし（キャラが落ちないようにする）
        }
    },
    scene: [PreloadScene, GameScene, GameOverScene]
};

// ゲーム開始
let game = new Phaser.Game(config);
