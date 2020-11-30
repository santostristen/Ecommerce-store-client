import axios from 'axios'
import apiUrl from '../apiConfig'

export const createPurchase = (purchase, token) => {
  return axios({
    method: 'POST',
    url: `${apiUrl}/purchases`,
    data: { purchase: purchase },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const updatePurchase = (user, purchase, token) => {
  return axios({
    method: 'PATCH',
    url: `${apiUrl}/purchases/ + token`,
    data: { purchase: purchase },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
