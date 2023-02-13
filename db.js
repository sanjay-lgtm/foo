import mongoose from "mongoose";
const db = require('./config').get('local').db;
import dotenv from 'dotenv';
dotenv.config();
console.log(db);

var mongourl = `mongodb://${db.host}:${db.portno}/${db.dbname}`;
console.log(mongourl);

export const mongoconnection = async () => {
    try {
        await mongoose.connect(mongourl, { useNewUrlParser: true }, async (err, result) => {
            if (err) console.log("---", err)
            else {
                console.log("connected");
                const fetched_data = await mongoose.connection.db.collection("food_items");
                fetched_data.find({}).toArray(async function (err, data) {
                    const foodCategary = await mongoose.connection.db.collection("foodCategary");
                    foodCategary.find({}).toArray(function(err,catData){
                        if(err) console.log(err);
                        else 
                        {
                            global.food_items = data;
                            global.foodCategary = catData;
                        }
                    })
                    })
                    // if(err) console.log(err);
                    // else 
                    // {
                    //     global.food_items co= data;
                    //     // console.log(global.food_items)
                    // }
                
            }
        })
        console.log("connection success");
    }
    catch (e) {
        throw e
    }
}