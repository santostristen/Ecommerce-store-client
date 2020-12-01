import axios from 'axios'
import apiUrl from '../apiConfig'

export const createReview = (review, token) => {
  return axios({
    method: 'POST',
    url: `${apiUrl}/reviews`,
    data: { review: review },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const deleteReview = (user, id) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/reviews/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const editReview = (user, review, id) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/reviews/' + id,
    data: { review: review },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const showReview = (user, id) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/reviews/' + id,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
