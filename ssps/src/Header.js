import React from 'react';
import { Link } from 'react-router-dom';
import DropdownMenu from './DropdownMenu'; // DropdownMenu 컴포넌트의 파일 경로를 정확히 입력하세요.

function Header() {
  const toggleDropdown = () => {
    // dropdown 토글 로직 구현
  };

  const isDropdownOpen = false; // dropdown 열림/닫힘 상태를 관리하는 변수 설정

  return (
    <header>
      <img className="hdcs" src="로고.png" alt="로고 이미지" />
      <span className="hdt">COZ Shopping</span>
      <div className="dropdown">
        <img
          src="햄버거버튼.png"
          className="dropdown-button"
          onClick={toggleDropdown}
          alt="햄버거 버튼"
        />
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
    </header>
  );
}

export default Header;
