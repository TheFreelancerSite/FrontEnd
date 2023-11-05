import axios from "axios";

const API_URL = "http://localhost:3000";

export const register = async (userData) => {
  try {
    const response = await axios.post(API_URL+"/user/signup", userData);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};


export const login = async (email , password) => {
  try {
    const response = await axios.post(API_URL+"/user/signin", {
      email : email , 
      password : password
    })
    return response.data
  }catch (error){
    console.error("Sign-in failed", error);
  }
}

export const logout =  () => {
  return localStorage.clear()
  }
