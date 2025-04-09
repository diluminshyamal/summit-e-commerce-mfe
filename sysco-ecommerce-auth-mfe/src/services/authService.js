// src/services/authService.js
import authApiInstance from "../api/authApiInstance";
import { HTTP_METHODS } from "../utils/constants";

export async function getCurrentUser() {
  return authApiInstance
    .request({
      url: `/users/me`,
      method: HTTP_METHODS.GET,
    })
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
}

export async function login(credentials) {
  return authApiInstance
    .request({
      url: `/auth/signin`,
      method: HTTP_METHODS.POST,
      data: credentials,
    })
    .then((response) => {
      const userId = response.data.data.user.id;
      const userType = response.data.data.user.userType;

      localStorage.setItem("userId", userId);
      localStorage.setItem("userType", userType);

      return response;
    })
    .catch((error) => {
      throw error;
    });
}

export async function signup(userData) {
  return authApiInstance
    .request({
      url: `/auth/signup`,
      method: HTTP_METHODS.POST,
      data: userData,
    })
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
}
