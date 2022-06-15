
export const createControlButton = (parent, coordinates, color, callback) => {
  const spaceBar = parent.add.rectangle(...coordinates, color).setInteractive()
  spaceBar.on('pointerdown', callback)
  return spaceBar
}