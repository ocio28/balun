export default class extends Phaser.State {
  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    this.loaderBg.anchor.setTo(0.5, 0.5)
    this.loaderBar.anchor.setTo(0.5, 0.5)
    this.load.setPreloadSprite(this.loaderBar)

    //
    // load your assets
    //
    //ui
    this.load.spritesheet('panel', 'assets/images/ui/panel.png', 64, 64)
    this.load.image('menu', 'assets/images/ui/menu.png')
    this.load.image('exit_button', 'assets/images/ui/exit_button.png')
    this.load.image('reload', 'assets/images/ui/reload.png')
    this.load.image('fullscreen', 'assets/images/ui/fullscreen.png')
    this.load.image('resume', 'assets/images/ui/resume.png')
    this.load.image('instruction', 'assets/images/ui/instruction.png')
    //fonts
    this.load.bitmapFont('fnt_default', 'assets/fonts/arcade_font.png',
     'assets/fonts/arcade_font.xml');
    //game
    this.load.image('background', 'assets/images/background.png')
    this.load.image('backgroundStar', 'assets/images/backgroundStar.png')
    this.load.image('clouds', 'assets/images/clouds.png')
    this.load.spritesheet('balun', 'assets/images/balun.png', 55, 136, 2, 2)
    this.load.image('air', 'assets/images/air.png')
    this.load.image('spike', 'assets/images/spike.png')
    this.load.image('block', 'assets/images/block.png')
    this.load.image('coin', 'assets/images/coin.png')
    this.load.image('spark', 'assets/images/spark.png')
    this.load.image('balunbreak', 'assets/images/balunbreak.png')
    this.load.image('end', 'assets/images/end.png')
    //Audio
    this.load.audio('sound_star', 'assets/audio/star.wav')
    this.load.audio('sound_air', 'assets/audio/air.wav')
    this.load.audio('sound_balun', 'assets/audio/balun.wav')
    this.load.audio('sound_theme', 'assets/audio/balun-theme.mp3')
  }

  create () {
    if (this.game.device.desktop) {
      this.state.start('LogoSplash')
    } else {
      this.state.start('Instruction')
    }
  }
}
