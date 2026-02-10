import React from "react";
import "./Cart.css";

function Cart({ cart, increaseQty, decreaseQty, setShowCart, orderNow }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrder = () => {
    orderNow();          // shows alert + clears cart (from App.js)
    setShowCart(false);  // closes cart panel
  };

  return (
    <div className="cart-overlay">
      <div className="cart-panel">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button onClick={() => setShowCart(false)}>✖</button>
        </div>

        {cart.length === 0 ? (
          <p>No items added</p>
        ) : (
          cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.img} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>

                <div className="qty-controls">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>

              </div>
            </div>
          ))
        )}

        <div className="cart-footer">
          <h3>Total: ₹{total}</h3>

          {cart.length > 0 && (
            <button className="order-btn" onClick={handleOrder}>
              Order Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
