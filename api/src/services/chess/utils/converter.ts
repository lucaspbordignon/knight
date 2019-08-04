import { Bitmap } from './bitmap'
import { PositionChecker } from './checker'

class PositionConverter {
  static readonly cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  static readonly rows = Array.from({ length: 8 }, (_, i) => i + 1)

  /* Converts Algebraic coordinates to Bitmap coordinates [1-64] */
  public static toBitmap(position: string, boardSize: number): number {
    const multiplier = PositionConverter.cols.indexOf(this.getCol(position))

    if (multiplier < 0) return null

    return multiplier * boardSize + this.getRow(position)
  }

  /* Converts Bitmap coordinate to Algebraic coordinates ('A1','C8',...) */
  public static toAlgebraic(position: number, boardSize: number): string {
    const col = this.cols[this.colBitmapIndex(position, boardSize)]
    const row = this.rows[(position % boardSize || boardSize) - 1]

    return col + row
  }

  public static getCol(position: string): string {
    const colRegex = /^([A-Z]+)/
    const checker = new PositionChecker(position)

    if (!checker.valid()) return null

    return colRegex.exec(position)[0]
  }

  public static getRow(position: string): number {
    const rowRegex = /([0-9]+)$/
    const checker = new PositionChecker(position)

    if (!checker.valid()) return null

    return parseInt(rowRegex.exec(position)[0])
  }

  public static colBitmapIndex(position: number, boardSize: number) {
    const colIndex = Math.floor(position / boardSize)

    return position % boardSize === 0 ? colIndex - 1 : colIndex
  }
}

export { PositionConverter }
