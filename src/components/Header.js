import React from 'react';
import logoHeader from '../pictures/logo__header.svg';
import { Link, useHistory  } from 'react-router-dom';


function Header(props) {

  const history = useHistory();

  function signOut() {
    props.onExit()
    history.push('/login');
  }

  return (
    <header className="header">
      <img
        className="logo"
        src={logoHeader}
        alt="Место. Белый логотип"
      />
      {props.loggedIn ? <button className="header__link header__link_type_loggedIn" onClick={signOut} type="button">{props.headerText}</button> : <Link to={props.link} className="header__link">{props.headerText}</Link>}

    </header>
    
  
  )
}

export default Header;