import Label from '../ui/Label'
import MenuPanel from '../ui/MenuPanel'

export default class extends Phaser.State {
  init() {
    this.stage.backgroundColor = '#00aad4'
  }

  create () {
    let x = this.game.world.centerX
    let y = this.game.world.centerY

    game.add.image(-32, game.world.centerY - 260, 'background')
    this.balun = this.game.add.image(x - 96, y + 256, 'balun')
    this.balun.anchor.setTo(0.5)
    this._time = 0

    new Label(this.game, x, y - 160, 'B A L U N', 88)
    new Label(this.game, x, y + 148, 'PRESIONA   PARA   COMENZAR', 30, true)

    let menu = new MenuPanel(this.world.width * 0.2, this.world.centerY - 128,
      () => document._exitGame ? document._exitGame() : null)

    this.pointers = [
      game.input.mousePointer,
      game.input.pointer1
    ]
  }

  update() {
    this._time += this.game.time.physicsElapsed
    this._time = Math.min(this._time, 2)
    this.balun.position.x += 2 - this._time
    this.balun.position.y -= 1

    if (this.balun.position.y < 0) {
      this.balun.kill()
    }

    if (this.pointers.filter(p => p.position.y > 80).filter(p => p.justPressed()).length > 0) {
      this.state.start('Game')
    }
  }
}
