import { cartApiInstance } from "../api/apiInstance";
import { HTTP_METHODS } from "../constants/constants";

export async function createCart(data) {
  return cartApiInstance
    .request({
      url: `/`,
      method: HTTP_METHODS.POST,
      data: data,
    })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      throw e;
    });
}

export async function updateCart(cartId, data) {
  return cartApiInstance
    .request({
      url: `/${cartId}`,
      method: HTTP_METHODS.PATCH,
      data: data,
    })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      throw e;
    });
}

export async function getCart(cartId) {
  return cartApiInstance
    .request({
      url: `/${cartId}/items`,
      method: HTTP_METHODS.GET,
    })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      throw e;
    });
}

export async function getCartByUserId(userId) {
  return cartApiInstance
    .request({
      url: `/user/${userId}`,
      method: HTTP_METHODS.GET,
    })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      throw e;
    });
}

export async function addProductToCart(cartId, productId, data) {
  return cartApiInstance
    .request({
      url: `/${cartId}/products/${productId}`,
      method: HTTP_METHODS.POST,
      data: data,
    })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      throw e;
    });
}

export async function updateProductInCart(cartId, productId, data) {
  return cartApiInstance
    .request({
      url: `/${cartId}/products/${productId}`,
      method: HTTP_METHODS.PATCH,
      data: data,
    })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      throw e;
    });
}

export async function deleteProductInCart(cartId, productId, data) {
  return cartApiInstance
    .request({
      url: `/${cartId}/products/${productId}`,
      method: HTTP_METHODS.DELETE,
      data: data,
    })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      throw e;
    });
}

export async function getProductsInCart(cartId) {
  return cartApiInstance
    .request({
      url: `/${cartId}/products`,
      method: HTTP_METHODS.GET,
    })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      throw e;
    });
}

export async function getProduct(cartId, productId) {
  return cartApiInstance
    .request({
      url: `/${cartId}/products/${productId}`,
      method: HTTP_METHODS.GET,
    })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      throw e;
    });
}

export async function removeProduct(cartId, productId) {
  return cartApiInstance
    .request({
      url: `/${cartId}/products/${productId}`,
      method: HTTP_METHODS.DELETE,
    })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      throw e;
    });
}
