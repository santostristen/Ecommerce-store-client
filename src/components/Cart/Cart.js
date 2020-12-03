import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import StripeButton from '../Stripe/Stripe'

const Cart = ({ cart, handlePurchase, removeProduct }) => {
  const totalPrice = cart.reduce((accumulator, curProduct) => {
    const totalPrice = accumulator + curProduct.price
    return totalPrice
  }, 0)

  return (
    <div>
      <h2>Your Shopping Cart</h2>
      {cart.length > 0 ? (
        <div>
          {cart.map(product => (
            <div key={product._id + Math.random()}>
              <h5>{product.name}</h5>
              <p>${product.price.toFixed(2)}</p>
              <Button variant='outline-danger' onClick={removeProduct}>Remove Product</Button>
            </div>
          ))}
          <h6>Total Price</h6>
          <p>${totalPrice.toFixed(2)}</p>
          <StripeButton
            cart={cart}
            onCheckout={handlePurchase}
            totalPrice={totalPrice}
          >Checkout</StripeButton>
        </div>
      ) : (
        <div>
          <h4>Cart is empty</h4>
          <p>Please add items to your cart</p>
          <Link to="/products"><Button variant="primary">See Products</Button></Link>
        </div>
      )}
    </div>
  )
}

export default Cart
