// const express = require('express');  引用沒幾次就可以這樣寫
import express from "express"; //直接引入整個模組，package.json的設定遺漏了 "type":"module", 要去增加
import dotenv from "dotenv";//引入讀取.env下文字機密資料

import path from "path";//Deployment時要用到的

import { connectDB } from "./config/db.js";

import productRouters from "./routes/product.route.js" //引入productRouter

dotenv.config();//讀取機密資料用

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/products", productRouters);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) =>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

app.listen(PORT,() =>{
    connectDB();//第四行引入mongoDB的連接辦法
    console.log("Server started at http://localhost:" + PORT);
});

