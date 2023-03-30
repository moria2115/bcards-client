import axios from "axios";

const api: string = process.env.REACT_APP_API + "/myCards" || "";

// get My Cards
export function getMyCards(id: string) {
  return axios.get(`${api}/${id}`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });
}
