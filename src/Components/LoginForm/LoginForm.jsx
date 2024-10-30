import React, { useState } from 'react';
import './LoginForm.css';
import { FaUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(process.env.production.REACT_APP_API_URL + "/kayttaja/Login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Kayttaja_Id: username, Salasana: password })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            // Ohjaa käyttäjä kotisivulle
            window.location.href = "/home";
        } else {
            // Näytä virheilmoitus
            setErrorMessage(data.message);
        }
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Kirjaudu sisään</h1>
                <div className="syote-ltk">
                    <input
                        type="text"
                        placeholder="Käyttäjätunnus"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <FaUser className="ikoni" />
                </div>
                <div className="syote-ltk">
                    <input
                        type="password"
                        placeholder="Salasana"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <RiLockPasswordFill className="ikoni" />
                </div>
                <button type="submit">Kirjaudu</button>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </form>
        </div>
    );
};

export default LoginForm;   