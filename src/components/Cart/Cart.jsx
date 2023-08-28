import React, { useEffect } from "react";
import CartHeader from "./CartHeader";
import { useState } from "react";
import "./cart.css";

export default function Cart(props) {
  const [cartItems, setCartItems] = useState(
    props.cartItems.map((item) => {
      const cartItem = props.products.find((product) => product.id === item.id);

      if (cartItem) {
        return {
          ...cartItem,
          quantity: item.quantity,
        };
      }
    })
  );

  const [updateInput, setUpdateInput] = useState(1);
  const [isUpdating, setIsUpdating] = useState({
    id: "",
    value: false,
  });

  function deleteCartItem(id) {
    setCartItems((prevData) => {
      return prevData.filter((item) => item.id !== id);
    });
  }

  console.log(isUpdating.id);
  useEffect(() => {
    props.setCart(cartItems);
  }, [cartItems]);

  function handleUpdate(id) {
    setIsUpdating((prev) => ({ value: !prev.value, id: id }));
  }

  function saveUpdate() {
    setCartItems((prevData) => {
      return prevData.map((item) => {
        return isUpdating.id === item.id
          ? { ...item, quantity: parseInt(updateInput) }
          : item;
      });
    });

    setIsUpdating((prev) => ({ id: "", value: !prev.value }));
    setUpdateInput(1);
  }

  function handleChange(event) {
    const { value } = event.target;
    setUpdateInput(value);
  }

  const items = cartItems.map((cartItem) => {
    return (
      <div className="cart-item-container">
        <h1 className="delivery-due">August 21, 2023</h1>

        <div className="item-wrapper">
          <div className="cart-item-info">
            <img
              className="cart-image"
              src={`src/${cartItem.image}`}
              alt={cartItem.name}
            />
            <div className="text-info">
              <h3 className="item-name">{cartItem.name}</h3>
              <p className="item-price">
                $
                {Math.floor(
                  (cartItem.priceCents / 100) * cartItem.quantity
                ).toFixed(2)}
              </p>
              <div className="delete-update-container">
                <h3 className="item-quantity">Quantity: {cartItem.quantity}</h3>

                {!isUpdating.value ? (
                  <p
                    onClick={() => handleUpdate(cartItem.id)}
                    className="update"
                  >
                    Update
                  </p>
                ) : (
                  cartItem.id === isUpdating.id && (
                    <input
                      className="quantity-update"
                      type="number"
                      name="newQuantity"
                      min={1}
                      onChange={handleChange}
                      value={updateInput}
                    />
                  )
                )}

                <p
                  onClick={
                    isUpdating.value
                      ? saveUpdate
                      : () => deleteCartItem(cartItem.id)
                  }
                  className={isUpdating.value ? "save" : "delete"}
                  style={{
                    display:
                      isUpdating.value && isUpdating.id !== cartItem.id
                        ? "none"
                        : "block",
                  }}
                >
                  {isUpdating.value ? "Save" : "Delete"}
                </p>
              </div>
            </div>
          </div>

          <div className="delivery-options-container">
            <h3 className="choose-title">Choose a delivery option:</h3>

            <div className="option-container">
              <div className="option">
                <input type="radio" name={cartItem.id} />
                <label>
                  <p>Tuesday, June 21</p>
                  <p>Free Shipping</p>
                </label>
              </div>
              <div className="option">
                <input type="radio" name={cartItem.id} />
                <label>
                  <p>Tuesday, June 21</p>
                  <p>Free Shipping</p>
                </label>
              </div>
              <div className="option">
                <input type="radio" name={cartItem.id} />
                <label>
                  <p>Tuesday, June 21</p>
                  <p>Free Shipping</p>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="cart-items-container">
      <CartHeader
        cartItems={cartItems.length}
        setIsCartClicked={props.setIsCartClicked}
      />
      {cartItems.length > 0 ? items : <h1> No Items</h1>}
    </div>
  );
}
