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

export const indexPurchase = (token) => {
  return axios({
    method: 'GET',
    url: `${apiUrl}/purchases`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const showPurchase = (user, purchaseId) => {
  return axios({
    method: 'GET',
    url: `${apiUrl}/purchases/${purchaseId}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
export const deletePurchase = (user, id) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/purchases/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
