import axios from 'axios'
import apiUrl from '../apiConfig'

export const indexProducts = (token) => {
  return axios({
    method: 'GET',
    url: `${apiUrl}/products`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
