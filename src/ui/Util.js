import config from '../config'

export function X(p) {
  return Math.floor(config.gameWidth * (p / 100))
}

export function Y(p) {
  return Math.floor(config.gameHeight * (p / 100))
}
