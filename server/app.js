import dotenv from 'dotenv';
import express from 'express';
import userRoutes from './routes/userRouter.js';
import adminRouter from './routes/adminRouter.js';
import mongoose from 'mongoose';
import cors from 'cors';


dotenv.config();

mongoose.connect(process.env.MONGO_CONNECTION_URL,
   {useNewUrlParser: true, useUnifiedTopology: true}, 
   (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Banco de dados conectado');
    }
});

const app = express();

app.use(cors());
app.use('/user', express.json(), userRoutes);
app.use('/admin', express.json(), adminRouter);


app.listen(process.env.PORT, () => {
  console.log('Server Running')
});