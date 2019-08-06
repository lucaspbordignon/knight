import Long from 'long'

import { Bitmap } from '../utils/bitmap'
import { PositionConverter } from '../utils/converter'

class Knight {
  bitmap: Bitmap
  lowerBound: number
  upperBound: number

  constructor(position: number) {
    this.bitmap = new Bitmap()
    this.bitmap.setPosition(position)
  }

  public possibleMoves(update?: boolean): Array<number> {
    const finalMap = this.firstMovePattern()
      .or(this.secondMovePattern())
      .or(this.thirdMovePattern())
      .or(this.fourthMovePattern())
      .or(this.fifthMovePattern())
      .or(this.sixthMovePattern())
      .or(this.seventhMovePattern())
      .or(this.eigthiethMovePattern())

    const finalBitmap = new Bitmap(finalMap)

    if (update) this.bitmap = finalBitmap

    return [...Array(64).keys()]
      .map((position) => (finalBitmap.isSet(position) ? position : null))
      .filter((move) => move !== null)
  }

  public firstMovePattern(): Long {
    const bitmap = new Bitmap(this.bitmap.map)

    bitmap.applyMask(['H'])

    return bitmap.map.shiftLeft(17)
  }

  public secondMovePattern(): Long {
    const bitmap = new Bitmap(this.bitmap.map)

    bitmap.applyMask(['G', 'H'])

    return bitmap.map.shiftLeft(10)
  }

  public thirdMovePattern(): Long {
    const bitmap = new Bitmap(this.bitmap.map)

    bitmap.applyMask(['G', 'H'])

    return bitmap.map.shiftRightUnsigned(6)
  }

  public fourthMovePattern(): Long {
    const bitmap = new Bitmap(this.bitmap.map)

    bitmap.applyMask(['H'])

    return bitmap.map.shiftRightUnsigned(15)
  }

  public fifthMovePattern(): Long {
    const bitmap = new Bitmap(this.bitmap.map)

    bitmap.applyMask(['A'])

    return bitmap.map.shiftLeft(15)
  }

  public sixthMovePattern(): Long {
    const bitmap = new Bitmap(this.bitmap.map)

    bitmap.applyMask(['A', 'B'])

    return bitmap.map.shiftLeft(6)
  }

  public seventhMovePattern(): Long {
    const bitmap = new Bitmap(this.bitmap.map)

    bitmap.applyMask(['A', 'B'])

    return bitmap.map.shiftRightUnsigned(10)
  }

  public eigthiethMovePattern(): Long {
    const bitmap = new Bitmap(this.bitmap.map)

    bitmap.applyMask(['A'])

    return bitmap.map.shiftRightUnsigned(17)
  }
}

export { Knight }
