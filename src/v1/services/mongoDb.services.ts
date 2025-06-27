import Product from "../model/Product.model"

export const findProductByUserId = async (userId: string) => {
    return await Product.findById(userId)
}