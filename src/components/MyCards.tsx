import { FunctionComponent, useContext, useEffect, useState } from "react";
import DeleteCardModal from "./DeleteCardModal";
import UpdateCardModal from "./UpdateCardModal";
import Card from "../interfaces/Card";
import "../css/cards.css";
import { getMyCards } from "../services/myCardsService";
import jwtDecode from "jwt-decode";
import { UserData } from "../App";
import AddCardModal from "./AddCardModal";

interface MyCardsProps {}

const MyCards: FunctionComponent<MyCardsProps> = () => {
  let [userId, setUserId] = useContext(UserData);
  let [cardId, setCardId] = useState<string>("");
  let [cardsChange, setCardsChange] = useState<boolean>(false);
  let [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  let [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  let [openAddModal, setOpenAddModal] = useState<boolean>(false);

  let [irefresh, setIrefresh] = useState<boolean>(false);
  let refresh = () => {
    setIrefresh(!irefresh);
  };
  let [cards, setCards] = useState<Card[]>([]);
  let handleAddCard = () => {
    setOpenAddModal(true);
  };
  useEffect(() => {
    getMyCards(userId)
      .then((res) => {
        setCards(res.data);
        setCardsChange(!cardsChange);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  return (
    <>
      <div className="container">
        <h1 className="display-1 text-center">MY CARDS</h1>
        <button className="btn btn-success" onClick={handleAddCard}>
          <i className="fa-solid fa-plus"></i> Product
        </button>
        {cards.length ? (
          <div className="container">
            <div className="row">
              {cards.map((card: Card) => (
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
        <AddCardModal
          show={openAddModal}
          onHide={() => setOpenAddModal(false)}
          refresh={refresh}
        />
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
