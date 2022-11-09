import React from 'react';
import logoHeader from '../pictures/logo__header.svg';
import { Link } from 'react-router-dom';


function Header(props) {
  return (
    <header className="header">
      <img
        className="logo"
        src={logoHeader}
        alt="Место. Белый логотип"
      />
      <Link to={props.link} className={`header__link ${props.loggedIn ? 'header__link_type_loggedIn' : ''}`}>{props.headerText}</Link>

    </header>
    
  
  )
}

export default Header;