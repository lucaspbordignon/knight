import Long from 'long'

import { PositionConverter } from './converter'

/*
 *  Represents a bitmap (or bitboard) from a chess match. The idea is to
 * store all the board of an 8x8 chess board in a single 64 bits integer.
 * Each bit represents whether a given piece is located on that position
 */
class Bitmap {
  map: Long
  lowerBound: number
  upperBound: number

  public static columnMask(index: number, boardSize: number): Bitmap {
    const bitmap = new Bitmap()
    const indexArray = [...new Array(boardSize).keys()].map((i) => i + index * boardSize)

    indexArray.forEach((pos) => bitmap.setPosition(pos))

    return bitmap
  }

  constructor(map?: Long) {
    this.map = map || new Long(Long.UZERO, Long.UZERO, true)
    this.lowerBound = 0
    this.upperBound = 63
  }

  public setPosition(position: number): number {
    if (position > this.upperBound) return this.map

    this.map = this.map.or(this.singleBitMask(position))

    return this.map
  }

  public unsetPosition(position: number): number {
    if (position > this.upperBound) return this.map

    this.map = this.map.and(this.singleBitMask(position).not())

    return this.map
  }

  public isSet(position: number): boolean {
    return !this.map.and(this.singleBitMask(position)).isZero()
  }

  public applyMask(columns: Array<string>): void {
    columns.map((col) => {
      const index = PositionConverter.cols.indexOf(col)
      const columnMask = Bitmap.columnMask(index, 8)

      this.map = this.map.and(columnMask)
    })
  }

  private singleBitMask(position: number): Long {
    if (position < this.upperBound / 2) return new Long(1 << position, 0)

    const shift = position - Math.ceil(this.upperBound / 2)

    return new Long(0, 1 << shift)
  }
}

export { Bitmap }
