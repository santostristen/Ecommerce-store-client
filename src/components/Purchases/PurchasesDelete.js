import React, { useEffect, useState } from 'react'
import { showPurchase, deletePurchase } from '../../api/purchases'

const PurchasesDelete = ({ user, match, msgAlert }) => {
  const [ purchase, setPurchase ] = useState(null)

  useEffect(() => {
    showPurchase(user, match.params.id)
      .then(res => setPurchase(res.data.purchase))
      .catch(err => {
        msgAlert({
          heading: 'Cannot find purchase',
          message: `Error: ${err.message}`,
          variant: 'danger'
        })
      })
  }, [])

  const handleDelete = () => {
    deletePurchase(user, match.params.id)
      .then(() => {
        msgAlert({
          heading: 'Purchase Deleted',
          message: 'See revised purchase list',
          variant: 'success'
        })
      })
      .then(() => history.push('/purchases'))
      .catch(err => {
        msgAlert({
          heading: 'Delete Fail',
          message: `Error: ${err.message}`,
          variant: 'danger'
        })
      })
  }
  return (
    <div>
      { purchase ? (
        <div>
          <h2>Are you sure you want to refund?</h2>
          <button onClick={handleDelete}>Refund</button>
        </div>
      ) : 'Loading...'}
    </div>
  )
}

export default PurchasesDelete
