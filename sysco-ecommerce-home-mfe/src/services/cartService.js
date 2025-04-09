import { cartApiInstance } from "../api/apiInstance";
import { HTTP_METHODS } from "../constants/constants";

export async function createCartIfnotExist(userId) {
  return cartApiInstance
    .request({
      url: `/`,
      method: HTTP_METHODS.POST,
      data: { userId },
    })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      throw e;
    });
}

export async function addItemstoCart(cartId, quantity, price, productId) {
  return cartApiInstance
    .request({
      url: `/${cartId}/items`,
      method: HTTP_METHODS.PUT,
      data: { quantity, price, productId },
    })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      throw e;
    });
}
