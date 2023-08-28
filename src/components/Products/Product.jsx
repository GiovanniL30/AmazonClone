import React from "react";
import { useState } from "react";

export default function Product(props) {
  const [productData, setProductData] = useState({
    quantity: 1,
    id: props.id,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setProductData((prevData) => {
      return {
        ...prevData,
        [name]: parseInt(value),
      };
    });
  }

  return (
    <div className="item-container">
      <img
        className="product-image"
        src={props.imageSrc}
        alt={props.itemName}
      />
      <div className="item-info">
        <h3 className="item-name">{props.itemName}</h3>
        <div className="rating">
          <img className="rating-img" src={props.ratingImg} alt="" />
          <span className="rating-count">{props.ratingCount}</span>
        </div>
        <p className="price">${props.price}</p>

        <div className="quantity-button">
          <select
            onChange={handleChange}
            className="selection"
            name="quantity"
            id="quantity"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
          <button
            onClick={() => props.handleClick(productData)}
            className="add-to-cart"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
