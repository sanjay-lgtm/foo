import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/User';

import { mongoconnection } from './db';
import displayrouter from './routes/DisplayData';

mongoconnection();
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-control-Allow-Origin', "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, x-Requested-With,Content-Type,Accept"
    );
    next();
})
app.use("/api", router);
app.use("/api", displayrouter);
export default app;