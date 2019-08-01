class PositionChecker {
  static readonly columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  static readonly rows = Array.from({ length: 8 }, (_, i) => i + 1)

  errors: string

  constructor(public position: string) {
    this.position = position
    this.errors = null
  }

  valid(): boolean {
    return this.algebraicPosition()
  }

  algebraicPosition(): boolean {
    const validationRegex = /^([A-Z]+)([0-9]+)$/

    if (validationRegex.test(this.position)) {
      return true
    }

    this.errors = 'The given position is not in algebraic notation'

    return false
  }

  getCol(): string {
    const colRegex = /^([A-Z]+)/

    if (!this.valid()) {
      return null
    }

    return colRegex.exec(this.position)[0]
  }

  getRow(): number {
    const rowRegex = /([0-9]+)$/

    if (!this.valid()) {
      return null
    }

    return parseInt(rowRegex.exec(this.position)[0])
  }

  toBitmap(boardSize: number): number {
    const multiplier = PositionChecker.columns.indexOf(this.getCol())

    if (multiplier < 0) {
      return null
    }

    return multiplier * boardSize + this.getRow()
  }
}

export { PositionChecker }
