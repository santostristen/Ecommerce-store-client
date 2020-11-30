import React from 'react'
import { Button } from 'react-bootstrap'

const Cart = ({ cart, handlePurchase, removeProduct, user }) => {
  return (
    <div>
      <h2>Your Shopping Cart</h2>
      {cart.map(product => (
        <div key={product._id}>
          <h5>{product.name}</h5>
          <p>{product.price}</p>
          <Button variant='outline-danger' onClick={removeProduct}>Remove</Button>
        </div>
      ))}
    </div>
  )
}

export default Cart
