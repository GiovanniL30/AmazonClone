import React, { useEffect } from "react";
import { useState } from "react";
import "./navbar.css";

export default function Navbar({
  cartItemCount,
  handleSearchInput,
  searchInput,
  handleCartClick,
}) {
  return (
    <nav>
      <img className="logo" src="src/images/amazon-logo-white.png" alt="" />

      <div className="search-box">
        <input
          onChange={handleSearchInput}
          type="text"
          className="search-input"
          name="searchInput"
          value={searchInput}
        />
        <button className="search-btn">
          <img src="src/images/icons/search-icon.png" alt="" />
        </button>
      </div>

      <div className="cart-container">
        <button className="return-orders">Returns & orders</button>
        <button onClick={handleCartClick} className="cart">
          <img src="src/images/icons/cart-icon.png" alt="" />
          <p>Cart</p>
        </button>
        <span className="cart-count">{cartItemCount > 0 && cartItemCount}</span>
      </div>
    </nav>
  );
}
