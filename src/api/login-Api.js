import axios from "axios";
import { BASE_URL } from "./api-base-url";

const USERS_ENDPOINT = `${BASE_URL}/v1/CRUD-2`;

export const loginUser = async (email, password) => {
  const res = await axios.get(USERS_ENDPOINT);
  const user = res.data.find(
    (u) => u.email === email && u.password === password
  );
  return user; // will return undefined if no match
};
