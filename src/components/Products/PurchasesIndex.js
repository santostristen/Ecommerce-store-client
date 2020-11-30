import React, { Component } from 'react'
import { indexPurchase } from '../../api/purchases'

class PurchasesIndex extends Component {
  constructor () {
    super()

    this.state = {
      purchases: null
    }
  }
  componentDidMount () {
    indexPurchase(this.props.user.token)
      .then(response => {
        this.setState({ purchases: response.data.purchases })
      })
      .catch(console.error)
  }
  render () {
    return (
      <div>
        <h1>Your Purchases</h1>
        {
          !this.state.purchases ? this.state.purchases.map((purchase) => {
            return (
              <div key={purchase._id}>
                <p>{purchase.name}</p>
                <p>{purchase.price}</p>
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
