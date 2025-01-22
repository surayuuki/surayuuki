export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
        this.score = 0;
    }

    create() {
        console.log("🎮 Creating GameScene...");

        // **🔹 背景画像の追加（最背面に配置）**
        // **背景画像の追加（タイル化）**
        this.background = this.add.tileSprite(400, 300, 800, 600, "field");

        // update内でtilePositionを固定
        this.background.tilePositionX = 0;
        this.background.tilePositionY = 0;

        // **🔹 スコア表示**
        this.scoreText = this.add.text(10, 10, "Score: 0", { fontSize: "16px", fill: "#fff" });

        // **🔹 プレイヤー作成**
        this.player = this.physics.add.sprite(400, 300, "player", 0); // フレーム0を指定
        if (!this.player) {
            console.error("❌ Error: Player not created!");
            return;
        }
        this.player.setCollideWorldBounds(true);
        this.player.setAlpha(1);
        this.player.setVisible(true);
        console.log("✅ Player object:", this.player);

        // **🔹 敵キャラのグループ**
        this.enemies = this.physics.add.group();
        for (let i = 0; i < 5; i++) {
            let x, y;
            do {
                x = Phaser.Math.Between(50, 750);
                y = Phaser.Math.Between(50, 550);
            } while (Phaser.Math.Distance.Between(x, y, this.player.x, this.player.y) < 100);  

            let enemy = this.enemies.create(x, y, "enemy");
            enemy.setCollideWorldBounds(true);
            enemy.direction = Phaser.Math.Between(0, 3);
        }
        console.log("✅ Enemies created:", this.enemies.getChildren().length);

        // **🔹 剣の作成**
        this.sword = this.physics.add.sprite(this.player.x, this.player.y, "sword");
        this.sword.setSize(32, 32);
        this.sword.setVisible(false);
        this.sword.disableBody(true, true);

        // **🔹 プレイヤーと敵の衝突（ゲームオーバー）**
        this.physics.add.overlap(this.player, this.enemies, () => {
            console.warn("❌ Game Over! Player collided with enemy.");
            this.scene.start("GameOverScene");
        }, null, this);

        // **🔹 剣が敵に当たると敵を倒す**
        this.physics.add.overlap(this.sword, this.enemies, this.hitEnemy, null, this);

        // **🔹 入力処理**
        this.cursors = this.input.keyboard.createCursorKeys();
        this.attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // **🔹 敵のランダム移動**
        this.time.addEvent({
            delay: 3000,
            callback: this.changeEnemyDirection,
            callbackScope: this,
            loop: true
        });
    }

    update() {
        if (!this.player) return;

        let moving = false;

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play("walk_left", true);
            moving = true;
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play("walk_right", true);
            moving = true;
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160);
            this.player.anims.play("walk_up", true);
            moving = true;
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160);
            this.player.anims.play("walk_down", true);
            moving = true;
        }

        if (!moving) {
            this.player.setVelocity(0);
            this.player.anims.stop();
        }

        // **🔹 スペースキーで攻撃**
        if (Phaser.Input.Keyboard.JustDown(this.attackKey)) {
            this.attack();
        }

        // **🔹 敵の動作（ランダム移動 or 追尾）**
        this.enemies.children.iterate((enemy) => {
            let distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, enemy.x, enemy.y);

            if (distance < 150) {
                this.physics.moveToObject(enemy, this.player, 70);
            } else {
                switch (enemy.direction) {
                    case 0: enemy.setVelocityX(50); break;
                    case 1: enemy.setVelocityX(-50); break;
                    case 2: enemy.setVelocityY(50); break;
                    case 3: enemy.setVelocityY(-50); break;
                }
            }
        });
    }

    // **🔹 剣で敵を倒す**
    hitEnemy(sword, enemy) {
        enemy.setActive(false).setVisible(false);
        this.score += 10;
        this.scoreText.setText(`Score: ${this.score}`);

        if (this.score % 50 === 0) {
            this.levelUp();
        }
    }

    // **🔹 剣を振る処理**
    attack() {
        this.sword.enableBody(true, this.player.x, this.player.y, true, true);
        this.sword.setVisible(true);
        this.sword.setPosition(this.player.x, this.player.y);

        this.time.delayedCall(200, () => {
            this.sword.setVisible(false);
            this.sword.disableBody(true, true);
        });
    }

    // **🔹 敵のランダム移動方向を変更**
    changeEnemyDirection() {
        this.enemies.children.iterate((enemy) => {
            enemy.direction = Phaser.Math.Between(0, 3);
        });
    }

    // **🔹 レベルアップ処理**
    levelUp() {
        for (let i = 0; i < 3; i++) {
            let x = Phaser.Math.Between(50, 750);
            let y = Phaser.Math.Between(50, 550);
            let newEnemy = this.enemies.create(x, y, "enemy");
            newEnemy.setCollideWorldBounds(true);
            newEnemy.direction = Phaser.Math.Between(0, 3);
        }
    }
}
