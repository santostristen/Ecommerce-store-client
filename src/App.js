import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'

import Products from './components/Products/ProductsIndex'
import ProductShow from './components/Products/ProductShow'
import Account from './components/Account/Account'
import PurchasesIndex from './components/Purchases/PurchasesIndex'
import PurchasesShow from './components/Purchases/PurchasesShow'
import { createPurchase } from './api/purchases'
import Cart from './components/Cart/Cart'
import PurchasesDelete from './components/Purchases/PurchasesDelete'
import EditReview from './components/Reviews/ReviewsEdit'
import ReviewsDelete from './components/Reviews/ReviewsDelete'
import CreateReview from './components/Reviews/ReviewsCreate'
import ProductCreate from './components/Products/ProductsCreate'
import { loadStripe } from '@stripe/stripe-js'
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51HtJM1Kr9AmqVFZO9h6JePYnZ0DlleDYm70kqle6Y7YMeKjEjNYGXCxPkRtMZw2ySpM57xbzSxwvKJoZNyekhW6f000TXLdiMb')

class App extends Component {
  constructor () {
    super()
    this.state = {
      user: null,
      msgAlerts: [],
      cart: []
    }
  }

  componentDidMount () {
    this.tryAutoSignIn()
  }

  handleStripe = async (event) => {
  // Get Stripe.js instance
    const stripe = await stripePromise

    // Call your backend to create the Checkout Session
    const response = await fetch('http://localhost:4741/create-checkout-session', {
      method: 'POST',
      body: { totalPrice: () => this.totalPrice() }
    })

    const session = await response.json()

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    })

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  }

  handlePurchase = () => {
    const { cart, user } = this.state
    const totalPrice = cart.reduce((accumulator, curProduct) => {
      const totalPrice = accumulator + curProduct.price
      return totalPrice
    }, 0)
    const productTally = cart.reduce((accumulator, curProduct) => {
      accumulator[curProduct.name] = (accumulator[curProduct.name] || 0) + 1
      return accumulator
    }, {})
    // const fruitTally = fruit.reduce((currentTally, currentFruit) => {
    //   currentTally[currentFruit] = (currentTally[currentFruit] || 0) + 1
    //   return currentTally
    // } , {})
    const purchaseData = { totalPrice, productTally }

    createPurchase(purchaseData, user.token)
      .then(this.msgAlert({
        heading: 'Purchase Successful',
        message: 'You have successfully purchased everything in your cart',
        variant: 'success'
      }))
      .then(() => this.setState({ cart: [] }))
      .catch(err => {
        this.msgAlert({
          heading: 'Purchase Failure',
          message: `Error: ${err.message}`,
          variant: 'danger'
        })
      })
  }

  // handlePurchase = () => {
  //   const { cart, user } = this.state
  //   const totalPrice = cart.reduce((accumulator, curProduct) => {
  //     const totalPrice = accumulator + curProduct.price
  //     return totalPrice
  //   }, 0)
  //   const productTally = cart.reduce((accumulator, curProduct) => {
  //     accumulator[curProduct.name] = (accumulator[curProduct.name] || 0) + 1
  //     return accumulator
  //   }, {})
  // const fruitTally = fruit.reduce((currentTally, currentFruit) => {
  //   currentTally[currentFruit] = (currentTally[currentFruit] || 0) + 1
  //   return currentTally
  // } , {})
  // const purchaseData = { totalPrice, productTally }

  // console.log(purchaseData)

  //   createPurchase(purchaseData, user.token)
  //     .then(this.msgAlert({
  //       heading: 'Purchase Successful',
  //       message: 'You have successfully purchased everything in your cart',
  //       variant: 'success'
  //     }))
  //     .then(() => this.setState({ cart: [] }))
  //     .catch(err => {
  //       this.msgAlert({
  //         heading: 'Purchase Failure',
  //         message: `Error: ${err.message}`,
  //         variant: 'danger'
  //       })
  //     })
  // }

  addProduct = product => {
    this.setState(prevState => {
      prevState.cart.push(product)
      return prevState
    })
    this.msgAlert({
      heading: 'Add to Cart Successful',
      message: `${product.name} is now in your cart.`,
      variant: 'success'
    })
  }

  removeProduct = index => {
    this.setState(prevState => {
      prevState.cart.splice(index, 1)
      return prevState
    })
  }

  setUser = user => {
    this.setState({ user })
    localStorage.setItem('user', JSON.stringify(user))
  }

  clearUser = () => {
    this.setState({ user: null })
    localStorage.removeItem('user')
  }

  tryAutoSignIn = () => {
    if (localStorage.getItem('user') && !this.state.user) {
      this.setState({ user: JSON.parse(localStorage.getItem('user')) })
    }
  }

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          {/* AUTH ROUTES */}
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          {/* PRODUCTS */}
          <AuthenticatedRoute user={user} exact path='/products' render={() => (
            <Products msgAlert={this.msgAlert} user={user} addProduct={this.addProduct}/>
          )} />
          <AuthenticatedRoute user={user} path='/products/:id' render={props => (
            <ProductShow msgAlert={this.msgAlert} user={user} addProduct={this.addProduct} match={props.match}/>
          )} />
          <AuthenticatedRoute user={user} path='/products-create' render={() => (
            <ProductCreate msgAlert={this.msgAlert} user={user} />
          )} />
          {/* PURCHASES */}
          <AuthenticatedRoute user={user} exact path='/purchases' render={() => (
            <PurchasesIndex msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/purchases/:id' render={props => (
            <PurchasesShow
              user={user}
              msgAlert={this.msgAlert}
              match={props.match}
            />
          )} />
          <AuthenticatedRoute user={user} path='/purchase-delete/:id' render={() => (
            <PurchasesDelete msgAlert={this.msgAlert} user={user} />
          )} />
          {/* REVIEWS */}
          <AuthenticatedRoute user={user} path='/review-update/:reviewId' render={props => (
            <EditReview msgAlert={this.msgAlert} user={user} match={props.match} location={props.location} />
          )} />
          <AuthenticatedRoute user={user} path='/review-delete/:reviewId' render={props => (
            <ReviewsDelete msgAlert={this.msgAlert} user={user} match={props.match} location={props.location} history={props.history}/>
          )} />
          <AuthenticatedRoute user={user} path='/review-create' render={(props) => (
            <CreateReview msgAlert={this.msgAlert} user={user} location={props.location} />
          )} />
          {/* OTHER */}
          <AuthenticatedRoute user={user} path='/account' render={() => (
            <Account msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/cart' render={props => (
            <Cart
              user={user}
              msgAlert={this.msgAlert}
              cart={this.state.cart}
              handlePurchase={this.handlePurchase}
              handleStripe={this.handleStripe}
              removeProduct={this.removeProduct}
            />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
