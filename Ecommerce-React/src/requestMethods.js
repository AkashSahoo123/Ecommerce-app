import axios from "axios";

const BASE_URL = "https://ecommerce-app-server-akashs-projects-14840feb.vercel.app/api";



// Retrieve persisted data from localStorage
const persistedDataString = localStorage.getItem("persist:root");
const persistedData = persistedDataString ? JSON.parse(persistedDataString) : null;

// Extract access token if user data exists
const userToken = persistedData?.user
const userTokendata=userToken?JSON.parse(persistedData?.user):null;
const accessToken=userTokendata?.currentUser?.accessToken ?? null;

// Configure axios instance with or without token based on the presence of accessToken
const axiosConfig = {
  baseURL: BASE_URL,
};

const axiosConfigWithToken = accessToken
  ? {
      baseURL: BASE_URL,
      headers: { token: `Bearer ${accessToken}` },
    }
  : {
      baseURL: BASE_URL,
    };

// Create axios instances
export const publicRequest = axios.create(axiosConfig);
export const userRequest = axios.create(axiosConfigWithToken);
