import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="top-navbar">
      <div className="nav-left">
        <Link to="/" className="brand">
          <span className="brand-icon">☕</span>
          <span>Coffee</span>
        </Link>

        {user && (
          <>
            <Link to="/" className="nav-link">Dashboard</Link>
            <Link to="/products" className="nav-link">Products</Link>
            <Link to="/inventory" className="nav-link">Inventory</Link>
            <Link to="/suppliers" className="nav-link">Suppliers</Link>
            <Link to="/purchases" className="nav-link">Purchases</Link>
            {user.role === "ADMIN" && (
              <Link to="/expenses" className="nav-link">Expenses</Link>
            )}
          </>
        )}
      </div>

      <div className="nav-right">
        {user ? (
          <>
            <span className="user-badge">
              {user.username} ({user.role})
            </span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="nav-link">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;