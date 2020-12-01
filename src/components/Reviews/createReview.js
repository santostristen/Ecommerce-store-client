import React, { Component } from 'react'
import createReview from './../api/reviews'

class CreateReview extends Component {
  constructor () {
    super()
    this.state = {
      review: {
        head: '',
        body: '',
        rating: null
      }
    }
  }

  handleInputChange = (event) => {
    event.persist()
    this.setState(prevState => {
      const updatedField = {
        [event.target.name]: event.target.value
      }
      const updatedData = Object.assign({}, prevState.review, updatedField)
      return { review: updatedData }
    })
  }

  handleSubmit = (event) => {
    createReview()
      .then(console.log)
      .catch(console.error)
  }

  render () {
    return (
      <div>
        <h2>Review</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Title"
            name="head"
            value={this.state.review.head}
            onChange={this.handleInputChange}
          />
          <input
            placeholder="Review"
            name="body"
            value={this.state.review.body}
            onChange={this.handleInputChange}
          />
          <input
            placeholder="Rating (#1-5)"
            name="rating"
            value={this.state.review.rating}
            onChange={this.handleInputChange}
            type='Number'
            min={1}
            max={5}
          />
          <button type="submit">Create Review</button>
        </form>
      </div>

    )
  }
}

export default CreateReview
