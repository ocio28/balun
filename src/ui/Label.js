export default class Label extends Phaser.BitmapText {
  constructor(game, x, y, text, size = 34, blink = false) {
    super(game, x, y, 'fnt_default', text, size)
    this.anchor.setTo(0.5)
    game.add.existing(this)
    this._blink = blink
    this._time = 0
  }

  update() {
    if (this._blink) {
      this._time += this.game.time.physicsElapsed
      if (this._time > 0.5) {
        this._time = 0
        this.visible = !this.visible
      }
    }
  }
}
