import React from 'react'
import { Button } from 'react-bootstrap'
import StripeCheckout from 'react-stripe-checkout'

const StripeButton = ({ totalPrice, onCheckout }) => {
  const stripePrice = totalPrice * 100
  const publishableKey = 'pk_test_51HtJM1Kr9AmqVFZO9h6JePYnZ0DlleDYm70kqle6Y7YMeKjEjNYGXCxPkRtMZw2ySpM57xbzSxwvKJoZNyekhW6f000TXLdiMb'

  return (
    <StripeCheckout
      label='Checkout'
      name='Memes'
      image='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.C98CEFNwrbi9ff79ndFs9wHaEK%26pid%3DApi&f=1'
      description={`Your total is $${totalPrice.toFixed(2)}`}
      amount={stripePrice}
      panelLabel='Checkout'
      token={onCheckout}
      stripeKey={publishableKey}
    >
      <Button variant="success" size="lg">
        <span className='p-10'>Checkout</span>
      </Button></StripeCheckout>
  )
}

export default StripeButton
