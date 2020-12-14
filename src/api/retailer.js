import axios from 'axios'
import apiUrl from '../apiConfig'

export const indexRetailers = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/retailers',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const deleteRetailer = (user, retailerId) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/retailers/' + retailerId,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const createRetailer = (user, retailer) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/retailers',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: { retailer }
  })
}

export const editRetailer = (user, retailer, id) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/retailers/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: { retailer: retailer }
  })
}

export const showRetailer = (user, retailerId) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/retailers/' + retailerId,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
