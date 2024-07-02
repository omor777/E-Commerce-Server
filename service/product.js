import Product from "../models/product.models.js"

const findProductById = (key,value)=>{
    if(key === '_id') {
    return Product.findById(value)
    }
    return Product.findOne({[key]:value})
}


export {findProductById}