import { FunctionComponent } from "react";
import "../css/about.css";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  return (
    <>
      <div className="container">
        <h1 className="display-1 text-center">ABOUT US</h1>

        <div className="card rounded my-3 aboutCard">
          <div className="row g-0">
            <div className="col-md-8">
              <div className="card-body mt-3">
                <div className="container mt-3">
                  <h5 className="card-title text-center fw-bold">
                    WHO WE ARE?
                  </h5>
                  <p className="card-text text-justify">
                    BCARDS is an online creative marketplace that helps
                    start-ups, businesses and entrepreneurs find and create
                    their perfect business card - in minutes.
                  </p>
                </div>
                <div className="container mt-3">
                  <h5 className="card-title text-center fw-bold">
                    WHAT WE DO?
                  </h5>
                  <p className="card-text text-justify">
                    BCARDS allows you to manage and edit your business cards
                    easily.
                    <br />
                    Even if your not a business owner, any user can choose his
                    favorite businesses and add them to his favorite cards list.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <img
                src="\images\whoweare.jpg"
                className=" w-100 h-100 img-fluid rounded-start"
                alt="A man typing"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
