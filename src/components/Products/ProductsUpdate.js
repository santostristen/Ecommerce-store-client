import React, { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap'
import { showPurchase, updatePurchase } from '../../api/purchases'
import { Redirect } from 'react-router-dom'


const PurchaseUpdate = (props) => {
  const [purchase, setPurchase] = useState({ price: '', name: '', description: '' })
  const [updated, setUpdated] = useState(false)
  const { user, msgAlert, match } = props

  useEffect(() => {
    // *is match.params.token right?
    // **Not sure if I need all of the show but it was in a template
    showPurchase(user, match.params.token)
      .then(res => setPurchase(res.data.purchase))
      .then(() => msgAlert({
        heading: 'Purchase Show Successful',
        message: `${purchase.name}`,
        varient: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Show Failure',
        message: `Error: ${err.message}`,
        variant: 'danger'
      }))
  }, [])

const handleChange = (event) => {
    const updatedValues = { [event.target.name]: event.target.value }
    setPurchase(prevPurchase => {
      const updatedPurchase = { ...prevPurchase, ...updatedValues }
      return updatedPurchase
    })
  }
const handleSubmit = (event) => {
    event.preventDefault()

    updatePurchase(user, purchase, match.params.token
      .then(() => setUpdated(true))
      .then(() => msgAlert({
        heading: 'Update Successfully',
        message: `You have successfully purchased ${purchase.name}`,
        varient: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Update Failure',
        message: `Error: ${err.message}`,
        variant: 'danger'
      }))
    )
  }

  if(updated) {
    return (
      <Redirect to={`/purchases/${match.params.token}`} />
    )
  }
  return (
    <React.Fragment>
    <h1>Our Products</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Purchase Item"
          value= {purchase.name}
          onChange={handleChange}
          name="name"
        />
        <input
          placeholder="Price"
          value={purchase.price}
          onChange={handleChange}
          name="price"
        />
        <input
          placeholder="Description"
          value={purchase.description}
          onChange={handleChange}
          name="description"
        />
//         {  // imgSrc='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.qR8zWtkJugP-jBJNb46R7QHaFb%26pid%3DApi&f=1'
//         // imgAlt='Cat with cardoard rocketship costume'}
// }
        <button type="submit">Update Purchase</button>
      </form>
      </React.Fragment>

    )
}

export default PurchaseUpdate
