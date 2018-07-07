import GameObject from '../core/GameObject'
import gameState from '../core/GameState'

const Props = {
  sprite: {
    asset: 'coin'
  },
  physics: {
    box: {
      x: 8,
      y: 8,
      width: 48,
      height: 48
    }
  }
}

export default class Coin extends GameObject {
  constructor(x, y) {
    super(Object.assign({}, Props, {x, y}))
    this._spark = game.add.emitter(0, 0, 5)
    this._spark.makeParticles('spark')
    this._spark.gravity = 0
    this._spark.minRotation = 0
    this._spark.maxRotation = 0
    this._spark.minParticleSpeed.setTo(-300, 300);
    this._spark.maxParticleSpeed.setTo(300, -300);
  }

  spark() {
    this._spark.x = this.position.x + 32
    this._spark.y = this.position.y + 32
    this._spark.start(true, 200, null, 5)
  }

  update() {
    if (!gameState.playing || !this.alive) {
      this.body.velocity.y = 0
      return
    }
    this.body.velocity.y = 50
    if (this.position.y > game.world.height) {
      this.kill()
    }
  }
}
