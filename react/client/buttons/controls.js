
export const createButton = (parent, coordinates, color) => {
  const button = parent.add.rectangle(...coordinates, color).setInteractive()
  return button
}
