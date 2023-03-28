import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import "../css/footer.css";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <>
      <footer className="footer text-center text-white">
        <div className="container pt-4">
          <section className="mb-4">
            <a
              className="btn btn-link btn-floating btn-lg m-1"
              href="https://www.facebook.com/moria.dery"
              target="_blank"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-facebook-f"></i>
            </a>

            <a
              className="btn btn-link btn-floating btn-lg m-1"
              href="https://twitter.com/MoriaDery"
              target="_blank"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-twitter"></i>
            </a>

            <a
              className="btn btn-link btn-floating btn-lg m-1"
              href="https://www.instagram.com/moriamiazrahi/"
              target="_blank"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-instagram"></i>
            </a>

            <a
              className="btn btn-link btn-floating btn-lg m-1"
              href="https://www.linkedin.com/in/moria-mizrachi/"
              target="_blank"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              className="btn btn-link btn-floating btn-lg m-1"
              href="https://github.com/moria2115"
              target="_blank"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-github"></i>
            </a>
          </section>
        </div>

        <div className="text-center text-dark p-3">
          © 2023 BCARDS website was developed and desogned by Moria Mizrachi
        </div>
      </footer>
    </>
  );
};

export default Footer;
