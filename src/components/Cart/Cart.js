import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import StripeButton from '../Stripe/Stripe'

const Cart = ({ cart, handlePurchase, removeProduct }) => {
  const totalPrice = cart.reduce((accumulator, curProduct) => {
    const totalPrice = accumulator + curProduct.price
    return totalPrice
  }, 0)

  return (
    <div>
      <h2 className="text-center">Your Cart</h2>
      {cart.length > 0 ? (
        <div>
          {cart.map(product => (
            <Card key={product._id + Math.random()}>
              <Card.Header>
                <Card.Title>{product.name}</Card.Title>
              </Card.Header>
              <Card.Body className="row col-12">
                <div className="col-8">
                  <Card.Img src={product.imgSrc} alt={product.imgAlt}></Card.Img>
                  <Card.Text>${product.price.toFixed(2)}</Card.Text>
                </div>
                <Button className="col-4" variant='outline-danger' onClick={removeProduct}>Remove Product</Button>
              </Card.Body>
            </Card>
          ))}
          <h3 className="mt-4">Total Price</h3>
          <h5>${totalPrice.toFixed(2)}</h5>
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
