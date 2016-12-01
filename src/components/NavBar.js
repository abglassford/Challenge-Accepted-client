import React from 'react';
import {Link} from 'react-router';

const NavBar = () => {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/home">
            <p>Challenge Accepted</p>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;
