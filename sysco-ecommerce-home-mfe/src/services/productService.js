// products GET,POST,PATCH,PUT

import { productApiInstance } from "../api/apiInstance";
import { HTTP_METHODS } from "../constants/constants";

export async function getProducts() {
  return productApiInstance
    .request({
      url: `/`,
      method: HTTP_METHODS.GET,
    })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      throw e;
    });
}

export async function addProduct(data) {
  return productApiInstance
    .request({
      url: `/`,
      method: HTTP_METHODS.POST,
      data:data,
    })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      throw e;
    });
}

export async function updateProduct(id,data) {
  return productApiInstance
    .request({
      url: `/${id}`,
      method: HTTP_METHODS.PATCH,
      data:data,
    })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      throw e;
    });
}

export async function deleteProduct(id) {
  return productApiInstance
    .request({
      url: `/${id}`,
      method: HTTP_METHODS.DELETE,
    })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      throw e;
    });
}

export async function getProductByName(name) {
  return productApiInstance
    .request({
      url: `/name/${name}`,
      method: HTTP_METHODS.GET,
    })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      throw e;
    });
}

export async function getProductById(id) {
  return productApiInstance
    .request({
      url: `/${id}`,
      method: HTTP_METHODS.GET,
    })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      throw e;
    });
}



