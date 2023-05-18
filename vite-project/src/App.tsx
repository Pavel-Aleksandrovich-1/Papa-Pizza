import React, { Suspense } from 'react';
import './App.css';
import './scss/app.scss';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import MainLoyouts from './layouts/MainLoyouts';

const FullPizza = React.lazy(() => import(/* webpackChunkName: 'FullPizza'*/ './pages/FullPizza'));
const NotFound = React.lazy(() => import(/* webpackChunkName: 'NotFound'*/ './pages/NotFound'));
const Cart = React.lazy(() => import(/* webpackChunkName: 'Cart'*/ './pages/Cart'));
function App() {
  const [] = React.useState('');
  return (
    <Routes>
      <Route path="/" element={<MainLoyouts />}>
        <Route path="" element={<Home />}></Route>
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Идёт загрузка корзины...</div>}>
              <Cart />
            </Suspense>
          }></Route>
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Идёт загрузка...</div>}>
              <FullPizza />
            </Suspense>
          }></Route>
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Идёт загрузка...</div>}>
              <NotFound />
            </Suspense>
          }></Route>
      </Route>
    </Routes>
  );
}
export default App;
