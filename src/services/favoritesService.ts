import axios from "axios";
import Card from "../interfaces/Card";

const api: string = process.env.REACT_APP_API + "/favorites" || "";

// add card to user's favorites
export function addCardToFavorites(card: Card) {
  return axios.post(api, card, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });
}

// remove card from user's favorites
export function removeCardFromFavorites(cardId: string) {
  return axios.delete(`${api}/:${cardId}`);
}

// get user's cards in favorites by userId
export function getCardsInFavorites() {
  return axios.get(api, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });
}
