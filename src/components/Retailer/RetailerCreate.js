import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { createRetailer } from '../../api/retailer'

class RetailerCreate extends Component {
  constructor () {
    super()
    this.state = {
      retailer: {
        name: '',
        description: ''
      },
      createdId: null
    }
  }

  handleChange = (event) => {
    const updatedField = { [event.target.name]: event.target.value }

    this.setState(currState => {
      const updatedRetailer = { ...currState.retailer, ...updatedField }
      return { retailer: updatedRetailer }
    })
  }

  // handle form submission
  handleSubmit = (event) => {
    event.preventDefault()

    const { user, msgAlert } = this.props

    createRetailer(user, this.state.retailer)
      .then((res) => {
        this.setState({ createdId: res.data.retailer._id })
      })
      .then(() => {
        msgAlert({
          heading: 'Retailer Created Successfully',
          message: 'Take a look!',
          variant: 'success'
        })
      })
      .catch((err) => {
        msgAlert({
          heading: 'Retailer Creation Failed :(',
          message: 'Try again. Error: ' + err.message,
          variant: 'danger'
        })
      })
  }

  render () {
    if (this.state.createdId) {
      return <Redirect to='/retailers'/>
    }
    return (
      <React.Fragment>
        <p>Add a Retailer</p>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Retailer Name Here"
            value={this.state.retailer.name}
            onChange={this.handleChange}
            name="name"
          />
          <input
            placeholder="Retailer Description Here"
            value={this.state.retailer.description}
            onChange={this.handleChange}
            name="description"
          />
          <button type="submit">Submit</button>
        </form>
      </React.Fragment>
    )
  }
}

export default RetailerCreate
