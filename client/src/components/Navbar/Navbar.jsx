import { Link } from "react-router-dom";
import AuthService from "../auth/AuthService";
import "./Navbar.css";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const service = new AuthService();
  const { user } = useAuth();

  const handleLogout = () => {
    service.logout();
  };

  if (user) {
    return (
      <nav className="nav-style flex-column">
        <div className="header flex">
          <img src="./images/Logotipe.png" alt="Logotipe" />
          <Link className="link" to="/home">
            <div className="nav-box flex home">Home</div>
          </Link>
          <Link className="link" to="/shop">
            <div className="nav-box flex shop">Shop</div>
          </Link>
          <Link className="link" to="/aboutus">
            <div className="nav-box flex aboutus">About us</div>
          </Link>
          <div className="nav-box flex user">
            <div className="user-menu">
              <ul className="flex-column">
                <li>
                  <Link className="link" to={`/${user.username}`}>
                    Profile info
                  </Link>
                </li>
                <li>
                  <a className="link" href="/" onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
            {user.username}
          </div>
          <Link className="link" to="/cart">
            <div className="nav-box flex market">Cart</div>
          </Link>
        </div>
      </nav>
    );
  } else {
    return (
      <div>
        <nav className="nav-style header">
          <img src="./images/Logotipe.png" alt="Logotipe" />
          <ul className="flex">
            <li>
              <Link className="link" to="/signup">
                <div className="nav-box flex signup">Sign Up</div>
              </Link>
            </li>
            <li>
              <Link className="link" to="/login">
                <div className="nav-box flex login">Log in</div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
};

export default Navbar;
