import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowMobileMenu(false);
    navigate("/login", { replace: true });
  };

  const closeMenu = () => setShowMobileMenu(false);

  return (
    <nav className="top-navbar">
      <div className="nav-container">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-text">Coffee</span>
          <span className="brand-icon">☕</span>
        </Link>

        <div
          className="mobile-icon"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? "✖" : "☰"}
        </div>

        <div className={`nav-items-wrapper ${showMobileMenu ? "open" : ""}`}>
          <div className="main-links">
            {user && (
              <>
                <Link to="/" className="nav-link" onClick={closeMenu}>
                  Dashboard
                </Link>
                <Link to="/products" className="nav-link" onClick={closeMenu}>
                  Products
                </Link>
                <Link to="/inventory" className="nav-link" onClick={closeMenu}>
                  Inventory
                </Link>
                <Link to="/suppliers" className="nav-link" onClick={closeMenu}>
                  Suppliers
                </Link>
                <Link to="/purchases" className="nav-link" onClick={closeMenu}>
                  Purchases
                </Link>
                {user.role === "ADMIN" && (
                  <Link to="/expenses" className="nav-link" onClick={closeMenu}>
                    Expenses
                  </Link>
                )}
              </>
            )}
          </div>

          <div className="mobile-user-section">
            {user ? (
              <>
                <div className="user-info-box">
                  <span className="user-badge">
                    {user.username} ({user.role})
                  </span>
                </div>
                <button onClick={handleLogout} className="logout-btn mobile-logout">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="nav-link" onClick={closeMenu}>
                Login
              </Link>
            )}
          </div>
        </div>

        <div className="desktop-user-section">
          {user ? (
            <div className="desktop-user-wrap">
              <span className="user-badge">
                {user.username} ({user.role})
              </span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-link">
              Login
            </Link>
          )}
        </div>
      </div>

      <style>{`
        .top-navbar {
          width: 100%;
          background: linear-gradient(90deg, #2a140d, #7a5439);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.14);
          border-radius: 0 0 16px 16px;
          position: sticky;
          top: 0;
          z-index: 1200;
        }

        .nav-container {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 22px;
          min-height: 72px;
          position: relative;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: #fff;
          font-weight: 800;
          z-index: 1300;
        }

        .brand-text {
          font-size: 2rem;
          line-height: 1;
        }

        .brand-icon {
          font-size: 1.8rem;
          line-height: 1;
        }

        .mobile-icon {
          display: none;
          cursor: pointer;
          font-size: 30px;
          color: #fff;
          z-index: 1300;
          user-select: none;
        }

        .nav-items-wrapper {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .main-links {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .nav-link {
          color: #fff;
          text-decoration: none;
          font-size: 16px;
          font-weight: 600;
          padding: 10px 12px;
          border-radius: 10px;
          transition: 0.25s ease;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .desktop-user-section {
          display: flex;
          align-items: center;
        }

        .desktop-user-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .mobile-user-section {
          display: none;
        }

        .user-badge {
          background: rgba(255, 255, 255, 0.14);
          color: #fff;
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          display: inline-block;
        }

        .logout-btn {
          background: #f6eadf;
          color: #2b160f;
          border: none;
          padding: 10px 16px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .desktop-user-section {
            display: none;
          }

          .mobile-icon {
            display: block;
          }

          .nav-container {
            padding: 14px 16px;
          }

          .brand-text {
            font-size: 1.9rem;
          }

          .brand-icon {
            font-size: 1.6rem;
          }

          .nav-items-wrapper {
            position: fixed;
            top: 72px;
            left: 0;
            width: 100%;
            height: calc(100vh - 72px);
            background: linear-gradient(180deg, #2a140d 0%, #5d3d29 100%);
            padding: 20px 16px;
            display: flex;
            flex-direction: column;
            gap: 18px;
            transform: translateX(-100%);
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s ease;
            overflow-y: auto;
          }

          .nav-items-wrapper.open {
            transform: translateX(0);
            opacity: 1;
            pointer-events: auto;
          }

          .main-links {
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 10px;
          }

          .nav-link {
            width: 100%;
            font-size: 17px;
            padding: 14px 16px;
            border-radius: 14px;
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.08);
          }

          .mobile-user-section {
            display: flex;
            flex-direction: column;
            gap: 14px;
            margin-top: auto;
            padding-top: 18px;
            border-top: 1px solid rgba(255,255,255,0.12);
          }

          .user-info-box {
            width: 100%;
          }

          .user-badge {
            width: 100%;
            text-align: center;
            padding: 14px 16px;
            border-radius: 14px;
          }

          .mobile-logout {
            width: 100%;
            padding: 14px 16px;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
