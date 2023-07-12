import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Main = styled.main`
  margin: 24px 76px;

  .product-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  .product-card {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .product-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 5px;
  }

  .product-info {
    padding: 10px;
  }

  .product-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .product-type {
    font-size: 14px;
    color: #888888;
  }

  .bookmark-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
  }

  .modal-content {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 5px;
    max-width: 400px;
    text-align: center;
  }

  .modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }

  .filter-buttons {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    border: 1px solid black;
    height: 50px;

    button {
      margin-right: 10px;
    }
  }

  .toast {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #000000;
    color: #ffffff;
    padding: 10px 20px;
    border-radius: 5px;
    z-index: 11;
  }
`;

const ProductsListPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [bookmarkedProductIds, setBookmarkedProductIds] = useState([]);
  const [showToast, setShowToast] = useState(false);

  // Fetch products from server
  useEffect(() => {
    fetch('http://example.com/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }, []);

  // Filter products by selected type
  useEffect(() => {
    if (selectedType === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.type === selectedType));
    }
  }, [products, selectedType]);

  const isProductBookmarked = (productId) => {
    return bookmarkedProductIds.includes(productId);
  };

  const toggleBookmark = (productId) => {
    if (isProductBookmarked(productId)) {
 
      setBookmarkedProductIds((prevIds) => prevIds.filter((id) => id !== productId));
      setShowToast(true);
    } else {

      setBookmarkedProductIds((prevIds) => [...prevIds, productId]);
      setShowToast(true);
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Main>
      <h2>Products List</h2>
      <div className="filter-buttons">
        <img className=''  src='이미지.png'/>All
        <button onClick={() => setSelectedType('product')}>Product</button>
        <button onClick={() => setSelectedType('category')}>Category</button>
        <button onClick={() => setSelectedType('planning')}>Planning</button>
        <button onClick={() => setSelectedType('brand')}>Brand</button>
      </div>
      
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} className="product-img" alt={product.title} />
            <div className="product-info">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-type">Type: {product.type}</p>
              <img
                src={isProductBookmarked(product.id) ? 'bookmark-on.png' : 'bookmark-off.png'}
                className="bookmark-icon"
                alt="Bookmark"
                onClick={() => toggleBookmark(product.id)}
              />
            </div>
            <button onClick={() => openModal(product)}>View Image</button>
          </div>
        ))}
      </div>
      
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <img src={selectedProduct.image} alt={selectedProduct.title} />
            <button className="modal-close" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      {showToast && (
        <div className="toast">
          {isProductBookmarked(selectedProduct.id) ? 'Product bookmarked!' : 'Product removed from bookmarks!'}
        </div>
      )}
    </Main>
  );
};

export default ProductsListPage;
