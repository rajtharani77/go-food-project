import express from "express";
import Order from "../models/Orders.js";

const router = express.Router();

router.post('/orderData', async (req, res) => {
    if (!req.body.email) {
        return res.status(400).send("Server Error: Email is required to place an order.");
    }

    let data = [{ Order_date: req.body.order_date }, ...req.body.order_data];


    try {
        let eId = await Order.findOne({ 'email': req.body.email });

        if (eId === null) {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
            res.json({ success: true });
        } else {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            res.json({ success: true });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});

router.post("/myorderData", async (req, res) => {
    try {
        let myData = await Order.findOne({ 'email': req.body.email });
        res.json({OrderData: myData});
    } catch (error) {
        res.status(500).send("Server Error: " + error.message);
    }
})
export default router; 