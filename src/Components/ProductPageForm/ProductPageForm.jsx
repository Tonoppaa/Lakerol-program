import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook navigointiin
import './ProductPageForm.css'; // Tuodaan tarvittavat tyylit

/* useState on Reactin hook, jolla voidaan hallita komponentin tilaa.
  useEffect on Reactin hook, joka suorittaa sivuvaikutuksia (esim. tietojen haku API) aina, kun komponentti renderöityy tai 
  jokin riippuvuus muuttuu. 
  useNavigate on hook, joka tulee React Routerista ja sen avulla voidaan navigoida ohjelmallisesti eri reittien välillä ilman 
  selaimen osoitekenttään kirjoittamista.*/

 // Määrittää ProductPageForm-nimisen funktionaalisen komponentin, joka on pääkomponenttisi tuotteiden näyttämiseen.
const ProductPageForm = () => {
  useEffect(() => {
    document.title = "Läkerol-ohjelma - Tuotteet"; // Määrittää välilehden otsikon
  }, []);
  /* useState([]) luo paikallisen tilan muuttujan products ja sen päivittäjän setProducts. Aluksi products on tyhjä taulukko. 
  Tilaa päivitetään, kun tuotteet ladataan API */
  const [products, setProducts] = useState([]);
  // Määrittää navigate-muuttujan käyttämällä useNavigate-hookia. navigate-muuttujalla voit siirtyä ohjelmallisesti eri reiteille.
  const navigate = useNavigate();

  /* useEffect-hook suorittaa sisäisen logiikan komponentin ensilatauksessa (tyhjä riippuvuuslista [] tarkoittaa, että koodia 
  suoritetaan vain kerran komponentin elinkaaren aikana). */

  useEffect(() => {
    // Haetaan tuotteet API:sta
    fetch(process.env.REACT_APP_API_URL + 'Tuote')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      });
  }, []);

  // Funktio tuotteen klikkaukseen, joka navigoi tuotteen tietosivulle
  const handleProductClick = (product) => {
    navigate(`/product/${product.tuote_Id}`, { state: { product } });
  };

  // return-lohkossa JSX-koodi palauttaa HTML-muotoisen näkymän, joka renderöidään käyttöliittymässä
  return (
    <div className="product-container">
      {products.map((product) => (
        <div className="product-card" key={product.tuote_Id}>

                    {product.tuote_Kuva_Url ? (
            <img
              src={product.tuote_Kuva_Url}
              alt={product.tuote_Nimi}
            />
          ) : (
            <p>Ei kuvaa saatavilla</p>
          )}
          <h3>{product.tuote_Nimi}</h3>
          <button onClick={() => handleProductClick(product)}>Katso tuotetta</button>
        </div>
      ))}
    </div>
  );
};

// Tämä rivi tekee ProductPageForm-komponentista käytettävän muissa tiedostoissa
export default ProductPageForm;
