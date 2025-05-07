import { orderApiInstance } from "../api/apiInstance";
import { HTTP_METHODS } from "../constants/constants";

export async function getOrderByUserId(userId) {
  return orderApiInstance
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
