import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { showReview, deleteReview } from '../../api/reviews'

const ReviewsDelete = (props) => {
  const [ review, setReview ] = useState(null)

  const { user, match, msgAlert, location } = props
  const productId = location.state.productId
  const { reviewId } = match.params
  const [deleted, setDeleted] = useState(false)

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

      .then(() => setDeleted(true))
      .catch(err => {
        msgAlert({
          heading: 'Delete Fail',
          message: `Error: ${err.message}`,
          variant: 'danger'
        })
      })
  }

  if (deleted) {
    return (
      <Redirect to={`/products/${props.location.state.productId}`} />
    )
  }
  return (
    <div className="text-center">
      { review ? (
        <div className="text-center">
          <h2>Are you sure you want to delete this review?</h2>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
      ) : 'Loading...'}
    </div>
  )
}

export default ReviewsDelete
