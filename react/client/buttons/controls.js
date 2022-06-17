export const createButton = (parent, coordinates, boxSize,  text) => {
  parent.add.rectangle(coordinates[0] + 5, coordinates[1] + 5, ...boxSize, parent.hoverColor).setScrollFactor(0)
  const button = parent.add.rectangle(...coordinates, ...boxSize, 0x0CE6FF).setInteractive()
  parent.createText(coordinates[0] - 5, coordinates[1] - 5, text, '150px').setOrigin(.5).setScrollFactor(0)
  button.setScrollFactor(0).setInteractive()

  return button
}
