// アセットの読み込み
export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("player", "assets/player.png");
        this.load.image("enemy", "assets/enemy.png");
        console.log("Assets Loaded!");
    }

    create() {
        this.scene.start("GameScene");
    }
}
