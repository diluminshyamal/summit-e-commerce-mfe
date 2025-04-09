import axios from "axios";
import config from "../config/config.json";

export const productApiInstance = axios.create({
  baseURL: `${config.productServiceBaseURL}/bff/api/v1/product`,
});

// export const productCategoryApiInstance = axios.create({
//   baseURL: `${config.productServiceBaseURL}/bff/api/v1/hii`,
// });

export const cartApiInstance = axios.create({
  baseURL: `${config.productServiceBaseURL}/bff/api/v1/cart`,
});
