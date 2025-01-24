import PreloadScene from "./scenes/preload.js";
import GameScene from "./scenes/game.js";
import GameOverScene from "./scenes/gameover.js";

// Phaserの設定
const config = {
    type: Phaser.AUTO,  // 🔹 WebGL or Canvas を自動選択
    width: 800,  // 🔹 固定サイズ
    height: 600,
    parent: "game-container",  // 🔹 ゲームキャンバスの親要素
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    },
    scene: [PreloadScene, GameScene, GameOverScene],
    scale: {
        mode: Phaser.Scale.NONE,  // 🔹 サイズ固定で拡大縮小しない
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

// ゲーム開始
let game = new Phaser.Game(config);
