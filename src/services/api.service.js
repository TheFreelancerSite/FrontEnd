import { Description } from "@mui/icons-material";
import axios from "axios";

const API_URL = "http://localhost:3000";

export const register = async (userData) => {
  try {
    const response = await axios.post(API_URL + "/user/signup", userData);
    console.log(response.data, "im heeere");
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL + "/user/signin", {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error("Sign-in failed", error);
  }
};

export const logout = () => {
  return localStorage.clear();
};

export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/getUser/${userId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateProfile = async (userId, userData) => {
  try {
    const update = await axios.put(
      `${API_URL}/user/update/${userId}`,
      userData
    );
    console.log(update.data);
    return update.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const report = async (userId, serviceId, description) => {
  try {
    const response = await axios.post(`${API_URL}/send/report`, {
      userId,
      serviceId,
      description,
    });

    const { data } = response;

    return data;
  } catch (error) {
    console.error("Error reporting:", error);
    throw error; // Rethrow the error for further handling if needed
  }
};
