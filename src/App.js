import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeAllCartItems = () => {
    this.setState({
      cartList: [],
    })
  }

  addCartItem = product => {
    const {cartList} = this.state
    const productExists = cartList.find(eachItem => eachItem.id === product.id)
    if (productExists !== undefined) {
      const updatedCartList = cartList.map(eachProduct => {
        if (eachProduct.id === product.id) {
          return {
            ...eachProduct,
            quantity: eachProduct.quantity + product.quantity,
          }
        }
        return eachProduct
      })
      this.setState({cartList: updatedCartList})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({
      cartList: updatedCartList,
    })
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(eachCartItem => {
      if (eachCartItem.id === id) {
        return {...eachCartItem, quantity: eachCartItem.quantity + 1}
      }
      return eachCartItem
    })
    this.setState({
      cartList: updatedCartList,
    })
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(eachCartItem => {
      if (eachCartItem.id === id) {
        return {...eachCartItem, quantity: eachCartItem.quantity - 1}
      }
      return eachCartItem
    })
    this.setState({
      cartList: updatedCartList,
    })
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
