import React, { useEffect, useState } from 'react'
import { showPurchase } from '../../api/purchases'

const PurchasesDelete = ({ user, match, msgAlert }) => {
  const [ purchase, setPurchase ] = useState(null)

  useEffect(() => {
    showPurchase(user, match.id)
      .then(res => setPurchase(res.data.purchase))
      .catch(err => {
        msgAlert({
          heading: 'Cannot find purchase',
          message: `Error: ${err.message}`,
          variant: 'danger'
        })
      })
  })
}

export default PurchasesDelete
