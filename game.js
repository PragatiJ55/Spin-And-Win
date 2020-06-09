
var a = 0, b = 50;
var arr = ["CB Book", "CB T-shirt", "2 Extra spin", "Amazon voucher", "50% off", "Netflix subs", "100% off", "CB Swagpack", "70% off", "Hard Luck", "35% off", "3000 CB credits"];
let config = {
    width: 800,
    height: 500,
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
}

let game = new Phaser.Game(config)

function preload() {
    this.load.image('background', "Assets/background.jpg");
    this.load.image('title', "Assets/spin-n-win-logo.png")
    this.load.image('wheel', "Assets/wheel.png");
    this.load.image('pin', "Assets/pin.png");
    this.load.image('stand', "Assets/stand.png");
    this.load.image('button', "Assets/button-4.png");
    this.load.image('button-win', "Assets/button-restart1.png");
    this.load.image('card', "Assets/card.png");
    this.load.audio('sfx', "Assets/audio3.mp3");

}
let W, H;
function create() {
    W = game.config.width;
    H = game.config.height;

    this.sound = this.sound.add('sfx');
    this.add.sprite(W / 2, H / 2, 'background').setScale(0.25);
    this.title = this.add.sprite(W / 2 - 50, 50, 'title').setScale(0.10);
    this.add.sprite(W / 2 + 180, H / 2 + 100, 'stand').setScale(0.20);


    this.wheel = this.add.sprite(W / 2 + 180, H / 2-40, 'wheel');
    this.wheel.setScale(0.13);

    this.button = this.add.sprite(160, H / 2 + 20, 'button');


    this.button.setInteractive({ useHandCursor: true });


    this.add.sprite(W / 2 + 178, H / 2 - 180, 'pin').setScale(0.16);

    this.button.on('pointerover', enterButtonHoverState, this);
    this.button.on('pointerout', enterButtonRestState, this);
    this.button.on('pointerdown', spinwheel, this);

}
function enterButtonHoverState() {
    this.button.useHandCursor = true;
}
function enterButtonRestState() { this.button.useHandCursor = false; }
function update() {

    if (a != 50) {
        this.title.x += 1;
        a++;
    }
    else if (b != 0) {
        this.title.x -= 1;
        b--;
    }
    else {
        a = 0;
        b = 50;
    }

}
function spinwheel() {
    this.sound.play();
    this.button.off('pointerdown');
    console.log("Clicked");
    let rounds = Phaser.Math.Between(3, 5);
    console.log(rounds);
    c = 0;
    let extra_degrees = Phaser.Math.Between(0, 11) * 30;
    let total_angle = rounds * 360 + extra_degrees;
    let slot = extra_degrees / 30;
    console.log(slot);
    //console.log(this);
    this.tween = this.tweens.add({
        targets: this.wheel,
        angle: total_angle,
        ease: "Cubic.easeInOut",
        duration: 5000,
        onComplete: () => {
            this.sound.stop();
            this.button.on('pointerdown', spinwheel, this);
            this.card = this.add.sprite(W / 2, H / 2, 'card')
            this.button_win = this.add.sprite(W / 2, H / 2 + 50, 'button-win');
            this.button_win.setInteractive({ useHandCursor: true });
            if (arr[slot] == "Hard Luck") {
                this.txt = this.add.text(W / 2 - 62, H / 2, arr[slot] + "!", {
                    font: "21px arial",
                    fill: "#000000",
                    fontWeight: 'bold',
                });
            }
            else {
                this.txt = this.add.text(W / 2 - 82, H / 2, 'You won ' + arr[slot], {
                    font: "21px arial",
                    fill: "#000000",
                    fontWeight: 'bold',
                });
            }
            this.button_win.on('pointerover', enterButtonWinHoverState, this);
            this.button_win.on('pointerout', enterButtonWinRestState, this);
            this.button_win.on('pointerdown', destroyed, this);

        }
    });
}
function enterButtonWinHoverState() {
    this.button_win.useHandCursor = true;
}
function enterButtonWinRestState() { this.button_win.useHandCursor = false; }
function destroyed() {
    this.card.destroy();
    this.button_win.destroy();
    this.txt.destroy();
}
