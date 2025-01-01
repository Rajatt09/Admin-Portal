import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/auth_routes.js'


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());    

app.use('/auth/v1', authRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));