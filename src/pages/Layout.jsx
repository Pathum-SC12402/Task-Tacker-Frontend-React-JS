import React from 'react';
import Header from '../components/header/Header';
import Sidebar from '../components/sideBar/SideBar';
import '../assets/styles/layout.css';

function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <div className="layout-body">
        <Sidebar />
        <main className="layout-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
