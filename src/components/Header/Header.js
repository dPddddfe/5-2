// src/components/Header/Header.js

import React from "react";
// ✅ useLocation 추가
import { Link, useLocation } from "react-router-dom"; 

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { to: "/list", label: "강의 목록" },
    { to: "/detail", label: "상세" },
    { to: "/update", label: "수정" },
  ];

  return (
    // ✅ nav-tabs 스타일 클래스 적용
    <nav className="main-nav-tabs"> 
      {navItems.map(item => (
        <Link 
          key={item.to} 
          // ✅ 활성화 로직
          className={`nav-link ${
            // /list와 / 모두에서 '강의 목록' 활성화
            item.to === '/list' 
            ? (currentPath === '/list' || currentPath === '/') ? 'active' : ''
            // /detail/id 나 /update/id 와 같은 경우도 처리하기 위해 startsWith 사용
            : currentPath.startsWith(item.to) ? 'active' : ''
          }`}
          to={item.to}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export default Header;