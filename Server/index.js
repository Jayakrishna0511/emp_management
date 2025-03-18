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
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST','PUT','DELETE'],
    credentials:true
}));

app.use(express.json());
app.use(cookieParser())
app.use('/auth', AdminRouter);
app.use('/employee',EmployeeRouter)
app.use(express.static('Public'))


// export const verifyUser = (req,res,next)=>{
//     const token = req.cookies.token
//     if(token){
//         Jwt.verify(token, process.env.JWT_SECRET,(err,decoded)=>{
//             if(err) return res.json({Status: flase ,Error:"Wrong token"})
//             req.id = decoded.id;
//             req.role = decoded.role;
//             next()
//         })

//     }else{
//         return res.json({Status:false,Error:"Not Authenticated"})
//     }

// }
// app.get('/verify',verifyUser,(req,res)=>{
//     return res.json({Status:true,role:req.role ,id:req.id})

// })

let PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
    console.log("Server has been started");
});
