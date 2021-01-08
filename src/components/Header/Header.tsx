import React from 'react';
import './Header.css';
import MenuSandwich from "./menuSandwich/MenuSandwich";
import Time from "./time/Time";
import Title from "./title/Title";

const Header = () => {

  return (
    <header>
      <MenuSandwich/>
      <Title/>
      <Time/>
    </header>
  )
}


export default Header