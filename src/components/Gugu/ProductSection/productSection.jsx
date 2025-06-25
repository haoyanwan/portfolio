// components/ProductsSection.js
import React from "react";
import ProductCard from "../ProductCard/productCard";

const ProductsSection = ({ style, products }) => {
  return (
    <div className="veil" style={style}>
      <div className="company-product-group">
        <div className="company-product">产品介绍</div>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsSection;