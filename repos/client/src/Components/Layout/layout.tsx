import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const { pathname } = useLocation();

  return (
    <div>
      <header style={{ backgroundColor: 'grey' }}>Header Test</header>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default Layout;
