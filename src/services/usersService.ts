import axios from "axios";
import User from "../interfaces/User";
import jwt_decode from "jwt-decode";

const api: string = process.env.REACT_APP_API || "";

// check user - SignIn
export function checkUser(userToCheck: User) {
  return axios.post(`${api}/signin`, userToCheck);
}

// add user - SignUp
export function addUser(userToAdd: User) {
  return axios.post(`${api}/signup`, userToAdd);
}

// get user details
export function getUserProfile() {
  return axios.get(`${api}/profile`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });
}

// get isBusiness from the token
export function getIsBusiness() {
  let token = JSON.parse(sessionStorage.getItem("userData") as string).token;
  return (jwt_decode(token) as any).isBusiness;
}

//gey my cards by user id
export function getMyCards(userId: string) {
  return axios.get(`${api}/myCards`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });
}
