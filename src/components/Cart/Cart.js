import React from 'react'
import { Button } from 'react-bootstrap'

const Cart = ({ cart, handlePurchase, removeProduct }) => {
  return (
    <div>
      <h2>Your Shopping Cart</h2>
      {cart.map(product => (
        <div key={product._id}>
          <h5>{product.name}</h5>
          <p>{product.price}</p>
          <Button variant='outline-danger' onClick={removeProduct}>Remove Product</Button>
        </div>
      ))}
      <h6>Total Price</h6>
      <p>$
        {cart.reduce((accumulator, curProduct) => {
          accumulator += curProduct.price
        })}
      </p>
      <Button variant='primary' onClick={handlePurchase}>Purchase Cart</Button>
    </div>
  )
}

export default Cart
