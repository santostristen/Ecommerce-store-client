import React, { useState, useEffect } from 'react'
import { showReview, deleteReview } from '../../api/reviews'

const ReviewsDelete = (props) => {
  const [ review, setReview ] = useState(null)

  const { user, match, msgAlert, location, history } = props
  const productId = location.state.productId
  const { reviewId } = match.params

  useEffect(() => {
    // add productId in showReview.
    showReview(user, reviewId, productId)
      .then(res => setReview(res.data.review))
      .catch(err => {
        msgAlert({
          heading: 'Cannot find review',
          message: `Error: ${err.message}`,
          variant: 'danger'
        })
      })
  }, [])

  const handleDelete = () => {
    // add productID in deleteReview
    deleteReview(user, reviewId, productId)
      .then(() => {
        msgAlert({
          heading: 'Review Deleted',
          message: 'Your review has been removed',
          variant: 'success'
        })
      })
      .then(() => history.push('/products/' + productId))
      .catch(err => {
        msgAlert({
          heading: 'Delete Fail',
          message: `Error: ${err.message}`,
          variant: 'danger'
        })
      })
  }
  return (
    <div>
      { review ? (
        <div>
          <h2>Are you sure you want to delete this review?</h2>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : 'Loading...'}
    </div>
  )
}

export default ReviewsDelete
