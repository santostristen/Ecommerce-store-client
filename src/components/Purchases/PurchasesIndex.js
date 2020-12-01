import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { indexPurchase } from '../../api/purchases'

class PurchasesIndex extends Component {
  constructor () {
    super()

    this.state = {
      purchases: null
    }
  }
  componentDidMount () {
    const { msgAlert, user } = this.props
    indexPurchase(user.token)
      .then(response => {
        this.setState({ purchases: response.data.purchases })
      })
      .then(() => {
        msgAlert({
          heading: 'Your Purchases',
          message: 'Past Purchases',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Could not show purchases',
          message: 'Error code: ' + err.message,
          variant: 'danger'
        })
      })
  }
  render () {
    return (
      <div>
        <h2>Your Purchases</h2>
        {
          this.state.purchases ? this.state.purchases.map((purchase) => {
            return (
              <div key={purchase._id}>
                <Link to={`/purchases/${purchase._id}`}>
                  <p>{purchase.name}</p>
                </Link>
                <p>{purchase.totalPrice}</p>
                <p>{purchase.description}</p>
              </div>
            )
          }) : null
        }
      </div>
    )
  }
}

export default PurchasesIndex