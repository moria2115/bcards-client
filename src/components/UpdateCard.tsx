import { useFormik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import * as yup from "yup";
import { getCardById, updateCard } from "../services/cardsService";
import Card from "../interfaces/Card";
import { successMsg } from "../services/feedbacks";

interface UpdateCardProps {
  onHide: Function;
  cardId: string;
  refresh: Function;
}

const UpdateCard: FunctionComponent<UpdateCardProps> = ({
  onHide,
  cardId,
  refresh,
}) => {
  let [card, setCard] = useState<Card>({
    name: "",
    description: "",
    website: "",
    phone: "0",
    address: "",
    image: "",
  });
  let formik = useFormik({
    initialValues: {
      name: card.name,
      description: card.description,
      website: card.website,
      phone: card.phone,
      address: card.address,
      image: card.image,
    },
    validationSchema: yup.object({
      name: yup.string().required().min(2),
      description: yup.string().required().min(5),
      address: yup.string().required().min(5),
      phone: yup.string().required().min(8),
      image: yup.string().required().min(5),
      website: yup.string().required().min(5),
    }),
    enableReinitialize: true,
    onSubmit: (values: Card) => {
      updateCard({ ...values, _id: cardId })
        .then(() => {
          onHide();
          successMsg("Card updated successfully!");
          refresh();
        })
        .catch((err) => console.log(err));
    },
  });

  useEffect(() => {
    getCardById(cardId)
      .then((res) => setCard(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1 className="Display-1 text-center my-3">UPDATE CARD</h1>
      <div className="container">
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
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateCard;
