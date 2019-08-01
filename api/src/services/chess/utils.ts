class PositionChecker {
  static readonly columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  static readonly rows = Array.from({ length: 8 }, (_, i) => i + 1)
  static readonly displacements = [-17, -15, -10, -6, 6, 10, 15, 17]

  errors: string

  static validMove(position: number): boolean {
    if (position > 0 && position < 64) {
      return true
    }

    return false
  }

  /* Instance methods */

  constructor(public position: string) {
    this.position = position
    this.errors = null
  }

  public valid(): boolean {
    return this.algebraicPosition()
  }

  /* Check whether the given position is algebraic */
  public algebraicPosition(): boolean {
    const validationRegex = /^([A-Z]+)([0-9]+)$/

    if (validationRegex.test(this.position)) {
      return true
    }

    this.errors = 'The given position is not in algebraic notation'

    return false
  }

  /* Converts Algebraic coordinates to Bitmap coordinates [1-64] */
  public toBitmap(boardSize: number): number {
    const multiplier = PositionChecker.columns.indexOf(this.getCol())

    if (multiplier < 0) {
      return null
    }

    return multiplier * boardSize + this.getRow()
  }

  private getCol(): string {
    const colRegex = /^([A-Z]+)/

    if (!this.valid()) {
      return null
    }

    return colRegex.exec(this.position)[0]
  }

  private getRow(): number {
    const rowRegex = /([0-9]+)$/

    if (!this.valid()) {
      return null
    }

    return parseInt(rowRegex.exec(this.position)[0])
  }
}

export { PositionChecker }
