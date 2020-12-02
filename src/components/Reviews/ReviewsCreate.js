import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { createReview } from '../../api/reviews'

class CreateReview extends Component {
  constructor () {
    super()
    this.state = {
      review: {
        head: '',
        body: '',
        rating: 3
      },
      created: false
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
    event.preventDefault()

    const { msgAlert, user, location } = this.props

    createReview(this.state.review, user.token, location.state)
      .then(() => {
        msgAlert({
          heading: 'Create Review Success',
          message: 'Check out our other products',
          variant: 'success'
        })
      })
      .then(() => this.setState({ created: true }))
      .catch(err => {
        msgAlert({
          heading: 'Create Review Failure',
          message: `Error: ${err.message}`,
          variant: 'danger'
        })
      })
  }

  render () {
    return (
      <div>
        {this.state.created && <Redirect to={`/products/${this.props.location.state}`}/>}
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
            placeholder="1-5"
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
