import { FunctionComponent, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import {
  getCardsInFavorites,
  removeCardFromFavorites,
} from "../services/favoritesService";

interface FavoriteCardsProps {}

const FavoriteCards: FunctionComponent<FavoriteCardsProps> = () => {
  let [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    getCardsInFavorites()
      .then((res) => setCards(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1 className="display-1 text-center my-3">
        <i className="fa-solid fa-address-card"></i> FAVORITES CARDS
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

export default FavoriteCards;
