import React from "react";
import "./cartheader.css";

export default function CartHeader(props) {
  return (
    <header>
      <img
        onClick={() => props.setIsCartClicked(false)}
        className="cart-logo"
        src="src/images/amazon-logo.png"
        alt=""
      />
      <h2 className="checkout-count">
        Checkout {props.cartItems > 0 && `(${props.cartItems})`}
      </h2>
      <img
        className="lock-icon"
        src="src/images/icons/checkout-lock-icon.png"
        alt=""
      />
    </header>
  );
}
