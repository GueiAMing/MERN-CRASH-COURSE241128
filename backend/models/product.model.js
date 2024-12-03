import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true    // name屬性，類型是字串，不能空白否則會拋出錯誤
    },
    price:{
        type: String,
        required: true   // price屬性，同上
    },
    image:{
        type: String,
        required: true  // image屬性，同上
    }
}, {
    timestamps: true // createdAt, updatedAt 自動記錄創建和修改時間
})

const Product = mongoose.model('Product', productSchema); //此model可做到CRUD

export default Product; //將 Product 模型作為默認導出，方便在其他文件中引用。

//----------------------------------------------------------------------//
// 完整流程概述
// 引入 Mongoose，用於連接和操作 MongoDB。
// 定義 Schema，描述集合的數據結構，包括屬性類型和約束。
// 創建 Model，通過 Model 與 MongoDB 交互。
// 導出 Model，供其他模塊使用。