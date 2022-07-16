import React, { useState } from "react";
import "./Navbar.css";
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSearchAlt, BiUser } from "react-icons/bi";
import { BsCartCheck } from "react-icons/bs";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [click, setclick] = useState(false);

  const handleClick = () => setclick(!click);

  return (
    <nav className="navbar">
      <div className="nav_container">
        <Link exact to="/" className="nav_logo">
          <h1>Logo</h1>
        </Link>

        <ul className={click ? "nav_menu active" : "nav_menu"}>
          <li className="nav_item">
            <Link
              exact
              to="/"
              activeClassName="active"
              className="nav_links"
              onClick={handleClick}
            >
              Home
            </Link>
          </li>
          <li className="nav_item">
            <Link
              exact
              to="/products"
              activeClassName="active"
              className="nav_links"
              onClick={handleClick}
            >
              Products
            </Link>
          </li>
          <li className="nav_item">
            <Link
              exact
              to="/contact"
              activeClassName="active"
              className="nav_links"
              onClick={handleClick}
            >
              Contact
            </Link>
          </li>
          <li className="nav_item">
            <Link
              exact
              to="/about"
              activeClassName="active"
              className="nav_links"
              onClick={handleClick}
            >
              About
            </Link>
          </li>
          <li className="nav_item">
            <Link
              exact
              to="/search"
              activeClassName="active"
              className="nav_links"
              onClick={handleClick}
            >
              <BiSearchAlt />
            </Link>
          </li>
          <li className="nav_item">
            <Link
              exact
              to="/cart"
              activeClassName="active"
              className="nav_links"
              onClick={handleClick}
            >
              <BsCartCheck />
            </Link>
          </li>
          <li className="nav_item">
            <Link
              exact
              to="/auth"
              activeClassName="active"
              className="nav_links"
              onClick={handleClick}
            >
              <BiUser />
            </Link>
          </li>
        </ul>

        <div className="nav_icon" onClick={handleClick}>
          {click ? (
            <ImCross className="icon" />
          ) : (
            <GiHamburgerMenu className="icon" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
