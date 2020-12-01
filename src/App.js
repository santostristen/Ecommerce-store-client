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

import Products from './components/Products/Products'
import Account from './components/Account/Account'
import PurchasesIndex from './components/Purchases/PurchasesIndex'
import PurchasesShow from './components/Purchases/PurchasesShow'
import { createPurchase } from './api/purchases'
import Cart from './components/Cart/Cart'
import PurchasesDelete from './components/Purchases/PurchasesDelete'

class App extends Component {
  constructor () {
    super()
    this.state = {
      user: null,
      msgAlerts: [],
      cart: []
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

    console.log(purchaseData)

    createPurchase(purchaseData, user.token)
      .then(this.msgAlert({
        heading: 'Purchase Successful',
        message: 'You have successfully purchased everything in your cart',
        variant: 'success'
      }))
      .catch(err => {
        this.msgAlert({
          heading: 'Purchase Failure',
          message: `Error: ${err.message}`,
          variant: 'danger'
        })
      })
  }

  addProduct = product => {
    this.setState(prevState => {
      prevState.cart.push(product)
      return prevState
    })
    console.log(this.state.cart)
  }

  removeProduct = index => {
    this.setState(prevState => {
      prevState.cart.splice(index, 1)
      return prevState
    })
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

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
          <AuthenticatedRoute user={user} path='/products' render={() => (
            <Products msgAlert={this.msgAlert} user={user} addProduct={this.addProduct}/>
          )} />
          <AuthenticatedRoute user={user} path='/account' render={() => (
            <Account msgAlert={this.msgAlert} user={user} />
          )} />
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
          <AuthenticatedRoute user={user} path='/cart' render={props => (
            <Cart
              user={user}
              msgAlert={this.msgAlert}
              cart={this.state.cart}
              handlePurchase={this.handlePurchase}
              removeProduct={this.removeProduct}
            />
          )} />
          <AuthenticatedRoute user={user} path='/purchase-delete/:id' render={() => (
            <PurchasesDelete msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
