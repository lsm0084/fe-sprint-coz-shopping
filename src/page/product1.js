import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  .bookmark-message{
    position:fixed;
    right:1rem;
    bottom:1rem;
    z-index:29381038139103812;
    background-color:white;
    width:300px;
    height:50px;
    border-radius:15px;
    font-weight:bold;
    box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.3);
    display:flex;
    align-items:center;
    justify-content:center;
  }
  .c0{
    margin-right:10px;
  }
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(240, 240, 240, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:19191919;
}

.modal-image {
  width: 750px;
  height: 500px;
  border-radius: 15px;
}

.modal-content .exitBtn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}
.modalbookmark{
 position:fixed;
 z-index:211312312312;
 left:29%;
 bottom:22%;
}
  .type{
    display:flex;
    justify-content:center;
  }
  .t1, .t2, .t3, .t4, .t5{
    margin: 5px 20px;
    display:flex;
  }
  .t1, .t2, .t3, .t4, .t5:hover{
    cursor: pointer;
  }
  .f1, .f2, .f3, .f4, .f5{
    display:flex;
    justify-content:center;
    margin-bottom:12px;
  }
  .active{
    color:purple;
    text-decoration:underline;
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

function Bookmarkpage() {
  const [products, setProducts] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [page, setPage] = useState(1); 
  const [isLoading, setIsLoading] = useState(false); 
  const [filterType, setFilterType] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);


  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFilter = (type) => {
    setFilterType(type);
  };

  useEffect(() => {
    setFilteredProducts(filterProducts());
  }, [filterType, products]);

  const filterProducts = () => {
    if (!filterType) {
      return products;
    }
    return products.filter((product) => product.type === filterType);
  };

  useEffect(() => {
  
    loadProducts();
  }, []);

  useEffect(() => {
    
    window.addEventListener('scroll', handleScroll);

    return () => {
     
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
  
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    const scrollBottom = scrollHeight - scrollTop - clientHeight;

    if (scrollBottom < 200 && !isLoading) {
      loadProducts();
    }
  };

  const loadProducts = async () => {
    try {
      setIsLoading(true);

  
      const response = await fetch(
        `http://cozshopping.codestates-seb.link/api/v1/products?count=8&page=${page}`
      );
      const data = await response.json();


      setProducts((prevProducts) => [...prevProducts, ...data]);

    
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const deleteProduct = (productId) => {
    setProducts((prevProducts) => {
      return prevProducts.filter((product) => product.id !== productId);
    });
  };

  const toggleBookmark = (productId) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            isBookmarked: !product.isBookmarked,
          };
        }
        return product;
      });
  
      const hasBookmarkedProduct = updatedProducts.some(
        (product) => product.isBookmarked
      );
  
      setShowMessage(true);
  
      if (!hasBookmarkedProduct) {
        setTimeout(() => {
          setShowMessage(false);
        }, 2000);
      }
  
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
  
      return updatedProducts;
    });
  
    deleteProduct(productId);
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
      <div className="type" style={{ display: 'flex', flexDirection: 'row' }}>
  <div>
    <img
      src="이미지.png"
      className={`t1 ${filterType === null ? 'active' : ''}`}
      onClick={() => handleFilter(null)}
    />
    <div className={`f1 ${filterType === null ? 'active' : ''}`}>전체</div>
  </div>
  <div>
    <img
      src="상품.png"
      className={`t2 ${filterType === 'product' ? 'active' : ''}`}
      onClick={() => handleFilter('product')}
    />
    <div className={`f2 ${filterType === 'product' ? 'active' : ''}`}>상품</div>
  </div>
  <div>
    <img
      src="카테고리.png"
      className={`t3 ${filterType === 'Category' ? 'active' : ''}`}
      onClick={() => handleFilter('Category')}
    />
    <div className={`f3 ${filterType === 'Category' ? 'active' : ''}`}>카테고리</div>
  </div>
  <div>
    <img
      src="기획전.png"
      className={`t4 ${filterType === 'Exhibition' ? 'active' : ''}`}
      onClick={() => handleFilter('Exhibition')}
    />
    <div className={`f4 ${filterType === 'Exhibition' ? 'active' : ''}`}>기획전</div>
  </div>
  <div>
    <img
      src="브랜드.png"
      className={`t5 ${filterType === 'Brand' ? 'active' : ''}`}
      onClick={() => handleFilter('Brand')}
    />
    <div className={`f5 ${filterType === 'Brand' ? 'active' : ''}`}>브랜드</div>
  </div>
</div>
{isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} className="modal-image" alt="Modal" />
            <img src='북마크off.png' className='modalbookmark'/>
          </div>
        </div>
      )}
        <div className="product-list">
        {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
         <img
              src={product.image_url ? product.image_url : product.brand_image_url}
              className="productimg"
              alt={product.title}
              onClick={() =>
                openModal(product.image_url ? product.image_url : product.brand_image_url)
              }
            />
          <div className="product-info">
            <div className="info-left">
              <span className="title aa">{product.title}</span>
              <span className="sub-title aa">{product.sub_title}</span>
              <span className="brand-name aa">{product.brand_name}</span>
            </div>
            <div className="info-right">
              <img
                src={'북마크off.png'}
                className="bookmark-icon"
                onClick={() => toggleBookmark(product.id)}
              />
            </div>
          </div>
        </div>
      ))}
      {showMessage && (
    <div className="bookmark-message">
      <img src='북마크on.png' className='c0'/>상품이 북마크에 추가되었습니다.
    </div>
  )}
      {isLoading && <div>Loading...</div>}
    </div>
      </Main>
      <Footer>
        <p>개인정보 처리방침 | 이용 약관</p>
        <p>All rights reserved @ Codestates</p>
      </Footer>
    </div>
  );
}

export default Bookmarkpage;