export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#000000'
  }

  preload () {
    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
  }

  create () {
    let scale = this.game.scale
    scale.pageAlignHorizontally = true;
    scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    scale.setMinMax(0, 0, this.game.world.width, this.game.world.height)
    scale.forceOrientation(true, false)
    this.state.start('Splash')
  }
}
