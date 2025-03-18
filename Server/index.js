import express from 'express';
import cors from 'cors';
import  Jwt  from 'jsonwebtoken';
import { AdminRouter } from './Routes/AdminRoute.js'; 
import { EmployeeRouter } from './Routes/EmployeeRoute.js';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
dotenv.config();

const app = express();


app.use(cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:5173',
        'https://emp-management-weld.vercel.app'
      ];
      
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));
  

app.use(express.json());
app.use(cookieParser())
app.use('/auth', AdminRouter);
app.use('/employee',EmployeeRouter)
app.use(express.static('Public'))


let PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
    console.log("Server has been started");
});
