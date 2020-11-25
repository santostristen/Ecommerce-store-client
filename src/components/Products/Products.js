import React, { useState } from 'react'
import { Button, Card, Row } from 'react-bootstrap'
import { createPurchase } from '../../api/purchases'

const Products = props => {
  const [ purchase, setPurchase ] = useState(null)

  const handlePurchase = e => {
    const { user, msgAlert } = props
    const productData = e.target.data.product
    setPurchase({ ...productData, owner: user._id })
    createPurchase(purchase, user.token)
      .then(msgAlert({
        heading: 'Purchase Successful',
        message: `You have successfully purchased ${purchase.productName}`,
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
      <Card className="col-5">
        <Card.Header>
          <Card.Title>Shanos</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.C98CEFNwrbi9ff79ndFs9wHaEK%26pid%3DApi&f=1" alt="Thanos with Shaq face"></Card.Img>
          <Card.Text>This meme is Thanos, but with the face of Shaq.</Card.Text>
          <Card.Text>$10.99</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button
            onClick={handlePurchase}
            data-product={{ productName: 'Shanos', productPrice: '$10.99', productDescription: 'This meme is Thanos, but with the face of Shaq.' }}
          >
            Purchase Now
          </Button>
        </Card.Footer>
      </Card>
      <Card className="col-5">
        <Card.Header>
          <Card.Title>Kitty Rocket</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.qR8zWtkJugP-jBJNb46R7QHaFb%26pid%3DApi&f=1" alt="Cat with cardoard rocketship costume"></Card.Img>
          <Card.Text>Check out our awesome Kitty Rocket</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button>Purchase Now</Button>
        </Card.Footer>
      </Card>
    </Row>
  )
}

export default Products
