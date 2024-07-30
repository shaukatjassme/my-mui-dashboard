import React from 'react';
import ProductList from '../components/ProductList';

const ProductsPage = ({ handleAddToCart }) => {
  return (
    <ProductList handleAddToCart={handleAddToCart} />
  );
};

export default ProductsPage;
