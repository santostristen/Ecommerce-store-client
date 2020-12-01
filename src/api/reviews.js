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
export const showReview = (user, reviewId, productId) => {
  console.log(productId)
  return axios({
    method: 'GET',
    url: `${apiUrl}/reviews/${reviewId}/${productId}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const deleteReview = (user, reviewId, productId) => {
  return axios({
    method: 'DELETE',
    url: `${apiUrl}/reviews/${reviewId}/${productId}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

export const editReview = (user, review, productId) => {
  return axios({
    method: 'PATCH',
    url: `${apiUrl}/reviews/${review._id}/${productId}`,
    data: { review: review },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
