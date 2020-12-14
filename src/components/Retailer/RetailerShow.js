import React, { useState, useEffect } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import { showRetailer, deleteRetailer } from '../../api/retailer'

const RetailerShow = (props) => {
  const [retailer, setRetailer] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const { user, msgAlert, match } = props

  useEffect(() => {
    showRetailer(user, match.params.retailerId)
      .then(res => {
        setRetailer(res.data.retailer)
      })
      .then(() => {
        msgAlert({
          heading: 'Show Retailer Success',
          message: 'See the retailer there!',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Show Retailer Failed :(',
          message: 'Error code: ' + err.message,
          variant: 'danger'
        })
      })
  }, [])

  const handleDelete = () => {
    deleteRetailer(user, match.params.retailerId)
      .then(() => {
        msgAlert({
          heading: 'Retailer Deleted',
          message: 'nice',
          variant: 'success'
        })
      })
      .then(() => setDeleted(true))
      .catch(err => {
        msgAlert({
          heading: 'Deletion Failed',
          message: 'Something went wrong: ' + err.message,
          variant: 'danger'
        })
      })
  }

  if (deleted) {
    return (
      <Redirect to='/retailers' />
    )
  }

  return (
    <div>
      {retailer ? (
        <div>
          <h2>{retailer.name}</h2>
          <p>{retailer.description}</p>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : 'Loading...'}
    </div>
  )
}

export default withRouter(RetailerShow)
