import express from 'express'
import dotenv from 'dotenv'
import authRoute from './routes/authRoute.js'
import postRoute from './routes/postRoute.js'
import userRoute from './routes/userRoute.js'
import messageRoute from './routes/messageRoute.js'
import { connectDB } from './lib/database.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { fileURLToPath } from 'url'
import path from 'path'
import { app, server } from "./socket/socket.js";

// Config
dotenv.config({})

const PORT = process.env.PORT || 5000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/posts', postRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/message', messageRoute)

app.use('/backend/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(express.static(path.join(__dirname, '../frontend/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})

server.listen(PORT, () => {
    connectDB()
    console.log(`Server running on PORT: ${PORT}`)
})









