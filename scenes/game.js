export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
    }

    create() {
        console.log("🎮 Creating GameScene...");

        // 🔹 画像がロードされているかチェック
        if (!this.textures.exists("floor") || !this.textures.exists("wall")) {
            console.error("❌ Error: floor or wall image not loaded!");
            return;
        }

        this.tileSize = 32;
        this.rows = 18;
        this.cols = 25;

        // カメラ設定
        this.cameras.main.setBounds(0, 0, this.cols * this.tileSize, this.rows * this.tileSize);
        this.cameras.main.setScroll((this.cols * this.tileSize - 800) / 2, (this.rows * this.tileSize - 600) / 2);
        this.cameras.main.roundPixels = true;

        this.map = this.generateDungeon();
        this.renderDungeon();
    }

    generateDungeon() {
        let map = [];
        for (let y = 0; y < this.rows; y++) {
            let row = [];
            for (let x = 0; x < this.cols; x++) {
                row.push(0);
            }
            map.push(row);
        }

        for (let i = 0; i < 3; i++) {
            let roomX = Phaser.Math.Between(3, this.cols - 10);
            let roomY = Phaser.Math.Between(3, this.rows - 10);
            let roomWidth = Phaser.Math.Between(5, 8);
            let roomHeight = Phaser.Math.Between(4, 6);

            for (let y = roomY; y < roomY + roomHeight; y++) {
                for (let x = roomX; x < roomX + roomWidth; x++) {
                    if (x > 0 && x < this.cols - 1 && y > 0 && y < this.rows - 1) {
                        map[y][x] = 1;
                    }
                }
            }
        }
        return map;
    }

    renderDungeon() {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let posX = x * this.tileSize;
                let posY = y * this.tileSize;

                if (this.map[y][x] === 1) {
                    this.add.image(posX, posY, "floor").setOrigin(0);
                } else {
                    this.add.image(posX, posY, "wall").setOrigin(0);
                }
            }
        }
    }
}
