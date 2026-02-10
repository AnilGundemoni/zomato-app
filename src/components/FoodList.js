import React from "react";


function FoodList({ items, addToCart, cart }) {
  return (
    <div className="food-container">
      {items.map((item) => {
        const cartItem = cart.find((i) => i.id === item.id);

        return (
          <div key={item.id} className="food-card">

            {/* ✅ OFFER BADGE ONLY HERE */}
            {item.offer && <span className="offer-badge">{item.offer}</span>}

            <img src={item.img} alt={item.name} />
            <h3>{item.name}</h3>
            <p className="price">₹{item.price}</p>

            <p className="nutrition">
              🔥 {item.cal} cal | 💪 {item.pro}g | 🍞 {item.carb}g
            </p>

            {cartItem ? (
              <button className="added-btn">Added ✓</button>
            ) : (
              <button onClick={() => addToCart(item)} className="add-btn">
                Add to Cart
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default FoodList;
