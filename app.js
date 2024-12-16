import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import router from "./routes/api.js";

import {
    PORT,
    DATABASE,
    WEB_CACHE,
    MAX_JSON_SIZE,
    URL_ENCODE,
    REQUEST_TIME,
    REQUEST_NUMBER
} from "./app/config/config.js";
import TrafficMiddleware from './app/middlewares/TrafficMiddleware.js';

const app = express();

// set web Traffic
TrafficMiddleware(app);

//Global Application Middleware
app.use(cors());
app.use(express.json({limit:MAX_JSON_SIZE}));
app.use(express.urlencoded({extended: URL_ENCODE}));
app.use(helmet());
app.use(cookieParser());
// Rate Limiting middleware
const limiter =rateLimit({windowMs:REQUEST_TIME,max:REQUEST_NUMBER});
app.use(limiter);
  
//Web Caching
app.set('etag',WEB_CACHE);

//MongoDB Connection
mongoose.connect(DATABASE,{autoIndex:true}).then(()=>{
    console.log("Connected to MongoDB");
}).catch(err=>{
    console.log("Error connecting to MongoDB");
})


//Set API Routes
app.use("/api",router);

//Run Your Express Back End Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});