import { getProduct,updateProduct } from "../services/productService";

export async function getExistingProductQuantity(productId){
    try {
        const response = await getProduct(productId);
        return response.data;
    } catch (error) {
        console.error("Error adding product ", error);
        throw error;
    }
}

export async function updateProductQuantity(productId, quantity){

    const data = {
        quantity: quantity,
    }

    try {
        const response = await updateProduct(productId, data);
        return response.data;
    } catch (error) {
        console.error("Error adding product ", error);
        throw error;
    }

}