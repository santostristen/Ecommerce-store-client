import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { showRetailer, editRetailer } from '../../api/retailer'

const RetailerEdit = (props) => {
  const [retailer, setRetailer] = useState({ name: '', description: '' })
  const [updated, setUpdated] = useState(false)
  const { user, msgAlert, match } = props

  useEffect(() => {
    showRetailer(user, match.params.retailerId)
      .then(res => setRetailer(res.data.retailer))
      .then(() => msgAlert({
        heading: 'Retailer Show Success',
        message: 'Check it out',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Retailer Show failed',
        message: 'Error: ' + err.message,
        variant: 'danger'
      }))
  }, [])

  const handleChange = (event) => {
    const updatedField = { [event.target.name]: event.target.value }
    setRetailer(oldRetailer => {
      const updatedRetailer = { ...oldRetailer, ...updatedField }
      return updatedRetailer
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    editRetailer(user, retailer, match.params.retailerId)
      .then(() => setUpdated(true))
      .then(() => msgAlert({
        heading: 'Update successful',
        message: 'Nice work',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Update failed',
        message: 'Error: ' + err.message,
        variant: 'danger'
      }))
  }

  if (updated) {
    return (
      <Redirect to={'/retailers'} />
    )
  }

  return (
    <React.Fragment>
      <h1>Update Retailer</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Retailer Name Here"
          value={retailer.name}
          onChange={handleChange}
          name="name"
        />
        <input
          placeholder="Retailer Description Here"
          value={retailer.description}
          onChange={handleChange}
          name="description"
        />
        <button type="submit">Update Retailer</button>
      </form>
    </React.Fragment>
  )
}

export default RetailerEdit
