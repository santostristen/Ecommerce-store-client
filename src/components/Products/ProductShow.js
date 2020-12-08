import React, { useEffect, useState } from 'react'
import { showProduct } from '../../api/products'
import Product from '../Product/Product'
import StarRatingComponent from 'react-star-rating-component'
import { Button, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ProductShow = ({ user, msgAlert, match, addProduct }) => {
  const [ product, setProduct ] = useState(null)

  useEffect(() => {
    showProduct(user.token, match.params.id)
      .then(res => {
        setProduct(res.data.product)
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
    <Row className="justify-content-center">
      {product && (
        <Row className="justify-content-center">
          <Product
            class="col-12 mt-4"
            name={product.name}
            description={product.description}
            price={product.price}
            imgSrc={product.imgSrc}
            imgAlt={product.imgAlt}
            clicked={() => addProduct(product)}
          />
          <Link className="col-12 text-center" to={{ pathname: '/review-create', state: product._id }}><Button variant="success">Leave a Review</Button></Link>
          <Row className="justify-content-center col-12 mt-4">
            {product.reviews.map(review => (
              <div className="col-5 mx-4 p-4 shadow rounded" key={review._id}>
                <h4>{review.head}</h4>
                <StarRatingComponent
                  name="review"
                  starCount={5}
                  value={review.rating}
                  editing={false}
                />
                <p>{review.body}</p>
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
          </Row>
        </Row>
      )}
    </Row>
  )
}

export default ProductShow
