import React, { useEffect, useState } from 'react'
import { showProduct } from '../../api/products'
import Product from '../Product/Product'
import StarRatingComponent from 'react-star-rating-component'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ProductShow = ({ user, msgAlert, match, addProduct }) => {
  const [ product, setProduct ] = useState(null)

  useEffect(() => {
    showProduct(user.token, match.params.id)
      .then(res => {
        setProduct(res.data.product)
      })
      .then(() => {
        msgAlert({
          heading: 'Show Product Success',
          message: 'Check out the reviews!',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Show Product Failure',
          message: `Error: ${err.message}`,
          variant: 'danger'
        })
      })
  }, [])

  return (
    <div>
      {product && (
        <div>
          <Product
            name={product.name}
            description={product.description}
            price={product.price}
            imgSrc={product.imgSrc}
            imgAlt={product.imgAlt}
            clicked={() => addProduct(product)}
          />
          <Link to={{ pathname: '/review-create', state: product._id }}><Button variant="success">Leave a Review</Button></Link>
          <div>
            {product.reviews.map(review => (
              <div className="border-dark" key={review._id}>
                <h4>{review.head}</h4>
                <p>{review.body}</p>
                <StarRatingComponent
                  name="review"
                  starCount={5}
                  value={review.rating}
                  editing={false}
                />
                {user._id === review.owner ? (
                  <div>
                    <Link to={{ pathname: `/review-update/${review._id}`, state: { productId: product._id } }}>
                      <Button variant='warning'>Edit Review</Button>
                    </Link>
                    <Link to={{ pathname: `/review-delete/${review._id}`, state: { productId: product._id } }}>
                      <Button variant='danger'>Delete Review</Button>
                    </Link>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductShow
