import * as React from 'react'

import './square.scss'

interface SquareProps {
  selected: boolean
  odd: boolean
}

const Square: React.FunctionComponent<SquareProps> = (props) => {
  const squareClasses = (): string => {
    if (props.selected) {
      return 'square selected'
    }
    if (props.odd) {
      return 'square odd'
    }

    return 'square'
  }

  return <div className={squareClasses()} />
}

export { Square }
