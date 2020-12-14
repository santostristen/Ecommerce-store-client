import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import { indexRetailers } from '../../api/retailer'

class Retailers extends Component {
  constructor () {
    super()
    this.state = {
      retailers: null
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props

    indexRetailers(user)
      .then(res => {
        this.setState({ retailers: res.data.retailers })
      })
      .then(() => {
        msgAlert({
          heading: 'Retailer Index Success!',
          message: 'Nice!',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Retailer Index Failed',
          message: 'Failed with error: ' + err.message,
          variant: 'danger'
        })
      })
  }

  render () {
    if (!this.state.retailers) {
      return (
        'Loading...'
      )
    } else if (this.state.retailers.length === 0) {
      return (
        'No retailers to display :('
      )
    } else {
      return (
        <div>
          {this.state.retailers.map(retailer => (
            <Fragment key={retailer._id}>
              <h2>{retailer.name}</h2>
              <p>{retailer.description}</p>
              <Link to={`/retailers/${retailer._id}`}>See More</Link>
              <Link to={`/retailers-update/${retailer._id}`}>Edit</Link>
              <Link to={'/retailers-create/'}>Add More</Link>
            </Fragment>
          ))}
        </div>
      )
    }
  }
}

export default Retailers
