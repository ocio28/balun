export default function Rectangle(x, y, width, height, alpha = 0.3) {
  let rect = game.add.graphics(0, 0)
  rect.beginFill(0x000000)
  rect.drawRect(x, y, width, height)
  rect.endFill()
  rect.alpha = alpha
  return rect
}
