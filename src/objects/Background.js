import gameState from '../core/GameState'

export default class Background extends Phaser.Image {
  constructor() {
    super(game, -32, game.world.centerY - 260, 'background')
    game.add.existing(this)
    this.clouds = game.add.image(0, -300, 'clouds')
    this.stars = game.add.group()
    for (let i = 0; i < 30; i++) {
      this.createStar(this.stars)
    }
    this.stars.x = 0
    this.stars.y = -this.game.world.height - 64

    this._time = 0
  }

  createStar(group) {
    let x = game.rnd.between(0, this.game.world.width)
    let y = game.rnd.between(0, this.game.world.height)
    let star = game.add.image(x, y, 'backgroundStar', 0, group)
    star.anchor.setTo(0.5)
    star.angle = game.rnd.angle()
  }

  update() {
    if (!gameState.playing) {
      return
    }
    this.position.y += 0.1
    this._time += game.time.physicsElapsed
    if (this._time > 45) {
      this.clouds.position.y += 0.3
    }
    if (this._time > 50) {
      this.stars.y += 0.1
    }
  }
}
