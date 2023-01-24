import React from 'react';
import { useLocation } from 'react-router-dom';

const Layout = () => {
  const { pathname } = useLocation();

  return <div>Layout</div>;
};

export default Layout;
