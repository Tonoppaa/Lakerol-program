import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./ProductSearchForm.css";

const ProductSearchForm = () => {
  const [searchInput, setSearchInput] = useState(""); // Hakusana
  const [products, setProducts] = useState([]); // Hae tuotteet
  const [searchResults, setSearchResults] = useState([]); // Haku tulokset
  const [message, setMessage] = useState(""); // Viesti käyttäjälle
  const [searchField, setSearchField] = useState("tuote_nimi"); // Valinta haettavasta kentästä
  const [attribuutit, setAttribuutit] = useState([]); // Attribuutit tietokannasta

  useEffect(() => {
    document.title = "Läkerol-ohjelma - Tuotehaku"; // Määrittää välilehden otsikon
  }, []);

  const navigate = useNavigate();

  // Tietojen haku API:sta
  useEffect(() => {
    // Hae tuotteet
    fetch(process.env.REACT_APP_API_URL + 'Tuote')
      .then(response => response.json())
      .then(data => {
        setProducts(data); // Tuotteiden sijoittaminen tilaan
      });

    // Hae attribuutit
    fetch(process.env.REACT_APP_API_URL + 'Tuote/attribuutit')
      .then(response => response.json())
      .then(data => {
        // console.log("Attribuutit API:sta:", data); Testaus, mitä attribuutteja konsoliin tulee tietokannasta
        setAttribuutit(data); // Attribuuttien sijoittaminen tilaan
      });
  }, []);

  const handleSearch = () => {
    // Tarkista, onko hakukenttä tyhjä
    if (searchInput.trim() === "") {
      setMessage("Virhe: Hakukenttä on tyhjä!"); // Näytä virheilmoitus
      setSearchResults([]); // Tyhjennä mahdolliset aiemmat hakutulokset
      setTimeout(() => setMessage(""), 2000);
      return; // Lopeta funktion suoritus
    }

    // console.log("Hakukenttä:", searchField, "Hakusana:", searchInput);

    const trimmedInput = searchInput.trim().toLowerCase();

      // Tarkistetaan, onko valittuna tuotteen nimi tai EAN-koodi. Tuotteen nimi voi sisältää vain kirjaimia ja EAN-koodi numeroita
  if (searchField === "tuote_nimi" && !/^[a-zA-Z\s]+$/.test(trimmedInput)) {
    setMessage("Virhe: 'Tuotteen nimi' hakuehto hyväksyy vain kirjaimia.");
    setSearchResults([]);
    setTimeout(() => setMessage(""), 2000);
    return;
  } else if (searchField === "tuote_id" && !/^\d+$/.test(trimmedInput)) {
    setMessage("Virhe: 'EAN-koodi' hakuehto hyväksyy vain numeroita.");
    setSearchResults([]);
    setTimeout(() => setMessage(""), 2000);
    return;
  }

    // Tee haku API:sta
    fetch(`${process.env.REACT_APP_API_URL}Tuote?searchTerm=${encodeURIComponent(trimmedInput)}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          setSearchResults(data);
          setMessage("");
        } else {
          setSearchResults([]);
          setMessage("Haluttua tuotetta ei löytynyt.");
          setTimeout(() => setMessage(""), 2000);
        }
      })
      .catch(error => {
        console.error("Virhe haussa:", error);
        setMessage("Haku epäonnistui.");
      });
  };

  const resetSearch = () => {
    setSearchInput(""); // Tyhjennetään hakusana
    setSearchResults([]); // Tyhjennetään hakutulokset
    setMessage(""); // Tyhjennetään viesti
  }

    // Navigointi tuotetietosivulle ja tuotteen tietojen välitys
    const handleProductClick = (product) => {
      navigate(`/product/${product.tuote_Id}`, { state: { product } });
    };

  return (
    <div className="product-search">
      {message && <div className="message-box">{message}</div>} {/* Näytetään viesti */}
      <div className="search-box">
        <h3>Valitse haettava kenttä</h3>
        <select 
          value={searchField} 
          onChange={(e) => setSearchField(e.target.value)} // Asetetaan valittu kenttä
        >
          {attribuutit.map((attribuutti) => (
            <option key={attribuutti.sarakeNimi} value={attribuutti.sarakeNimi}>{attribuutti.nayttoNimi}</option>
          ))}
        </select>
        
        <div className="hakukentta">
          <input
            type="search"
            name="search-form"
            id="search-form"
            className="search-input"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)} // Asetetaan hakusana
          />
          <button onClick={handleSearch}>Hae</button> {/* Hae-painike */}
        </div>

        <div className="empty-button-location">
          <button onClick={resetSearch}>Tyhjennä</button> {/* Nollauspainike */}
        </div>
      </div>
      <div className="result-container">
        {searchResults.map((product) => (
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
            <p>Paino: {product.tuote_Paino}</p>
            <p>EAN-koodi: {product.tuote_Id}</p>
            <p>Energiamäärä: {product.energiaMaara}</p>
            <button onClick={() => handleProductClick(product)}>Katso tuotetta</button> {/* "Katso tuotetta" -painike */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSearchForm;
