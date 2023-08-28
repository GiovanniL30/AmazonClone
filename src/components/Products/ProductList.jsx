import React from "react";
import Product from "./Product";
import "./product.css";

export default function ProductList(props) {
  let copyProducts = props.products;

  if (props.isSearching) {
    copyProducts = copyProducts.filter((product) =>
      product.keywords.some((keyword) => keyword.includes(props.searchInput))
    );
  }

  const products = copyProducts.map((product) => {
    return (
      <Product
        imageSrc={`src/${product.image}`}
        itemName={product.name}
        ratingImg={`src/images/ratings/rating-${product.rating.stars * 10}.png`}
        ratingCount={product.rating.count}
        price={Math.floor(product.priceCents / 100).toFixed(2)}
        handleClick={props.addToCart}
        id={product.id}
      />
    );
  });

  return <div className="items-grid">{products}</div>;
}
