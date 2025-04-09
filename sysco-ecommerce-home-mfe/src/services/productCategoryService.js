// import { productCategoryApiInstance } from "../api/apiInstance";
// import { HTTP_METHODS } from "../constants/constants";

// export async function getProductCategories() {
//   return productCategoryApiInstance
//     .request({
//       url: `/`,
//       method: HTTP_METHODS.GET,
//     })
//     .then((response) => {
//       return response;
//     })
//     .catch((e) => {
//       throw e;
//     });
// }

// export async function getProductsInCategory(id) {
//   return productCategoryApiInstance
//     .request({
//       url: `/${id}/products`,
//       method: HTTP_METHODS.GET,
//     })
//     .then((response) => {
//       return response;
//     })
//     .catch((e) => {
//       throw e;
//     });
// }

// export async function addCategory(data) {
//   return productCategoryApiInstance
//     .request({
//       url: `/`,
//       method: HTTP_METHODS.POST,
//       data: data,
//     })
//     .then((response) => {
//       return response;
//     })
//     .catch((e) => {
//       throw e;
//     });
// }

// export async function updateCategory(id, data) {
//   return productCategoryApiInstance
//     .request({
//       url: `/${id}`,
//       method: HTTP_METHODS.PATCH,
//       data: data,
//     })
//     .then((response) => {
//       return response;
//     })
//     .catch((e) => {
//       throw e;
//     });
// }

// export async function deleteCategory(id) {
//   return productCategoryApiInstance
//     .request({
//       url: `/${id}`,
//       method: HTTP_METHODS.DELETE,
//     })
//     .then((response) => {
//       return response;
//     })
//     .catch((e) => {
//       throw e;
//     });
// }
