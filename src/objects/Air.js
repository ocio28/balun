import GameObject from '../core/GameObject'
import gameState from '../core/GameState'

const AirProps = {
  sprite: {
    asset: 'air'
  },
  physics: {
    box: {
      x: 16,
      y: 16,
      width: 32,
      height: 32
    }
  }
}

export default class Air extends GameObject {
  constructor(x, y) {
    super(Object.assign({}, AirProps, {x, y}))
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
