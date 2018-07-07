import gameState from '../core/GameState'

/*
  0: empty
  1: block
  2: spike
*/
const Patterns = [[
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 2, 0, 0, 0],
  [1, 1, 0, 0, 0, 0, 0, 0],
  [2, 0, 0, 0, 0, 0, 0, 2],
  [0, 1, 0, 0, 0, 0, 0, 1],
  [0, 2, 2, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 2, 2, 0],
], [
  [1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 2],
  [2, 0, 0, 2, 0, 0, 0, 2],
  [0, 0, 1, 2, 1, 0, 0, 0],
  [0, 1, 1, 0, 0, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 0],
  [2, 2, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 2],
], [
  [0, 0, 2, 2, 2, 0, 0, 0],
  [2, 2, 0, 0, 0, 0, 2, 2],
  [0, 0, 2, 0, 2, 0, 0, 2],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [1, 2, 0, 0, 0, 2, 1, 1],
  [1, 1, 1, 0, 0, 0, 2, 2],
  [2, 2, 0, 0, 0, 1, 1, 1],
  [0, 0, 1, 1, 1, 0, 0, 0],
], [
  [1, 1, 1, 0, 0, 2, 2, 2],
  [2, 2, 2, 0, 0, 2, 2, 2],
  [1, 0, 2, 2, 2, 2, 0, 1],
  [2, 0, 1, 0, 2, 2, 0, 1],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 2, 2, 2, 2, 0, 0],
  [0, 0, 0, 0, 2, 2, 2, 2],
  [2, 2, 2, 2, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, 2, 1, 1],
  [1, 1, 2, 2, 0, 0, 0, 0],
], [
  [2, 2, 0, 2, 2, 0, 2, 2],
  [2, 2, 2, 2, 0, 2, 2, 2],
  [2, 0, 2, 1, 1, 1, 1, 1],
  [2, 2, 2, 1, 1, 2, 2, 0],
  [0, 2, 2, 1, 1, 2, 2, 0],
  [1, 0, 2, 2, 2, 1, 0, 1],
  [2, 2, 2, 0, 2, 1, 1, 1],
  [0, 1, 1, 1, 2, 2, 2, 2],
  [2, 1, 1, 1, 1, 2, 0, 2],
  [2, 2, 0, 2, 2, 2, 2, 2],
]]

const EmptyRow = [0, 0, 0, 0, 0, 0, 0, 0]

export default class Spammer {
  constructor(rng) {
    this.rng = rng
    this.next = 1
    this.time = 0
    this.count = 3
    this.spawnItem = this.spawnItem.bind(this)
  }

  spawn(delta) {
    this.time += delta
    if (this.time > 1.5) {
      this.time = 0
      let minLimit = gameState.level < 5 ? 4 : 2
      let maxLimit = 8 - Math.min(4, gameState.level)
      this.count = this.count === 8 ? 0 : this.count + 1

      if (this.count < minLimit) {
        return this.spawnItem()
      }
      if (this.count < maxLimit) {
        return this.spawnBlocks()
      }
      if (this.count === maxLimit) {
        return this.spawnBlocks(true)
      }
    }
  }

  spawnBlocks(force) {
    if (this.rng.between(0, 1) === 0 || force) {
      this.count = 0
      let index = Math.min(gameState.level, Patterns.length - 1)
      return [...this.rng.pick(Patterns[index])]
    }
  }

  spawnItem(o) {
    return [...EmptyRow].map(c => {
      if (this.rng.between(0, 3) === 0) {
        return 3
      }
      return this.rng.between(0, 5) === 0 ? 10 : 0
    })
  }
}
