import React, { useState } from "react";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import FoodList from "./components/FoodList";
import Cart from "./components/Cart";
import { foodItems } from "./data";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All");
  const [showCart, setShowCart] = useState(false);
  const [search, setSearch] = useState("");


  // ✅ FILTER ITEMS
  const filteredItems = foodItems.filter((item) => {
  const matchesCategory =
    category === "All" ||
    item.category.replace("-", "").toLowerCase() ===
      category.replace("-", "").toLowerCase();

  const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());

  return matchesCategory && matchesSearch;
});

  

  // ✅ ADD TO CART
  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // ✅ INCREASE QTY
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // ✅ DECREASE QTY
  const decreaseQty = (id) => {
  setCart((prev) => {
    const updatedCart = prev
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    // ⭐ IF CART BECOMES EMPTY → CLOSE DRAWER
    if (updatedCart.length === 0) {
      setShowCart(false);
    }

    return updatedCart;
  });
};

  

  // ✅ ⭐ ORDER NOW FUNCTION (THIS WAS MISSING)
  const orderNow = () => {
    alert("Order placed successfully!");
    setCart([]); // clears cart
    setShowCart(false); // close cart drawer
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // LOGIN PAGE
  if (!isLoggedIn) return <Login setIsLoggedIn={setIsLoggedIn} />;

  return (
    <div className="app">
      <Navbar
        setCategory={setCategory}
        totalItems={totalItems}
        setShowCart={setShowCart}
        setSearch={setSearch}
      />

      <FoodList
        items={filteredItems}
        addToCart={addToCart}
        cart={cart}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
      />

      {showCart && (
        <Cart
          cart={cart}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
          setShowCart={setShowCart}
          orderNow={orderNow}  // ✅ passed correctly
        />
      )}
    </div>
  );
}

export default App;
