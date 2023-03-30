import jwtDecode from "jwt-decode";
import {
  FunctionComponent,
  memo,
  useContext,
  useEffect,
  useState,
} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserData } from "../App";
import { successMsg } from "../services/feedbacks";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  let navigate = useNavigate();
  let { isLoggedIn, setIsLoggedIn } = useContext(UserData);
  let [isBusiness, setIsBusiness] = useState<boolean>(false);
  useEffect(() => {
    console.log(isLoggedIn);

    if (isLoggedIn) {
      let payload: { isBusiness: boolean } = jwtDecode(
        JSON.parse(sessionStorage.getItem("userData") as string).token
      );
      setIsBusiness(payload.isBusiness);
    } else setIsBusiness(false);
  }, [isLoggedIn]);

  let handleCollapse = () => {
    var nav = document.getElementById("navbarSupportedContent");
    var btn = document.getElementById("close-button");
    (nav as HTMLElement).classList.remove("show");
    (btn as HTMLButtonElement).classList.add("collapsed");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img
              src="/images/BcardLogo-removebg-preview.png"
              style={{ width: "8rem" }}
              alt="Bcards logo"
            />
          </NavLink>
          <button
            className={"navbar-toggler collapsed"}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            id="close-button"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item mx-3">
                <NavLink
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  className="nav-link text-primary"
                  aria-current="page"
                  to="/"
                  onClick={() => {
                    handleCollapse();
                    navigate("/");
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item mx-3">
                <NavLink
                  className="nav-link text-primary"
                  aria-current="page"
                  to="/about"
                  onClick={() => {
                    handleCollapse();
                    navigate("/about");
                  }}
                >
                  About
                </NavLink>
              </li>
              {isLoggedIn && (
                <>
                  <li className="nav-item mx-3">
                    <NavLink
                      className="nav-link text-primary"
                      aria-current="page"
                      to="/cards"
                      onClick={() => {
                        handleCollapse();
                        navigate("/cards");
                      }}
                    >
                      Business Cards
                    </NavLink>
                  </li>
                </>
              )}
              {!isLoggedIn && (
                <>
                  <li className="nav-item mx-3">
                    <NavLink
                      className="nav-link text-primary"
                      to="/signin"
                      onClick={() => {
                        handleCollapse();
                        navigate("/signin");
                      }}
                    >
                      Sign in
                    </NavLink>
                  </li>
                  <li className="nav-item mx-3">
                    <NavLink
                      className="nav-link text-primary"
                      to="/signup"
                      onClick={() => {
                        handleCollapse();
                        navigate("/signup");
                      }}
                    >
                      Sign up
                    </NavLink>
                  </li>
                </>
              )}
              {isLoggedIn && (
                <>
                  <li className="nav-item mx-3">
                    <NavLink
                      className="nav-link text-primary"
                      aria-current="page"
                      to="/profile"
                      onClick={() => {
                        handleCollapse();
                        navigate("/profile");
                      }}
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li className="nav-item mx-3">
                    <NavLink
                      className="nav-link text-primary"
                      to="/favoriteCards"
                      onClick={() => {
                        handleCollapse();
                        navigate("/favoriteCards");
                      }}
                    >
                      Favorite Cards
                    </NavLink>
                  </li>
                </>
              )}
              {isBusiness && (
                <>
                  <li className="nav-item mx-3">
                    <NavLink
                      className="nav-link text-primary"
                      to="/myCards"
                      onClick={() => {
                        handleCollapse();
                        navigate("/myCards");
                      }}
                    >
                      My Cards
                    </NavLink>
                  </li>
                </>
              )}
              <li className="nav-item mx-3">
                <NavLink
                  className="nav-link text-primary"
                  aria-current="page"
                  to="/contactUs"
                  onClick={() => {
                    handleCollapse();
                    navigate("/contactUs");
                  }}
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
            {isLoggedIn && (
              <>
                <form className="d-flex" role="search">
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                      setIsLoggedIn(false);
                      sessionStorage.removeItem("userData");
                      successMsg("See you soon...");
                      navigate("/");
                    }}
                  >
                    Logout
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default memo(Navbar);
