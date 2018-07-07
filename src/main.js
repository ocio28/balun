import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import InstructionState from './states/Instruction'
import LogoSplashState from './states/LogoSplash'
import TitleState from './states/Title'
import GameState from './states/Game'

import config from './config'

class Game extends Phaser.Game {
  constructor () {
    super(config.gameWidth, config.gameHeight, Phaser.CANVAS, 'game-content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Instruction', InstructionState, false)
    this.state.add('LogoSplash', LogoSplashState, false)
    this.state.add('Title', TitleState, false)
    this.state.add('Game', GameState, false)

    this.state.start('Boot')
  }
}

window.game = new Game()
