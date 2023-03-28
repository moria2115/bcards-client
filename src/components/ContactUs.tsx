import { useFormik } from "formik";
import { FunctionComponent, useEffect } from "react";
import * as yup from "yup";
import { successMsg } from "../services/feedbacks";

interface ContactUsProps {}

const ContactUs: FunctionComponent<ContactUsProps> = () => {
  let formik = useFormik({
    initialValues: { email: "", phone: 0, name: "" },
    validationSchema: yup.object({
      name: yup.string().required().min(2),
      email: yup.string().required().email().min(5),
      phone: yup.number().required(),
    }),
    onSubmit: (values, { resetForm }) => {
      successMsg("Thank You!");
      formik.setFieldValue("phone", "");
      resetForm();
    },
  });
  useEffect(() => {
    formik.setFieldValue("phone", "");
  }, []);
  return (
    <>
      <div className="container mt-3 text-center">
        <h1 className="display-3">CONTACT US</h1>
        <div className="row">
          <div className="col-md-6">
            <div className="alert alert-primary" role="alert">
              For all other questions, please use the form below.
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-floating my-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Jhon"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="floatingInput">Name</label>
                {formik.touched.name && formik.errors.name && (
                  <small className="text-danger"> {formik.errors.name}</small>
                )}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="floatingInput">Email address</label>
                {formik.touched.email && formik.errors.email && (
                  <small className="text-danger"> {formik.errors.email}</small>
                )}
              </div>
              <div className="form-floating">
                <input
                  type="phone"
                  className="form-control"
                  id="floatinginput"
                  placeholder="Phone Number"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="floatingPassword">Phone Number</label>
                {formik.touched.phone && formik.errors.phone && (
                  <small className="text-danger"> {formik.errors.phone}</small>
                )}
              </div>
              <button
                type="submit"
                id="signinBtn"
                className="btn w-100 my-3"
                disabled={!formik.dirty || !formik.isValid}
              >
                <i className="fa-sharp fa-solid fa-paper-plane"></i> Submit
              </button>
            </form>
          </div>
          <div className="container col-md-6">
            <img
              height={"350rem"}
              src="/images/Tech_Tech_Website_in_Teal_White_Navy_Gradients_Style-removebg-preview.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
