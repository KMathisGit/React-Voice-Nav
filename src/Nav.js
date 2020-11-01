import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Nav.scss";

function Nav(props) {
  const location = useLocation();
  const { pathname } = location;
  const activeRoute = pathname;

  return (
    <nav>
      <ul>
        <li className={activeRoute === "/" ? "active-route" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li className={activeRoute === "/about" ? "active-route" : ""}>
          <Link to="/about">About</Link>
        </li>
        <li className={activeRoute === "/contact" ? "active-route" : ""}>
          <Link to="/contact">Contact</Link>
        </li>
        <li className={activeRoute === "/people" ? "active-route" : ""}>
          <Link to="/people">People</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
