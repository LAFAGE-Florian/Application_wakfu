// app.js 
import 'dotenv/config'
import express from 'express'
import { PrismaClient } from "@prisma/client"
// import bcrypt from 'bcryptjs'
import cookieParser from 'cookie-parser'
// import { v4 as uuidv4 } from 'uuid'





const prisma = new PrismaClient();
const app = express();
const codes = {};

app.set('view engine', 'ejs')

///////////////////MIDDLEWARES/////////////:

app.use(express.json())
app.use(cookieParser())


app.get('/home', (req, res) => {
   res.render('home', {errorMessage: null})

})

app.get('/api/items', async (req, res) => {
   const { page = 1, limit = 25 } = req.query; // Obtenir les paramètres page et limit (valeurs par défaut)
   console.log("Paramètres reçus dans la requête :", { page, limit });
   const skip = parseInt((page - 1) * limit, 10); // Calcul de l'offset
   const take = parseInt(limit, 10);
   try {
      const items = await prisma.items.findMany({
        skip,
        take,
      });
  
      console.log("Articles récupérés :", items);
  
      const totalItems = await prisma.items.count();
  
      res.json({
        items,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: parseInt(page, 10),
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des articles :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  });

////////////////////////////////////////
const PORT = 3001
app.listen(PORT, () => {
   console.log(`Server listening on port http://localhost:${PORT}`)
})