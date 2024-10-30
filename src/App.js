import React from 'react';
import './App.css';
import Navbar from './Components/NavBar/index.js';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm.jsx';
import HomePageForm from './Components/HomePageForm/HomePageForm.jsx';
import ProductInfoForm from './Components/ProductInfoForm/ProductInfoForm.jsx';
import ProductPageForm from './Components/ProductPageForm/ProductPageForm.jsx';
import ProductSearchForm from './Components/ProductSearchForm/ProductSearchForm.jsx';
import ProductSearch from './Components/SearchBar/ProductSearch.js';

function App() {
  const location = useLocation();  // Hook, jolla saadaan nykyinen URL-osoite

  return (
    <>
        {/* Näytetään Navbar vain jos polku ei ole / tai /login */}
        {location.pathname !== "/" && location.pathname !== "/login" && <Navbar />}

      <Routes>
        {/* Aloitussivu, ohjaa käyttäjän kirjautumissivulle */}
        <Route path="/" element={<LoginForm />} />

        {/* Kirjautumissivu */}
        <Route path="/login" element={<LoginForm />} />

        {/* Etusivu, johon siirrytään onnistuneen kirjautumisen jälkeen */}
        <Route path="/home" element={<HomePageForm />} />

        {/* Yksittäisen tuotteen tietosivu */}
        <Route path="/product/:id" element={<ProductInfoForm />} />

        {/* Tuotesivu, jossa voidaan tarkastella kaikkia tuotteita */}
        <Route path="/productpage" element={<ProductPageForm />} />

        {/* Tuotteiden hakusivu, jossa voidaan hakea kaikkia tuotteita */}
        <Route path ="/productsearch" element={<ProductSearchForm />} />

        <Route path="/searchresult" element={<ProductSearch />} />
      </Routes>
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;