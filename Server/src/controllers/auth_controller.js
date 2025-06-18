import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

export const Login =app.post('/login', async (req, res) => {
    console.log(" called :")
    
    const emailenv = process.env.EMAIL
    const passwordenv = process.env.PASSWORD
    
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" })
        }

        // const user = await User.findOne({  }) // Import user model

        if (email !== emailenv || password !== passwordenv) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        // if (!user) {
        //     return res.status(404).json({ message: "User not found" }) // Verify email
        // }

        // const isPasswordValid = await bcrypt.compare(password, user.password)

        // if (!isPasswordValid) {
        //     return res.status(401).json({ message: "Invalid password" })
        // }

        const token = jwt.sign({ userId: email }, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.status(200).json({ "token": token, "message": "Login successful" })
        
    } catch (error) {
        console.log("Error in login", error)
        res.status(500).json({ message: "Error in login" })
    }
})
