import axios from 'axios'

export const getPossibleMovesData = async (position, turns, piece = 'knight', boardSize = 8) => {
  const { data } = await axios.get('/chess/pieces/moves', {
    params: {
      boardSize,
      piece,
      position,
      turns,
    },
  })

  return { data }
}
