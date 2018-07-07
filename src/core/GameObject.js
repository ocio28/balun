export default class GameObject extends Phaser.Sprite {
  constructor(props) {
    let sprite = props.sprite
    super(game, props.x, props.y, sprite.asset, sprite.frame ? sprite.frame : 0)
    this.data = props
    let physics = props.physics
    if (physics) {
      game.physics.enable(this, Phaser.Physics.ARCADE)
      let box = props.physics.box
      if (box) {
        this.body.setSize(box.width, box.height, box.x, box.y)
      }
    }
  }
}
