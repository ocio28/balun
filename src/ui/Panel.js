export default function Panel(x = 300, y = 150, width = 4, height = 3) {
  let group = game.add.group()
  for (let i = 0; i < height; i++)  {
    for (let j = 0; j < width; j++)  {
      game.add.image(j * 64, i * 64, 'panel', frame(i, j, width, height), group)
    }
  }
  group.x = x
  group.y = y
  return group
}

function frame(i, j, w, h) {
  if (i === 0 && j === 0) return 0
  if (i === 0 && j === w - 1) return 2
  if (i === h - 1 && j === 0) return 6
  if (i === h - 1 && j === w - 1) return 8
  if (i === 0) return 1
  if (i == h - 1) return 7
  if (j === 0) return 3
  if (j === w - 1) return 5
  return 4
}
