import Long from 'long'

/*
 *  Represents a bitmap (or bitboard) from a chess match. The idea is to
 * store all the board of an 8x8 chess board in a single 64 bits integer.
 * Each bit represents whether a given piece is located on that position
 */
class Bitmap {
  map: Long
  lowerBound: number
  upperBound: number

  constructor() {
    this.map = new Long(Long.UZERO, Long.UZERO, true)
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

  private singleBitMask(position: number): Long {
    if (position < this.upperBound / 2) return new Long(1 << position, 0)

    const shift = position - Math.ceil(this.upperBound / 2)

    return new Long(0, 1 << shift)
  }
}

export { Bitmap }
