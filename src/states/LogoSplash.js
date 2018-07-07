import Label from '../ui/Label'

export default class extends Phaser.State {
  create () {
    new Label(this.game, this.game.world.centerX + 16, this.game.world.centerY,
       "L U D O C L E T A", 48)
    new Label(this.game, this.game.world.centerX, this.game.world.height - 64,
       "@LOKALJOST", 20)
    this.time.events.add(Phaser.Timer.SECOND * 2, () =>
      this.state.start('Title'))
  }
}
