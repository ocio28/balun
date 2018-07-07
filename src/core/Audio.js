import state from './GameState'

export default class Audio {
  constructor() {
    this.starAudio = game.add.audio('sound_star')
    this.airAudio = game.add.audio('sound_air')
    this.balunAudio = game.add.audio('sound_balun')
    this.themeAudio = game.add.audio('sound_theme')
    this.themeAudio.loop = true
    this.themeAudio.volume = 0.4
  }

  theme() {
    this.themeStop()
    if (state.sound) {
      this.themeAudio.play()
    }
  }

  themeStop() {
    this.themeAudio.stop()
  }

  balun() {
    if (state.sound) {
      this.balunAudio.play()
    }
  }

  star() {
    if (state.sound) {
      this.starAudio.play()
    }
  }

  air() {
    if (state.sound) {
      this.airAudio.play()
    }
  }
}
