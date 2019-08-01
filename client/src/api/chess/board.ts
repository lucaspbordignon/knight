import axios from 'axios'

export const getBoardData = async () => {
  const { data } = await axios({
    method: 'get',
    url: '/chess/board',
  })

  return { data }
}
