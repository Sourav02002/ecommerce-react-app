import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      let totalCartPrice = 0
      for (let i = 0; i < cartList.length; i += 1) {
        totalCartPrice += cartList[i].price * cartList[i].quantity
      }
      const showEmptyView = cartList.length === 0
      // TODO: Update the functionality to remove all the items in the cart

      const onClickRemoveAll = () => {
        removeAllCartItems()
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <div className="remove-all-btn-container">
                  <button
                    type="button"
                    onClick={onClickRemoveAll}
                    className="remove-all-btn"
                  >
                    Remove All
                  </button>
                </div>
                <CartListView />
                {/* TODO: Add your code for Cart Summary here */}
                <div className="cart-summary-container">
                  <div className="">
                    <h1 className="order-total-text">
                      Order Total:{' '}
                      <span className="price-text">Rs {totalCartPrice}/-</span>
                    </h1>
                    <p className="items-in-cart-text">
                      {cartList.length} Items in cart
                    </p>
                    <button type="button" className="checkout-btn">
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
