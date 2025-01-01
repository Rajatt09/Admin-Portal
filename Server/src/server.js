import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/auth_routes.js'
import apiRoutes from './routes/api_routes.js'


dotenv.config();

const app = express();
app.use(cors(
    {
        origin: 'http://localhost:5173'
    }
));
app.use(express.json());    

app.use('/auth/v1', authRoutes);
app.use('/api/v1', apiRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));