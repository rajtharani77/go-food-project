import express, { Router } from "express";
const Displayrouter = express.Router();

Displayrouter.post("/foodData",(req,res)=>{
    try {
        res.send([global.food_items,global.food_category]);
    } catch (error) {
        res.send("server error");
        console.log(error.message);
        
    }
})
export default Displayrouter;