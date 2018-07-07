import Panel from '../ui/Panel'
import Rectangle from '../ui/Rectangle'
import gameState from '../core/GameState'

export default class MenuPanel {
  constructor(x, y, exitCallback) {
    this.menuButton = game.add.image(8, 8, 'menu')
    this.menuButton.inputEnabled = true
    this.menuButton.events.onInputDown.add(this.show, this)

    this.mist = Rectangle(0, 0, game.world.width, game.world.height)
    this.mist.visible = false
    this.panel = Panel(x, y, 5)
    this.panel.visible = false

    let exit = game.add.image(20, 64, 'exit_button')
    let fullscreen = game.add.image(120, 64, 'fullscreen')
    let resume = game.add.image(220, 64, 'resume')
    this.panel.addChild(exit)
    this.panel.addChild(fullscreen)
    this.panel.addChild(resume)

    exit.inputEnabled = true
    if (exitCallback) {
      exit.events.onInputDown.add(exitCallback, this)
    } else {
      exit.events.onInputDown.add(() => {
        game.state.start('Title')
        game.paused = false
      })
    }
    fullscreen.inputEnabled = true
    fullscreen.events.onInputUp.add(goFullscreen, this)
    resume.inputEnabled = true
    resume.events.onInputDown.add(this.show, this)
  }

  disableButton() {
    this.menuButton.kill()
  }

  show() {
    this.panel.visible = !this.panel.visible
    this.mist.visible = !this.mist.visible
    gameState.playing = !gameState.playing
    game.paused = !game.paused
  }

  isVisible() {
    return this.panel.visible
  }
}

function goFullscreen() {
 if (game.scale.isFullScreen) {
     game.scale.stopFullScreen();
 } else {
     game.scale.startFullScreen(false);
 }
}
