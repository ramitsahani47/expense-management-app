
import dotenv from "dotenv";


// Load .env file first 
dotenv.config();


import app from './app';


const port = 5000;


app.listen((port), () => {
    console.log(`server running on ${port}`)
})