// メインゲームロジック
export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
    }

    create() {
        // プレイヤーの作成
        this.player = this.physics.add.sprite(100, 200, "player");
        this.player.setCollideWorldBounds(true);

        // 敵キャラの作成
        this.enemy = this.physics.add.sprite(300, 200, "enemy");
        this.enemy.setCollideWorldBounds(true);

        // 簡単な入力処理
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        } else {
            this.player.setVelocityX(0);
        }
    }
}
