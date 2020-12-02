import React, { useState, useEffect } from 'react'

import { showPurchase } from '../../api/purchases'

const PurchasesShow = props => {
  const [purchase, setPurchase] = useState(null)

  useEffect(() => {
    const { user, msgAlert, match } = props

    showPurchase(user, match.params.id)
      .then(res => {
        setPurchase(res.data.purchase)
      })
      .then(() => {
        msgAlert({
          heading: 'Show purchase success!',
          message: 'See your purchase here.',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Show purchase failed :(',
          message: 'Error code: ' + err.message,
          variant: 'danger'
        })
      })
  }, [])

  // If purchase is 'null', print Loading
  return (
    <div>
      {purchase ? (
        <div>
          {Object.keys(purchase.productTally).map(key => {
            return <p key={key}>{purchase.productTally[key]} {key}</p>
          })}
          <p>Total Price: ${purchase.totalPrice}</p>
        </div>
      ) : 'Loading...'}
    </div>
  )
}

export default PurchasesShow
