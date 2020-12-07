import React, { useEffect, useState } from 'react'
import { Button, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { indexProducts } from '../../api/products'
import Product from '../Product/Product'

const Products = ({ user, msgAlert, addProduct }) => {
  const [ products, setProducts ] = useState(null)

  useEffect(() => {
    indexProducts(user.token)
      .then(res => {
        setProducts(res.data.products)
      })
      .catch(err => {
        msgAlert({
          heading: 'Could not get products',
          message: 'Error: ' + err.message,
          variant: 'danger'
        })
      })
  }, [])

  return (
    <Row className="justify-content-center">
      <h2 className="col-12">Our Products</h2>
      {products && products.map(product => (
        <Product
          key={product._id}
          name={product.name}
          description={product.description}
          price={product.price}
          imgSrc={product.imgSrc}
          imgAlt={product.imgAlt}
          clicked={() => addProduct(product)}
        >
          <Link to={`/products/${product._id}`}><Button variant="outline-primary">See Details</Button></Link>
        </Product>
      ))}
    </Row>
  )
}

export default Products
