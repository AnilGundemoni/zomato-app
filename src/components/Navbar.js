import React from "react";
import "./Navbar.css";

function Navbar({ setCategory, totalItems, setShowCart ,setSearch}) {
  return (
    <div className="navbar">
      <h2>Zomato</h2>

      <div className="nav-filters">
        <button onClick={() => setCategory("All")}>All</button>
        <button onClick={() => setCategory("Veg")}>Veg</button>
        <button onClick={() => setCategory("Non-Veg")}>Non-Veg</button>
        <button onClick={() => setCategory("Starters")}>Starters</button>
        <button onClick={() => setCategory("Tiffins")}>Tiffins</button>
      </div>
      <input
  type="text"
  placeholder="Search food..."
  onChange={(e) => setSearch(e.target.value)}
  className="search-bar"
/>


      {/* 🛒 CART ICON */}
      <div className="cart-icon" onClick={() => setShowCart(true)}>
        🛒
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
      </div>
    </div>
  );
}

export default Navbar;
