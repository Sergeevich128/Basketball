import React from 'react';
import './header.css';
import MenuSandwich from "./menuSandwich/MenuSandwich";
import Time from "./time/Time";
import Logo from "./logo/Logo";

const Header = () => (
    <header>
      <MenuSandwich/>
      <Logo/>
      <Time/>
    </header>
  )

export default Header;