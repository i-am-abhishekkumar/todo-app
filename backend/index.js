import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import noteRoutes from './routes/note.route.js';
import authRoutes from './routes/auth.note.js';
import cors from 'cors';
dotenv.config()
const app=express();
const port=process.env.PORT;

// app.get('/',(req,res)=>{
//     res.send('Hello Woreld2!');
// })
try{
   mongoose.connect(process.env.MONGO_URL)
   console.log('Connected to the database successfully');
}
catch(error){
    console.log('Cannot connect to the database',error);
}
app.use(express.json());
app.use(cors());
app.use("/api/notes",noteRoutes);
app.use('/api/auth', authRoutes);


app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})