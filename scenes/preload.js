export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        console.log("🔹 Preloading assets...");

        // 画像の読み込み
        this.load.image("floor", "assets/floor.png");
        this.load.image("wall", "assets/wall.png");

        // 🔹 画像のロードが成功したか確認
        this.load.on("filecomplete", (key) => {
            console.log(`✅ ${key} loaded!`);
        });
    }

    create() {
        console.log("✅ All assets loaded!");
        this.scene.start("GameScene");
    }
}
