import express from 'express';
import { Login } from '../controllers/auth_controller.js';

const route = express.Router();

route.post('/login', Login);


export default route
