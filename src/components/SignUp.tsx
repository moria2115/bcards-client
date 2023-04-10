import { useFormik } from "formik";
import { FunctionComponent, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import User from "../interfaces/User";
import { addUser } from "../services/usersService";
import { successMsg } from "../services/feedbacks";
import { UserData } from "../App";
import jwtDecode from "jwt-decode";

interface SignUpProps {}

const SignUp: FunctionComponent<SignUpProps> = () => {
  let { setIsLoggedIn, setUserId } = useContext(UserData);

  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: { email: "", password: "", name: "", isBusiness: false },
    validationSchema: yup.object({
      name: yup.string().required().min(2),
      email: yup.string().required().email().min(5),
      password: yup.string().required().min(8),
    }),
    onSubmit: (values: User) => {
      addUser(values)
        .then((res) => {
          let payload: { _id: string; isBusiness: boolean } = jwtDecode(
            res.data
          );
          navigate("/cards");
          sessionStorage.setItem(
            "userData",
            JSON.stringify({
              isLoggedIn: true,
              token: res.data,
            })
          );
          successMsg("You registered successfully!");
          setIsLoggedIn(true);
          setUserId(payload._id);
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <div className="container mt-3 col-md-4 text-center">
      <h3 className="display-3">Sign Up</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            onChange={() =>
              (formik.values.isBusiness = !formik.values.isBusiness)
            }
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            <i className="fa-solid fa-suitcase"></i> I'm a Business owner
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInputName"
            placeholder="John"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="floatingInputName">Name</label>
          {formik.touched.name && formik.errors.name && (
            <p className="text-danger">{formik.errors.name}</p>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="floatingInput">Email address</label>
          {formik.touched.email && formik.errors.email && (
            <p className="text-danger">{formik.errors.email}</p>
          )}
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="floatingPassword">Password</label>
          {formik.touched.password && formik.errors.password && (
            <p className="text-danger">{formik.errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-secondary w-100 my-3"
          disabled={!formik.dirty || !formik.isValid}
        >
          Sign Up
        </button>
      </form>
      <Link to="/signin">Already have user? Signin here</Link>
    </div>
  );
};

export default SignUp;
