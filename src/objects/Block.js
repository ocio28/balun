import GameObject from '../core/GameObject'
import gameState from '../core/GameState'

const BlockProps = {
  sprite: {
    asset: 'block'
  },
  physics: {
    box: {
      x: 0,
      y: 0,
      width: 64,
      height: 64
    }
  }
}

export default class Block extends GameObject {
  constructor(x, y) {
    super(Object.assign({}, BlockProps, {x, y}))
    this.body.immovable = true
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
