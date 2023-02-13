import express from 'express';
const displayrouter =express.Router();

displayrouter.post('/foodData',(req,res) => {
    try {
        // console.log(global.food_items);
        res.send([global.food_items,global.foodCategary])
    } catch (error) {
        console.error(error.message);
        res.send("Server Error");
    }
})

export default displayrouter;