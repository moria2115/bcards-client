import axios from "axios";
import Card from "../interfaces/Card";

const api: string = process.env.REACT_APP_API + "/cards" || "";

// get all cards
export function getCards() {
  return axios.get(api, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });
}

// get specific Card
export function getCardById(id: string) {
  return axios.get(`${api}/${id}`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });
}

// add new card
export function addCard(cardToAdd: Card) {
  return axios.post(api, cardToAdd, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });
}

// update card (includes id field)
export function updateCard(newCard: Card) {
  return axios.put(`${api}/${newCard._id}`, newCard, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });
}

// delete card
export function deleteCard(id: string) {
  return axios.delete(`${api}/${id}`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });
}
