import GameObject from '../core/GameObject'
import gameState from '../core/GameState'

const BalunProps = {
  sprite: {
    asset: 'balun'
  },
  physics: {
    box: {
      x: 8,
      y: 8,
      width: 42,
      height: 65
    }
  }
}

export default class Balun extends GameObject {
  constructor(x, y, audio) {
    super(Object.assign({}, BalunProps, {x, y}))
    this._audio = audio
    game.add.existing(this)
    this.anchor.setTo(0.5)
    this._time = 0
    this._endingTime = 0
    this._cooldown = false

    this._break = game.add.emitter(0, 0, 4)
    this._break.makeParticles('balunbreak')
    this._break.gravity = 0
    this._break.minParticleSpeed.setTo(-300, 300);
    this._break.maxParticleSpeed.setTo(300, -300);
    this._break.minRotation = 0
    this._break.maxRotation = 0

    this.pointers = [
      game.input.mousePointer,
      game.input.pointer1
    ]

    this._air = 0.1
  }

  air() {
    this._air = 0
    //this.scale.x += 0.1
    //this.scale.y += 0.1
  }

  dead() {
    this._break.x = this.position.x
    this._break.y = this.position.y
    this._break.start(true, 200, null, 4)
    this.kill()
    this._audio.balun()
    this._audio.themeStop()
  }

  move(x, y) {
    if (y !== this.position.y) {
      let dir = Math.sign(y - this.position.y)
      this.position.y += (1.2 * dir)
      if ((dir > 0 && this.position.y > y) || (dir < 0 && this.position.y < y)) {
        this.position.y = y
      }
    }
    if (x !== this.position.x) {
      let dir = Math.sign(x - this.position.x)
      this.position.x += (1.2 * dir)
      if ((dir > 0 && this.position.x > x) || (dir < 0 && this.position.x < x)) {
        this.position.x = x
      }
    }

    return (x === this.position.x && y === this.position.y)
  }

  update() {
    if (!gameState.playing) {
      this.body.velocity.y = 0
      this.body.velocity.x = 0
      return
    }
    if (this._endingReady) {
      this.position.y -= 1.2
      return
    }
    if (this._ending) {
      this.body.velocity.x = 0
      this.body.velocity.y = 0
      this._endingReady = this.move(game.world.centerX, game.world.centerY)
      return
    }
    if (this.position.y < 0 || this.scale.x < 0.5 || this.scale.x > 1.4) {
      this.dead()
      return
    }
    this.body.velocity.x = 0
    this.body.velocity.y = -50
    this._cooldown = false
    this.pointers.filter(p => p.isDown).filter(p => p.position.y > 64).forEach(p => {
      this._cooldown = true
      this._dir = Math.sign(p.position.x - this.position.x)
      this.frame = this._dir > 0 ? 0 : 1
      this.body.velocity.x = 80 * this._dir
      this.body.velocity.y = 100 * this._time
    })
    if (this._cooldown) {
      this._time += game.time.physicsElapsed
    } else {
      this._time = 0
    }
    this.scale.x -= 0.01 * game.time.physicsElapsed
    this.scale.y -= 0.01 * game.time.physicsElapsed

    if (this._air < 0.1) {
      this._air += 0.25 * game.time.physicsElapsed
      this.scale.x += 0.25 * game.time.physicsElapsed
      this.scale.y += 0.25 * game.time.physicsElapsed
      console.log(this._air)
    }
  }
}

function f(t) {
  return 200 * t
}
