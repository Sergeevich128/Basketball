import React from 'react';
import './header.css';
import MenuSandwich from "./menuSandwich/MenuSandwich";
import Time from "./time/Time";
import Logo from "./logo/Logo";
import Balance from "./balance/Balance";

const Header = () => (
    <header>
      <MenuSandwich/>
      <Logo/>
      <Time/>
      <Balance/>
    </header>
  )

export default Header;