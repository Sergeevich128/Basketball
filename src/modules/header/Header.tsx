import React from 'react';
import './header.css';
import MenuSandwich from "./menuSandwich/MenuSandwich";
import Time from "./time/Time";
import Logo from "./logo/Logo";
import Balance from "./balance/Balance";

const Header = () => (
    <header>
        <div className="header-inner">
            <MenuSandwich/>
            <Logo/>
            <Time/>
            <Balance/>
        </div>
    </header>
)

export default Header;