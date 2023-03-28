import axios from "axios";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import DeleteCardModal from "./DeleteCardModal";
import UpdateCardModal from "./UpdateCardModal";
import Card from "../interfaces/Card";
import "../css/cards.css";
import { getMyCards, getUserProfile } from "../services/usersService";

interface MyCardsProps {}

const MyCards: FunctionComponent<MyCardsProps> = () => {
  let [userId, setUserId] = useState<any>({});
  let [myCards, setMyCards] = useState<Card[]>([]);
  let [cardId, setCardId] = useState<string>("");
  let [cardsChange, setCardsChange] = useState<boolean>(false);
  let [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  let [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);

  let refresh = () => {
    setCardsChange(!cardsChange);
  };

  useEffect(() => {
    getUserProfile()
      .then((res) => {
        setUserId(res.data._id);
        console.log(res.data._id);
      })
      .catch((error) => {
        console.log(error);
      });
    getMyCards(userId).then((res) => {
      console.log(res.data);

      setMyCards(res.data);
    });
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="display-1 text-center">MY CARDS</h1>
        {myCards.length ? (
          <div className="container">
            <div className="row">
              {myCards.map((card: Card) => (
                <div
                  className="card border col-md-3  m-2"
                  style={{ width: "18rem" }}
                  key={card.name}
                >
                  <div className="cardImg">
                    <img
                      src={card.image}
                      className="card-img-top p-2 mt-3 mx-auto"
                      alt={card.name}
                      style={{ width: "8rem" }}
                    />
                  </div>
                  <div className="card-body align-middle">
                    <h5 className="card-title text-center">{card.name}</h5>
                    <p className="card-text">{card.description}</p>
                  </div>
                  <div className="container">
                    <span>
                      <i className="fa-solid fa-phone"></i> {card.phone}
                    </span>
                    <hr />
                    <span>
                      <i className="fa-solid fa-location-pin"></i>{" "}
                      {card.address}
                    </span>
                    <hr />
                    <span>
                      <i className="fa-solid fa-globe"></i> {card.website}
                    </span>
                  </div>
                  <button
                    className="btn btn-warning m-2"
                    onClick={() => {
                      setOpenUpdateModal(true);
                      setCardId(card._id as string);
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i> Edit
                  </button>
                  <button
                    className="btn btn-danger m-2"
                    onClick={() => {
                      setOpenDeleteModal(true);
                      setCardId(card._id as string);
                    }}
                  >
                    <i className="fa-solid fa-trash"></i> Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No Cards</p>
        )}

        <DeleteCardModal
          refresh={refresh}
          show={openDeleteModal}
          onHide={() => setOpenDeleteModal(false)}
          cardId={cardId}
        />
        <UpdateCardModal
          refresh={refresh}
          show={openUpdateModal}
          onHide={() => setOpenUpdateModal(false)}
          cardId={cardId}
        />
      </div>
    </>
  );
};

export default MyCards;
