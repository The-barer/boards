import axios from "axios";
import { getAccessTokenFromLocalStorage } from "../Helpers/localStorage.helper";

export const todoAppServer = axios.create({
  baseURL: "http://localhost:4003/api/",
  headers: {
    Authorization: "Bearer " + getAccessTokenFromLocalStorage(),
  },
});
