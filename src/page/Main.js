import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Modal from './modal';


const Header = styled.header`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  box-shadow: 0px 10px 5px -2px rgb(216, 216, 216);
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 2; 
  .hdcs {
    margin: 25px 12px 25px 76px;
  }
  .hdt {
    font-size: xx-large;
    margin-right: 1170px;
    font-weight: bolder;
  }
  .dropdown-button{
    cursor: pointer;
  }
`;
const Footer = styled.footer`
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 58px;
  p{
  margin: 0;
  color: gray;
}
`;
const Main = styled.main`
  margin: 24px 76px;
  z-index: 1;
  .product-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(1, 1fr);
    gap: 20px;
  }

  .product-card {
  position: relative;
  width: 100%;
  height: 100%;
}
  .productimg{
  width: 360px;
  height: 240px;
  border-radius: 15px;
}
  .discount-percentage{
  color: #452cdd;
}
  .aa{
  font-weight: 900;
}
  .bookmark-icon{
  position: absolute;
  bottom: 40px;
  right: 20px;
  width: 30px;
  height: 30px;
  z-index: 1;
}
`;
const DropdownMenu = styled.div`
  position: absolute;
  top: 80%;
  right: 5rem;
  padding: 20px;
  width:180px;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  z-index: 3; 
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); 
  .dropd {
      border-bottom: 1px solid #ccc;
      padding-bottom: 8px;
      margin-bottom: 8px;
  }
  .a{
    display:flex;
    justify-content:center;
  }
`;


function MainPage() {
  const [products, setProducts] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleImageClick = (imageUrl) => {
    setModalImageUrl(imageUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  const toggleBookmark = (productId) => {
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            isBookmarked: !product.isBookmarked,
          };
        }
        return product;
      });
    });
  };
  
  const unbookmarkedProducts = products.filter((product) => !product.isBookmarked);

  useEffect(() => {
    fetch('http://cozshopping.codestates-seb.link/api/v1/products?count=8')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="main-page">
    <Header>
      <Link to='/'>
      <img className='hdcs' src='로고.png'/>
      </Link>
      <span className='hdt'>COZ Shopping</span>
      <div className="dropdown">
  <img src="햄버거버튼.png" className="dropdown-button" onClick={toggleDropdown} />
  {isDropdownOpen && (
  <DropdownMenu>
  <div className="dropd a">이성민님, 안녕하세요!</div>
  <Link to="/products/list" className="dropd a">
    <img src="상품아이콘.png" alt="상품 아이콘" />
    상품 리스트 페이지
  </Link>
  <Link to="/bookmark" className="a">
    <img src="북마크아이콘.png" alt="북마크 아이콘" />
    북마크 페이지
  </Link>
</DropdownMenu>
  )}
</div>
    </Header>
      <Main>
      <h2>상품 리스트</h2>
        <div className="product-list">
          {unbookmarkedProducts.slice(0, 4).map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image_url ? product.image_url : product.brand_image_url} className="productimg" alt={product.title} />
              <div className="product-info">
                <div className="info-left">
                  <span className="title aa">{product.title}</span>
                  <span className="sub-title aa">{product.sub_title}</span>
                  <span className="brand-name aa">{product.brand_name}</span>
                </div>
                <div className="info-right">
                  <img
                    src={product.isBookmarked ? '북마크on.png' : '북마크off.png'}
                    className="bookmark-icon"
                    onClick={() => toggleBookmark(product.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <h2>북마크 리스트</h2>
        <div className="product-list">
          {unbookmarkedProducts.slice(4, 8).map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image_url ? product.image_url : product.brand_image_url}  className="productimg" alt={product.title} />
              <div className="product-info">
                <div className="info-left">
                  <span className="title aa">{product.title}</span>
                  <span className="sub-title aa">{product.sub_title}</span>
                  <span className="brand-name aa">{product.brand_name}</span>
                </div>
                <div className="info-right">
                  <img
                    src={'북마크on.png'}
                    className="bookmark-icon"
                    onClick={() => toggleBookmark(product.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Main>
      <Footer>
        <p>개인정보 처리방침 | 이용 약관</p>
        <p>All rights reserved @ Codestates</p>
      </Footer>
      {showModal && (
        <Modal imageUrl={modalImageUrl} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default MainPage;
