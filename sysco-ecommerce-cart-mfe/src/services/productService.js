import { productApiInstance } from "../api/apiInstance";
import { HTTP_METHODS } from "../constants/constants";

export async function getProduct(productId){
    return productApiInstance
      .request({
        url: `/${productId}`,
        method: HTTP_METHODS.GET,
      })
      .then((response) => {
        return response;
      })
      .catch((e) => {
        throw e;
      });
}

export async function updateProduct(productId, data) {
    return productApiInstance
      .request({
        url: `/${productId}`,
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