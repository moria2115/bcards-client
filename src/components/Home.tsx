import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import "../css/home.css";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <>
      <div className="container">
        <h1 className="homeHeader1 text-center display-1">WELCOME TO BCARDS</h1>
        <div className="row">
          <div className="col-md-7 my-auto">
            <h3 className="homeHeader display-3">
              Create your own business card easily
            </h3>
            <p className="homeHeader2">
              Thinking of ways to make a perfect first impression with clients?
              <br />
              Business cards are a great way to start. Design a beautiful
              business card in VistaCreate and order prints of it right from the
              editor.
            </p>
            <>
              <Link className="btn btn-primary mx-2 mt-3" to={"/signIn"}>
                Sign In
              </Link>
              <Link className="btn btn-primary mt-3" to={"/signUp"}>
                Sign Up
              </Link>
            </>
          </div>
          <img
            className="col-md-5"
            src="\images\Tech_Tech_Website_in_Teal_White_Navy_Gradients_Style__1_-removebg-preview.png"
            alt="Mobile"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
