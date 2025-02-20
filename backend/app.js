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
         search,
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
      
      if (search && search.length >= 3) { // Vérifier que la recherche a au moins 3 lettres
         filters.name = { contains: search.trim() }; // Recherche partielle et insensible à la casse
      }
      // Nbre total des items correspondant aux filtres
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

   app.get("/api/items/:id", async (req, res) => {
      try {
         const { id } = req.params;
     
         // Exécute une requête SQL brute pour contourner Prisma
         const item = await prisma.$queryRaw`
            SELECT 
               i.url, i.rarity, i.img, i.name, i.lvl, i.type AS item_type, 
               i.have_recipe, i.is_dropable,
               s.id AS stat_id, s.quantity, s.type AS stat_type
            FROM items i
            LEFT JOIN stats_item si ON i.url = si.url_item
            LEFT JOIN stat s ON si.id_stat = s.id
            WHERE i.url LIKE ${'%' + id}
         `;
     
         // Vérifie si un item a été trouvé
         if (!item || item.length === 0) {
           return res.status(404).json({ error: "Item non trouvé" });
         }
     
         // Convertit les valeurs `have_recipe` et `is_dropable` en `boolean`
         const formattedItem = {
            url: item[0].url,
            rarity: item[0].rarity,
            img: item[0].img,
            name: item[0].name,
            lvl: item[0].lvl,
            type: item[0].type,
            have_recipe: Boolean(item[0].have_recipe),
            is_dropable: Boolean(item[0].is_dropable),
            stats: item.map(stat => ({
              id: stat.stat_id || null,  // Si pas de stat, mettre `null`
              quantity: stat.quantity || null,  // Si pas de quantity, mettre `0`
              type: stat.stat_type || "Aucune"  // Si pas de type, mettre "Aucune"
            }))
          };
     
         console.log("Réponse envoyée :", formattedItem);
         res.json(formattedItem); // Envoie l'item au frontend
     
       } catch (error) {
         console.error("Erreur lors de la récupération de l'item :", error);
         res.status(500).json({ error: "Erreur lors de la récupération de l'item" });
       }
     });


////////////////////////////////////////
const PORT = 3001
app.listen(PORT, () => {
   console.log(`Server listening on port http://localhost:${PORT}`)
})