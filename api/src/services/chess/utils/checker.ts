class PositionChecker {
  errors: string

  constructor(public position: string) {
    this.position = position
    this.errors = null
  }

  public valid(): boolean {
    return this.isAlgebraicPosition()
  }

  /* Check whether the given position is algebraic */
  public isAlgebraicPosition(): boolean {
    const validationRegex = /^([A-Z]+)([0-9]+)$/

    if (validationRegex.test(this.position)) {
      return true
    }

    this.errors = 'The given position is not in algebraic notation'

    return false
  }
}

export { PositionChecker }
