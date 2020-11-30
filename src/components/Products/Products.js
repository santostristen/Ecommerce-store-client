import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { indexProducts } from '../../api/products'
import Product from '../Product/Product'

const Products = ({ user, msgAlert, addProduct }) => {
  const [ products, setProducts ] = useState(null)

  useEffect(() => {
    indexProducts(user.token)
      .then(res => {
        setProducts(res.data.products)
      })
      .then(() => {
        msgAlert({
          heading: 'Products Success',
          message: 'Check out our products',
          variant: 'success'
        })
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
          clicked={addProduct}
        />
      ))}
    </Row>
  )
}

export default Products
