import React, { useState } from 'react'
import { createProduct } from '../../api/products'

const ProductCreate = ({ msgAlert, user }) => {
  const [ product, setProduct ] = useState({
    name: '',
    description: '',
    price: 0,
    imgSrc: '',
    imgAlt: ''
  })

  const handleSubmit = e => {
    e.preventDefault()
    createProduct(product, user.token)
      .then(msgAlert({
        heading: 'Product Created',
        message: 'You have successfully created a new meme',
        variant: 'success'
      }))
      .catch(err => {
        msgAlert({
          heading: 'Product Create Failure',
          message: `Error: ${err.message}`,
          variant: 'danger'
        })
      })
  }
  const handleChange = (event) => {
    const updatedField = { [event.target.name]: event.target.value }
    setProduct(prevReview => {
      const updatedReview = { ...prevReview, ...updatedField }
      return updatedReview
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        name="name"
        value={product.head}
        onChange={handleChange}
      />
      <input
        placeholder="Description"
        name="description"
        value={product.body}
        onChange={handleChange}
      />
      <input
        placeholder="Price"
        name="price"
        value={product.price}
        onChange={handleChange}
        type='Number'
      />
      <input
        placeholder="ImgSrc URL"
        name="imgSrc"
        value={product.imgSrc}
        onChange={handleChange}
      />
      <input
        placeholder="ImgAlt"
        name="imgAlt"
        value={product.imgAlt}
        onChange={handleChange}
      />
      <button type="submit">Create Product</button>
    </form>
  )
}

export default ProductCreate
