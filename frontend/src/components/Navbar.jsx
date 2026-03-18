import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#333" }}>
      <Link to="/" style={{ color: "#fff", marginRight: "10px" }}>
        Dashboard
      </Link>
      <Link to="/products" style={{ color: "#fff" }}>
        Products
      </Link>
    </nav>
  );
}

export default Navbar;