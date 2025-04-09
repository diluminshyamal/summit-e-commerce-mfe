import { addProductToCart, 
        getCartByUserId, 
        createCart, 
        updateCart, 
        getProduct,
        removeProduct } 
    from "../services/cartService";

export async function addToCart(data) {

    const {cartId, productId, quantity, total_price} = data;

    const productData = {
        cartId: cartId,
        productId: productId,
        quantity: quantity,
        total_price: total_price 
    }

    try {
        const response = await addProductToCart(cartId, productId, productData);
        return response.data;
    } catch (error) {
        console.error("Error adding product ", error);
        throw error;
    }

}

export async function createUserCart(userId) {

    const data = {
        userId: userId,
        totalCost: 0,
        status: "live"
    }

    try {
        const response = await createCart(data);
        return response.data;
    } catch (error) {
        console.error("Failed to create a new cart:", error.message);
        throw error;
    }

}

export async function getUserCart(userId){

    try {
        const response = await getCartByUserId(userId);
        return response.data;
    } catch (error) {
        console.error("An error occurred while fetching the user's cart:", error.message);
        if (error.response && error.response.status === 404) {
            console.error("The cart was not found for the user.");
            return null;
        } else {
            console.error("An unexpected error occurred.");
            throw error;
        }
    }

}

export async function updateUserCart(cartId, data){

    try{
        const response = await updateCart(cartId, data);
        return response.data;
    } catch(error){
        throw error;
    }

}

export async function removeCartItem(cartId, productId, removedQuantity){
    try{
        const response = await removeProduct(cartId, productId);
        return response;
    }catch(error){
        throw error;
    }
}

export async function getExistingItemData(cartId, productId){
    try{
        const response = await getProduct(cartId, productId);
        return response.data
    } catch(error){
        throw error;
    }

}
