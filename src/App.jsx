import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ProductList from "./components/Products/ProductList";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";
import jsonData from "./backend/products.json";

export default function App() {
  const products = jsonData;
  const [cart, setCart] = useState(
    (localStorage.getItem("cart-items") &&
      JSON.parse(localStorage.getItem("cart-items"))) ||
      []
  );
  const [isSearching, setIsSearching] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [cartClicked, setIsCartClicked] = useState(false);

  let cartItemCount = () => {
    let count = 0;
    for (let i = 0; i < cart.length; i++) {
      count += parseInt(cart[i].quantity);
    }

    return count;
  };

  useEffect(() => {
    localStorage.setItem("cart-items", JSON.stringify(cart));
  }, [cart]);

  function addToCart(productData) {
    const existingCartItem = cart.find((item) => item.id === productData.id);

    if (existingCartItem) {
      setCart((prevData) =>
        prevData.map((cartItem) =>
          cartItem.id === productData.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + +productData.quantity,
              }
            : cartItem
        )
      );
    } else {
      setCart((prevData) => [...prevData, productData]);
    }
  }

  function handleSearchInput(event) {
    const { value } = event.target;
    setSearchInput(value);
  }

  useEffect(() => {
    setIsSearching(() => (searchInput === "" ? false : true));
  }, [searchInput]);

  function handleCartClick() {
    setIsCartClicked((prevData) => !prevData);
  }

  return (
    <div className="wrapper">
      {cartClicked && (
        <Cart
          setCart={setCart}
          setIsCartClicked={setIsCartClicked}
          products={products}
          cartItems={cart}
        />
      )}

      {cartClicked || (
        <>
          <Navbar
            searchInput={searchInput}
            handleSearchInput={handleSearchInput}
            cartItemCount={cartItemCount()}
            handleCartClick={handleCartClick}
          />
          <ProductList
            searchInput={searchInput}
            isSearching={isSearching}
            products={products}
            addToCart={addToCart}
          />
        </>
      )}
    </div>
  );
}
