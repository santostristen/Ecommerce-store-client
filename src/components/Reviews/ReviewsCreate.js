import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
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
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Head:</Form.Label>
            <Form.Control
              placeholder="Title"
              name="head"
              value={this.state.review.head}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Body:</Form.Label>
            <Form.Control
              placeholder="Review"
              name="body"
              value={this.state.review.body}
              onChange={this.handleInputChange}
              as="textarea"
              rows="3"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Rating:</Form.Label>
            <Form.Control
              placeholder="1-5"
              name="rating"
              value={this.state.review.rating}
              onChange={this.handleInputChange}
              type='Number'
              min={1}
              max={5}
            />
          </Form.Group>
          <Button variant="primary" type="submit">Create Review</Button>
        </Form>
      </div>

    )
  }
}

export default CreateReview
