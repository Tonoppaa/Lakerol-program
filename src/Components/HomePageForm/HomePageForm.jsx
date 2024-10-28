import React, { useEffect } from 'react';
import './HomePageForm.css';

const HomePageForm = () => {
  useEffect(() => {
    document.title = "Läkerol-ohjelma - Etusivu"; // Määrittää välilehden otsikon
  }, []);

  return (
    <div className="container">
      <h1>Tervetuloa Läkerol-ohjelmaan!</h1>
      <p>Täällä voit tarkastella ja hakea haluamiasi tietoja liittyen Läkerol-tuotteisiin.</p>
      <p>Tämä ohjelma sisältää tuotteiden osalta:</p>
      <ul>
        <li>Tuotteiden selauksen</li>
        <li>Tuotteiden haun</li>
      </ul>
    </div>
  );
}

export default HomePageForm;
