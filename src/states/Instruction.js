export default class extends Phaser.State {
  create () {
    let base = game.add.image(game.world.centerX, game.world.centerY, 'instruction')
    base.anchor.setTo(0.5)
    base.inputEnabled = true
    base.events.onInputUp.add(this.startGame, this)
  }

  startGame() {
    if (!game.device.desktop) {
      goFull()
    }
    this.state.start('LogoSplash')
  }
}

function goFull() {
 if (game.scale.isFullScreen) {
     game.scale.stopFullScreen();
 } else {
     game.scale.startFullScreen(false);
 }
}
