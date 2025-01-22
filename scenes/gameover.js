export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameOverScene" });
    }

    create() {
        this.add.text(300, 250, "Game Over", { fontSize: "32px", fill: "#FFF" });
        this.input.on("pointerdown", () => this.scene.start("GameScene"));
    }
}
