import axios from "axios";
import Card from "../interfaces/Card";

const api: string = process.env.REACT_APP_API || "";

// get all cards
export function getCards() {
  return axios.get(`${api}/cards`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });
}

export function getMyCards() {
  return axios.get(`${api}/myCards`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });
}

// get specific Card
export function getCardById(id: string) {
  return axios.get(`${api}/cards/${id}`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });
}

// add new card
export function addCard(cardToAdd: Card) {
  return axios.post(`${api}/myCards`, cardToAdd, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });
}

// update card (includes id field)
export function updateCard(newCard: Card) {
  return axios.put(`${api}/myCards/${newCard._id}`, newCard, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });
}

// delete card
export function deleteCard(id: string) {
  return axios.delete(`${api}/myCards/${id}`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });
}
