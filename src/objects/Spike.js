import GameObject from '../core/GameObject'
import gameState from '../core/GameState'

const SpikeProps = {
  sprite: {
    asset: 'spike'
  },
  physics: {
    box: {
      x: 8,
      y: 32,
      width: 48,
      height: 28
    }
  }
}

export default class Spike extends GameObject {
  constructor(x, y, move) {
    super(Object.assign({}, SpikeProps, {x, y}))
    this._move = move
    if (this._move) {
      this.scale.y *= -1
      this.anchor.y = 1

    }
  }

  update() {
    if (!gameState.playing || !this.alive) {
      this.body.velocity.y = 0
      return
    }
    if (this._move) {
      this.body.velocity.y = 50
    }
    if (this.position.y > game.world.height) {
      this.kill()
    }
  }
}
