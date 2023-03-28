import { useFormik } from "formik";
import { FunctionComponent, useEffect } from "react";
import * as yup from "yup";
import Card from "../interfaces/Card";
import { addCard } from "../services/cardsService";
import { successMsg } from "../services/feedbacks";

interface AddCardProps {
  onHide: Function;
  refresh: Function;
}

const AddCard: FunctionComponent<AddCardProps> = ({ onHide, refresh }) => {
  let formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      website: "",
      phone: "0",
      address: "",
      image: "",
    },
    validationSchema: yup.object({
      name: yup.string().required().min(2),
      description: yup.string().required().min(5),
      address: yup.string().required().min(5),
      phone: yup.string().required().min(8),
      image: yup.string().required().min(5),
      website: yup.string().required().min(5),
    }),
    onSubmit: (values: Card) => {
      addCard(values)
        .then(() => {
          onHide();
          successMsg("Card added successfully!");
          refresh();
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <>
      <h1 className="Display-1 text-center my-3">CREATE NEW CARD</h1>
      <div className="container col-md-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating my-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Business Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Business Name</label>
            {formik.touched.name && formik.errors.name && (
              <small className="text-danger"> {formik.errors.name}</small>
            )}
          </div>
          <div className="form-floating my-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Description</label>
            {formik.touched.description && formik.errors.description && (
              <small className="text-danger">{formik.errors.description}</small>
            )}
          </div>
          <div className="form-floating my-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="website"
              name="website"
              value={formik.values.website}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Website</label>
            {formik.touched.website && formik.errors.website && (
              <small className="text-danger"> {formik.errors.website}</small>
            )}
          </div>
          <div className="form-floating my-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Phone</label>
            {formik.touched.phone && formik.errors.phone && (
              <small className="text-danger"> {formik.errors.phone}</small>
            )}
          </div>
          <div className="form-floating my-3">
            <input
              type="string"
              className="form-control"
              id="floatingInput"
              placeholder="Address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">Address</label>
            {formik.touched.address && formik.errors.address && (
              <small className="text-danger"> {formik.errors.address}</small>
            )}
          </div>
          <div className="form-floating my-3">
            <input
              type="string"
              className="form-control"
              id="floatingInput"
              placeholder="Image"
              name="image"
              value={formik.values.image}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingInput">image</label>
            {formik.touched.image && formik.errors.image && (
              <small className="text-danger"> {formik.errors.image}</small>
            )}
          </div>

          <button
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
            className="btn btn-info my-3 w-100"
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCard;
