// app.js 
import 'dotenv/config'
import express from 'express'
import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcryptjs'
import cookieParser from 'cookie-parser'
import { v4 as uuidv4 } from 'uuid'


import { sendMyMail } from './lib/mail.mjs'



const prisma = new PrismaClient();
const app = express();
const codes = {};

app.set('view engine', 'ejs')

///////////////////MIDDLEWARES/////////////:

app.use(express.urlencoded({ extended: true} ))
app.use(cookieParser())


app.get('/home', (req, res) => {
   res.render('home', {errorMessage: null})

})



////////////////////////////////////////
const PORT = 3001
app.listen(PORT, () => {
   console.log(`Server listening on port http://localhost:${PORT}`)
})