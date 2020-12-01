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

export const showProduct = (token, productId) => {
  return axios({
    method: 'GET',
    url: `${apiUrl}/products/${productId}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const createProduct = (product, token) => {
  return axios({
    method: 'POST',
    url: `${apiUrl}/products`,
    data: { product },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
