import React from 'react'
import { Card, Button } from 'react-bootstrap'

const Product = props => (
  <React.Fragment>
    <Card className="col-5">
      <Card.Header>
        <Card.Title>{props.name}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Img src={props.imgSrc} alt={props.imgAlt}></Card.Img>
        <Card.Text>{props.description}</Card.Text>
        <Card.Text>${props.price.toFixed(2)}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button onClick={props.clicked}>Add to Cart</Button>
        {props.children && props.children}
      </Card.Footer>
    </Card>
  </React.Fragment>
)

export default Product
