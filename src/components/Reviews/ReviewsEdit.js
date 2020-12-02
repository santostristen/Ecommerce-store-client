// user token
// start it with previous data - prevState

import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { editReview, showReview } from '../../api/reviews'

// Make sure productShow is labeled the same
// import { productShow } from '../../api/product'

const EditReview = props => {
  const [review, setReview] = useState({ head: '', body: '', rating: null })
  const [updated, setUpdated] = useState(false)
  const { user, msgAlert, match, location } = props
  const { productId } = location.state

  useEffect(() => {
    showReview(user, match.params.reviewId, productId)
      .then(res => {
        setReview(res.data.review)
      })
    // .then(() => {
    //   msgAlert({
    //     heading: 'Show review success!',
    //     message: 'See your review here.',
    //     variant: 'success'
    //   })
    // })
      .catch(err => {
        msgAlert({
          heading: 'Show product failed :(',
          message: 'Error code: ' + err.message,
          variant: 'danger'
        })
      })
  }, [])

  const handleChange = (event) => {
    const updatedField = { [event.target.name]: event.target.value }
    setReview(prevReview => {
      const updatedReview = { ...prevReview, ...updatedField }
      return updatedReview
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    editReview(user, review, productId)
      .then(() => setUpdated(true))
      .then(() => msgAlert({
        heading: 'Update successful',
        message: 'See Reviews',
        variant: 'success'
      }))
      .catch(err => ({
        heading: 'Could not update review',
        message: 'Error code: ' + err.message,
        variant: 'danger'
      }))
  }

  if (updated) {
    return (
      <Redirect to={`/products/${props.location.state.productId}`} />
    )
  }

  return (
    <div>
      <h2>Review</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          name="head"
          value={review.head}
          onChange={handleChange}
        />
        <input
          placeholder="Review"
          name="body"
          value={review.body}
          onChange={handleChange}
        />
        <input
          placeholder="Rating (#1-5)"
          name="rating"
          value={review.rating}
          onChange={handleChange}
          type='Number'
          min={1}
          max={5}
        />
        <button type="submit">Update Review</button>
      </form>
    </div>
  )
}

export default EditReview
