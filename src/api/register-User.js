import axios from "axios";
import { BASE_URL } from "./api-base-url";

const END_POINT = `${BASE_URL}/v1/CRUD-2`;

// 🟢 Register a new user
export const registerUser = async (formData) => {
  // Fetch existing users first
  const existing = await axios.get(END_POINT);

  const emailExists = existing.data.some(
    (user) =>
      user.email.toLowerCase().trim() === formData.email.toLowerCase().trim()
  );

  if (emailExists) {
    throw new Error("Email already exists");
  }

  // Post the new user
  const res = await axios.post(END_POINT, {
    ...formData,
    createdAt: new Date().toISOString(),
  });

  return res.data;
};
