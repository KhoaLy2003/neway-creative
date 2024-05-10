import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Header.css";
import AuthModal from "../Sections/AuthModal";
import { UserContext } from "../../context/AuthContext";

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { name } = useContext(UserContext);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  return (
    <header className="">
      <nav className="navbar navbar-expand-lg">
        <div className="custom-container">
          <Link className="navbar-brand" to="/">
            <h2>
              Neway <em>Creative</em>
            </h2>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to="/calendars"
                >
                  Our Products
                </NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="about.html">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                {!name && (
                  <a className="nav-link" onClick={() => handleModalOpen()}>
                    Login
                  </a>
                )}

                {name && <a className="nav-link">{name}</a>}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <AuthModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </header>
  );
};

export default Header;
