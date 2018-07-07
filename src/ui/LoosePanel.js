import Panel from '../ui/Panel'
import Rectangle from '../ui/Rectangle'
import Label from '../ui/Label'

export default class LoosePanel {
  constructor(x, y) {
    this.mist = Rectangle(0, 0, game.world.width, game.world.height)
    this.mist.visible = false
    this.panel = Panel(x, y, 4, 4)
    this.panel.visible = false

    this.score = new Label(game, 128, 85, '0', 80)
    this.score.anchor.setTo(0.5)
    let exit = game.add.image(32, 128, 'exit_button')
    let reload = game.add.image(142, 128, 'reload')
    this.panel.addChild(exit)
    this.panel.addChild(reload)
    this.panel.addChild(this.score)

    exit.inputEnabled = true
    exit.events.onInputUp.add(() => game.state.start('Title'))
    reload.inputEnabled = true
    reload.events.onInputUp.add(() => game.state.restart())
  }

  show() {
    this.panel.visible = true
    this.mist.visible = true
  }

  isVisible() {
    return this.panel.visible
  }

  setScore(score) {
    this.score.text = score.toString()
  }
}
