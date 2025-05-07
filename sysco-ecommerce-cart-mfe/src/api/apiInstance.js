import axios from "axios";
import config from "../config/config.json";

export const cartApiInstance = axios.create({
  baseURL: `${config.baseURL}/bff/api/v1/carts`,
});

export const productApiInstance = axios.create({
  baseURL: `${config.baseURL}/bff/api/v1/products`,
});

export const orderApiInstance = axios.create({
  baseURL: `${config.baseURL}/bff/api/v1/order`,
});
