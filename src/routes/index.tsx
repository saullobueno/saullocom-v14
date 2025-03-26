import React from 'react';
import { BrowserRouter, Routes as RoutesDOM, Route } from 'react-router-dom';

import Home from '../views/home';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <RoutesDOM>
        <Route path="/" element={<Home />} />
        {/* Criando PageNotFound: <Route path="*" element={<h1>404 - Página não encontrada</h1>} /> */}
      </RoutesDOM>
    </BrowserRouter>
  );
};

export default Routes;