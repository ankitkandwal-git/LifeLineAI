import express from 'express'
import bcrypt from 'bcryptjs' // Import bcrypt for password hashing
import jwt from 'jsonwebtoken' // Import jsonwebtoken for JWT creation
import User from '../models/User.js' // Import your User model

export const registerUser = async(req,res) =>{
    const {name,email,password} = req.body
    if(!name || !email || !password){
        return res.status(400).json({message:"Please fill all the fields"})
    }
    if(password.length < 6){
        return res.status(400).json({message:"Password must be at least 6 characters"})
    }
    try{
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const user  = await User.create({name,email,password:hashedPassword})

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined in environment variables.");
            return res.status(500).json({ message: "Server configuration error: JWT secret missing." });
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.status(201).json({token,name:user.name,email:user.email})
    }catch(err){
        console.error("Error during user registration:", err);
        if (err.code === 11000) { // Duplicate key error code
            return res.status(409).json({ message: "User with this email already exists." });
        }
        res.status(500).json({message:"Server error during registration."})
    }
}

export const loginUser = async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(400).json({message:"Please fill all the fields"})
    }
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({message:"Invalid credentials"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials"})
        }

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined in environment variables.");
            return res.status(500).json({ message: "Server configuration error: JWT secret missing." });
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.status(200).json({token,name:user.name,email:user.email})

    }catch(err){
        console.error("Error during user login:", err);
        res.status(500).json({message:"Server error during login."})
    }
}