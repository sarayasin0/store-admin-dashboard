import React from "react";
import './assets/css/styles.css';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import Stores from './Pages/StoresPage';
import Categories from './Pages/CategoriesPage';
import Products from './Pages/ProductsPage';

const App=()=>{
  return(
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Stores/>}/>
      <Route path="/categories" element={<Categories/>}/>
      <Route path="/products" element={<Products/>}/>
    </Routes>
    </BrowserRouter>
  );
}
export default App;