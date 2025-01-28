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


app.get("/api/items", async (req, res) => {
   try {
      const { 
         lvlMin,
         lvlMax,
         type,
         rarity,
         page = 1,
         limit = 15,
         sortOrder = req.query.sortOrder || "asc",
       } = req.query;
       
      // Conversion paramètres en nbres 
      const pageInt = parseInt(page);
      const limitInt = parseInt(limit);

      // Création des filtres
      const filters = {
         lvl: {
         gte: parseInt(lvlMin) || 1, // Niveau minimum par défaut : 1
         lte: parseInt(lvlMax) || 230, // Niveau maximum par défaut : 230
         },
      };
   
      if (type) {
         filters.type = type; // Filtrer par type si défini
      }
   
      if (rarity) {
         filters.rarity = rarity; // Filtrer par rareté si défini
      }
   
      //Nbre total des items correspondant aux filtres
      const totalItemsFilters = await prisma.items.count({
         where: filters,
      });


      const totalPages = Math.ceil(totalItemsFilters / limitInt)

      // Récupération des items filtrés
      const items = await prisma.items.findMany({
         where: filters,
         skip: (pageInt - 1) * limitInt,
         take: limitInt,
         orderBy: {
            lvl: sortOrder,
         },
      });
   
      res.status(200).json({
         items,
         totalItemsFilters,
         totalPages,
         currentPage: pageInt,
   });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la récupération des items" });
   }
   });


////////////////////////////////////////
const PORT = 3001
app.listen(PORT, () => {
   console.log(`Server listening on port http://localhost:${PORT}`)
})