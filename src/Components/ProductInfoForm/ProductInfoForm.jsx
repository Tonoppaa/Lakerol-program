import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Location-avulla saadaan tuotetiedot, navigaten avulla pääsee takaisin
import './ProductInfoForm.css';

const ProductInfoForm = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Tuo useNavigate hook
  const product = location.state?.product; // Haetaan tuotetiedot siirretystä tilasta

  if (!product) {
    return <p>Tuotetietoja ei löytynyt.</p>; // Jos tuote puuttuu (esim. suora URL:n käyttö)
  }

  return (
    <div className="product-container">
      <div className="product-info">
        <h2>{product.tuote_Nimi}</h2>
        {product.tuote_Kuva_Base64 ? (
              <img
                src={`data:image/jpeg;base64,${product.tuote_Kuva_Base64}`}
                alt={product.tuote_Nimi}
              />
            ) : (
              <p>Ei kuvaa saatavilla</p>
            )}
        <p>{product.tuote_Kuvaus}</p>
        <p>Paino: {product.tuote_Paino}</p>      
        <p>EAN-koodi: {product.tuote_Id}</p>
        <p>Kalorimäärä: {product.energiaMaara}</p>
        {/* Paluu-nappi */}
        <button onClick={() => navigate(-1)}>Palaa edelliselle sivulle</button>
      </div>
    </div>
  );
};

export default ProductInfoForm;