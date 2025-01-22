export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        console.log("🔹 Preloading assets...");

        // **アセットのロード**
        this.load.image("field", "assets/field.png");  // 🔹 背景画像を追加
        this.load.spritesheet("player", "assets/player.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("enemy", "assets/enemy.png", { frameWidth: 32, frameHeight: 32 });
        this.load.image("sword", "assets/sword.png");

        // **デバッグ用ログ**
        this.load.on("complete", () => {
            console.log("✅ All assets loaded!");
            console.log("Field loaded:", this.textures.exists("field"));
            console.log("Player loaded:", this.textures.exists("player"));
            console.log("Enemy loaded:", this.textures.exists("enemy"));
            console.log("Sword loaded:", this.textures.exists("sword"));
        });
    }

    create() {
        console.log("🎮 Creating animations...");

        // **アニメーション作成**
        if (!this.anims.exists("walk_down")) {
            this.anims.create({
                key: "walk_down",
                frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            });
        }

        if (!this.anims.exists("walk_left")) {
            this.anims.create({
                key: "walk_left",
                frames: this.anims.generateFrameNumbers("player", { start: 4, end: 7 }),
                frameRate: 10,
                repeat: -1
            });
        }

        if (!this.anims.exists("walk_right")) {
            this.anims.create({
                key: "walk_right",
                frames: this.anims.generateFrameNumbers("player", { start: 8, end: 11 }),
                frameRate: 10,
                repeat: -1
            });
        }

        if (!this.anims.exists("walk_up")) {
            this.anims.create({
                key: "walk_up",
                frames: this.anims.generateFrameNumbers("player", { start: 12, end: 15 }),
                frameRate: 10,
                repeat: -1
            });
        }

        // **敵のアニメーション**
        if (!this.anims.exists("enemy_idle")) {
            this.anims.create({
                key: "enemy_idle",
                frames: this.anims.generateFrameNumbers("enemy", { start: 0, end: 1 }),
                frameRate: 5,
                repeat: -1
            });
        }

        console.log("✅ Animations Created!");

        // **GameScene に移動**
        console.log("🚀 Starting GameScene...");
        this.scene.start("GameScene");
    }
}
