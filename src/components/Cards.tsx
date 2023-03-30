import { FunctionComponent, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { getCards } from "../services/cardsService";
import { successMsg } from "../services/feedbacks";
import { addCardToFavorites } from "../services/favoritesService";

interface CardsProps {}

const Cards: FunctionComponent<CardsProps> = () => {
  let [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    getCards()
      .then((res) => setCards(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1 className="display-1 text-center my-3">
        <i className="fa-solid fa-address-card"></i> BUSINESS CARDS
      </h1>
      {cards.length ? (
        <div className="container mx-auto">
          <div className="row ">
            {cards.map((card: Card) => (
              <div
                className="card border col-md-3  m-2"
                style={{ width: "18rem" }}
                key={card._id}
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
                <div className="container mb-2">
                  <span>
                    <i className="fa-solid fa-phone"></i> {card.phone}
                  </span>
                  <hr />
                  <span>
                    <i className="fa-solid fa-location-pin"></i> {card.address}
                  </span>
                  <hr />
                  <span>
                    <i className="fa-solid fa-globe"></i> {card.website}
                  </span>
                </div>
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    addCardToFavorites(card)
                      .then(() =>
                        successMsg(`Card ${card.name} added to favorites`)
                      )
                      .catch((err) => console.log(err));
                  }}
                >
                  <i className="fa-solid fa-heart"></i> Add to favorites
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No Cards</p>
      )}
    </>
  );
};

export default Cards;
