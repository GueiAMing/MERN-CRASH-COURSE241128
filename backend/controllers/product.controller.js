import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProduct = async (req, res) => {

    try {
        const products = await Product.find({});//這個model基於mongoose所以可以CRUD
        res.status(200).json({ success: true, data: products });    
    } catch (error){
        console.error("Error in fetching products:", error.message);
        res.status(404).json({ success: false, message: "Server error"});
    }
}

export const createProduct = async (req, res) => {
    const product = req.body; // user will send this data

    if (!product.name || (!product.price) || (!product.image)){
          return res.status(400).json({ success:false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product) //引入./backend/model/product.model.js的Product (model)

    try {
        await newProduct.save();//這個model基於mongoose所以可以CRUD
        res.status(201).json({ success: true, data:newProduct});    
    } catch (error){
        console.error("Error in Create product:", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
}

export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid Product Id"})
    }
    
    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product,{new: true});//new設定true才會回傳更新後的資料，否則是更新前的
        res.status(200).json({ success: true, data: updatedProduct});
    } catch (error){
        res.status(500).json({ success: false, message: "Server error"});
    }
}

export const deleteProduct = async (req, res) => {
    
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid Product Id"})
    }

    try {
        await Product.findByIdAndDelete(id);//這個model基於mongoose所以可以CRUD
        res.status(200).json({ success: true, message: "Product deleted"});    
    } catch (error){
        console.error("Error in Create product:", error.message);
        res.status(500).json({ success: false, message: "Server error"});
    }
}