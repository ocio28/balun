class GameState {
  constructor() {
    this.sound = true
  }

  start() {
    this.score = 0
    this.level = 0
    this.playing = true
    this.end = false
  }

  endGame() {
    this.end = true
  }
}

export default new GameState()
