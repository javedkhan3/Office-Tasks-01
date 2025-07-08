// src/api/apiService.js
import axios from "axios";
import { BASE_URL } from "./api-base-url";

// API url  with base 
const END_POINT = `${BASE_URL}/v1/CRUD-2`;

// console.log(BASE_URL.data);

// 🟢 Fetch all users
export const fetchUsers = async () => {
  const res = await axios.get(END_POINT);
  return res.data;
};

// 🟢 Add new user
export const addUser = async (data) => {
  const res = await axios.post(END_POINT, data);
  return res.data;
};

// 🟢 Edit existing user
export const updateUser = async (id, data) => {
  const res = await axios.put(`${END_POINT}/${id}`, data);
  return res.data;
};

// 🟢 Delete a user
export const deleteUser = async (id) => {
  const res = await axios.delete(`${END_POINT}/${id}`);
  return res.data;
};

// 🟢 Get single user (optional)
export const getUserById = async (id) => {
  const res = await axios.get(`${END_POINT}/${id}`);
  return res.data;
};
