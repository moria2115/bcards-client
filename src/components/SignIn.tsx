import { useFormik } from "formik";
import { FunctionComponent, useContext } from "react";
import * as yup from "yup";
import User from "../interfaces/User";
import { checkUser } from "../services/usersService";
import { Link, useNavigate } from "react-router-dom";
import { errorMsg, successMsg } from "../services/feedbacks";
import { UserData } from "../App";
import jwtDecode from "jwt-decode";

interface SignInProps {}

const SignIn: FunctionComponent<SignInProps> = () => {
  let { setIsLoggedIn, setUserId } = useContext(UserData);
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      email: yup.string().required().email().min(5),
      password: yup.string().required().min(8),
    }),
    onSubmit: (values: User) => {
      checkUser(values)
        .then((res) => {
          let payload: { _id: string; biz: boolean } = jwtDecode(res.data);
          navigate("/cards");
          setIsLoggedIn(true);
          setUserId(payload._id);
          successMsg("You logged in successfully!");
          sessionStorage.setItem(
            "userData",
            JSON.stringify({
              isLoggedIn: true,
              token: res.data,
            })
          );
        })
        .catch((err) => {
          console.log(err);
          errorMsg("Wrong email or password");
        });
    },
  });
  return (
    <div className="container mt-3 col-md-4 text-center">
      <h3 className="display-3">LOGIN</h3>
      <form onSubmit={formik.handleSubmit}>
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
          Sign In
        </button>
      </form>
      <Link to="/signup">New user? Sign Up here</Link>
    </div>
  );
};

export default SignIn;
