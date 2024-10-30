import React from "react";
import {
    Nav,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavbarElements.js";

const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />

                <NavMenu>
                    <NavBtnLink to="/home" > {/* Tälle sivulle pääsee */}
                        Etusivu
                    </NavBtnLink>
                    <NavBtnLink to="/productpage" activeStyle> {/* Tälle sivulle pääsee */}
                        Tuoteselaus
                    </NavBtnLink>
                    <NavBtnLink to="/productsearch" activeStyle> {/* Tälle sivulle pääsee */}
                        Tuotehaku
                    </NavBtnLink>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/login">
                        Kirjaudu ulos
                    </NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
};

export default Navbar;
