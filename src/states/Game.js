import {Balun, Spike, Air, Block, Coin} from '../objects'
import Background from '../objects/Background'
import LoosePanel from '../ui/LoosePanel'
import MenuPanel from '../ui/MenuPanel'
import gameState from '../core/GameState'
import Label from '../ui/Label'
import Spammer from '../model/Spammer'

import Audio from '../core/Audio'

export default class extends Phaser.State {
  init() {
    this.stage.backgroundColor = 0x00aad4
  }

  create () {
    this.sounds = new Audio()
    game.physics.startSystem(Phaser.Physics.ARCADE)
    this.background = new Background()
    this.player = new Balun(this.world.centerX, Math.floor(this.world.height * 0.8), this.sounds)
    this.enemies = game.add.group()
    let y = this.game.world.height - 64
    for (let i = 0; i < 8; i++) {
      this.enemies.add(new Spike(i * 64, y))
    }
    this.air = game.add.group()
    this.blocks = game.add.group()
    this.coins = game.add.group()

    this.spammer = new Spammer(game.rnd)
    this.loose = new LoosePanel(this.world.centerX - 128, this.world.centerY - 128)
    this.menu = new MenuPanel(this.world.width * 0.2, this.world.centerY - 128)

    this.score = new Label(game, this.world.centerX, 54, '0', 80)
    game.time.events.loop(Phaser.Timer.SECOND * 30, () => gameState.level += 1)
    gameState.start()

    this._steps = [{
      wait: 30,
      steps: 3000,
      initColor: 0xffccaa,
      endColor: 0x0
    }, {
      wait: 5,
      steps: 3000,
      initColor: 0x00aad4,
      endColor: 0xffccaa
    }]

    this._startInterpolation = 0
    this._stepCount = 0
    this._currentStep = null

    this._endGame = 0
    this._endObject = game.add.image(game.world.centerX, -64, 'end')
    this._endObject.anchor.setTo(0.5)
    this._endingMessage = new Label(game, game.world.centerX, game.world.centerY - 64, 'FIN    DEL    JUEGO', 50)
    this._endingMessage.visible = false
    this.sounds.theme()
  }

  render() {
    //game.debug.body(this.player)
    //game.debug.body(this.blocks.getAt(0))
  }

  update() {
    if (!gameState.playing) {
      return
    }
    if (this._currentStep === null && this._steps.length > 0) {
      this._currentStep = this._steps.pop()
      this._startInterpolation = 0
      this._stepCount = 0
    }
    if (this._currentStep !== null) {
      this._startInterpolation += game.time.physicsElapsed
      if (this._startInterpolation > this._currentStep.wait) {
        this.stage.backgroundColor = Phaser.Color.interpolateColor(
          this._currentStep.initColor, this._currentStep.endColor,
          this._currentStep.steps, this._stepCount)
        this._stepCount += 1
        if (this._stepCount > this._currentStep.steps) {
          this._currentStep = null
        }
      }
    }

    this.score.text = gameState.score.toString()
    game.physics.arcade.collide(this.player, this.blocks)
    game.physics.arcade.overlap(this.player, this.air, (p, a) => {
      p.air()
      a.kill()
      gameState.score += 1
      this.sounds.air()
    })
    game.physics.arcade.overlap(this.player, this.coins, (p, c) => {
      c.spark()
      c.kill()
      gameState.score += 1
      this.sounds.star()
    })
    if (game.physics.arcade.overlap(this.player, this.enemies)) {
      this.player.dead()
    }
    if (!gameState.end) {
      this.instance(this.spammer.spawn(this.game.time.physicsElapsed))
    }

    if (!this.player.alive && !this.loose.isVisible()) {
      gameState.playing = false
      this.score.visible = false
      this.loose.setScore(gameState.score)
      this.menu.disableButton()
      this.loose.show()
    }

    this._endGame += game.time.physicsElapsed
    if (this._endGame > 300) {
    //if (this._endGame > 10) {
      gameState.endGame()
      if (this.enemies.countLiving() === 8 && this.air.countLiving() === 0 &&
        this.blocks.countLiving() === 0 && this.coins.countLiving() === 0) {
          this.player._ending = true
      }
      //if (this._endGame < 25) {
      if (this._endGame < 315) {
        this._endObject.position.y += 15 * game.time.physicsElapsed
      }
    }
    if (this.player._endingReady && this.player.position.y < -64) {
      this._endingMessage.visible = true
      this.score.position.y = game.world.centerY + 32
      this.menu.disableButton()
    }
  }

  instance(spawn) {
    if (!spawn) return
    spawn.forEach((s, i) => {
      switch (s)  {
        case 10:
          this.createObject(i, this.air, Air)
          break
        case 3:
          this.createObject(i, this.coins, Coin)
          break;
        case 2:
          this.createObject(i, this.enemies, Spike)
          break
        case 1:
          this.createObject(i, this.blocks, Block)
      }
    })
  }

  createObject(i, group, _Class) {
    let object = group.getFirstDead()
    if (object !== null) {
      object.reset(64 * i, -64)
    } else {
      group.add(new _Class(64 * i, -64, true))
    }
  }
}
