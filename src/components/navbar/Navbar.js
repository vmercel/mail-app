import React from "react";
import {
    Nav,
    NavLogo,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavbarElements";


const Navbar = () => {
    return (
        <>
           <Nav>
            <NavLogo to="/">
                Logo
            </NavLogo>
            <Bars />

            <NavMenu>
                <NavLink 
                  to="/"
                  activeStyle={{ color:'black' }}
                >
                    Home
                </NavLink>
                <NavLink 
                  to="/home"
                  activeStyle={{ color: 'black' }}
                >
                    Profile
                </NavLink>
                <NavLink 
                  to="/list" 
                  activeStyle={{ color: 'black' }}
                >
                    Messages
                </NavLink>
                <NavLink
                  to="/signin"
                  activeStyle={{ color: 'black' }}
                >
                    Sign In
                </NavLink>
                <NavBtn>
                    <NavBtnLink to="/">Sign Up</NavBtnLink>
                </NavBtn>
            </NavMenu>
           </Nav> 
        </>
    );
};
export default Navbar;