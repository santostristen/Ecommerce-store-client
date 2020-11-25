import React from 'react'
import { Row } from 'react-bootstrap'
import { createPurchase } from '../../api/purchases'
import Product from '../Product/Product'

const Products = props => {
  const { user, msgAlert } = props

  function handlePurchase (productData) {
    console.log(productData)
    createPurchase(productData, user.token)
      .then(msgAlert({
        heading: 'Purchase Successful',
        message: `You have successfully purchased ${productData.name}`,
        variant: 'success'
      }))
      .catch(err => {
        msgAlert({
          heading: 'Purchase Failure',
          message: `Error: ${err.message}`,
          variant: 'danger'
        })
      })
  }

  return (
    <Row className="justify-content-center">
      <h2 className="col-12">Our Products</h2>
      <Product
        name='Shanos'
        description='This meme is Thanos, but with the face of Shaq.'
        price='$10.99'
        imgSrc='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.C98CEFNwrbi9ff79ndFs9wHaEK%26pid%3DApi&f=1'
        imgAlt='Thanos with Shaq face'
        clicked={handlePurchase}
      />
      <Product
        name='Kitty Rocket'
        description='This meme is a Kitty dressed up as a rocket ship.'
        price='$8.99'
        imgSrc='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.qR8zWtkJugP-jBJNb46R7QHaFb%26pid%3DApi&f=1'
        imgAlt='Cat with cardoard rocketship costume'
        clicked={handlePurchase}
      />
    </Row>
  )
}

export default Products
