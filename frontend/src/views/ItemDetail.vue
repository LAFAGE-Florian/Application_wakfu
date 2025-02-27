<template>
    <div v-if="item" class="item-container">
      <h1>{{ item.name }}</h1>
      <img :src="item.img" :alt="item.name" class="item-image" />
  
      <p><strong>Niveau :</strong> {{ item.lvl }}</p>
      <p><strong>Type :</strong> {{ item.type }}</p>
      <p><strong>Rareté :</strong> {{ item.rarity }}</p>
  
      <!-- Boutons dynamiques -->
      <button 
        :disabled="!item.have_recipe" 
        class="btn" 
        :class="{ disabled: !item.have_recipe }"
        @click="goToRecipePage"
        >
        Recette
      </button>
  
      <button 
        :disabled="!item.is_dropable" 
        class="btn" 
        :class="{ disabled: !item.is_dropable }"
        @click="goToDropPage"
        >
        Dropable
      </button>
  
      <!-- Affichage des statistiques -->
      <div v-if="item.stats.length > 0" class="stats-container">
        <h2>Statistiques</h2>
        <ul>
          <li v-for="stat in item.stats" :key="stat.id">
            <strong>{{ stat.type || "Aucune" }}</strong>: {{ stat.quantity || "Non spécifié" }}
          </li>
        </ul>
      </div>
  
      <p v-else>Aucune statistique disponible.</p>
    </div>
  
    <p v-else>Chargement...</p>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from "vue-router";
  
  const route = useRoute ();
  const router = useRouter ();
  const item = ref(null);

  const fetchItem = async () => {
  try {
    const response = await fetch(`/api/items/${route.params.id}`);
    if (!response.ok) throw new Error("Erreur lors de la récupération des données");

    const data = await response.json();
    

    item.value = {
      ...data,
      have_recipe: Boolean(data.have_recipe), 
      is_dropable: Boolean(data.is_dropable),
    };

  } catch (error) {
    console.error("Erreur fetchItem :", error);
  }
};

const goToDropPage = () => {
  router.push(`/items/${route.params.id}/drop`);
};

const goToRecipePage = () => {
  router.push(`/items/${route.params.id}/recipe`);
};

onMounted(fetchItem);
  </script>
  
  <style scoped>
  .item-container {
    text-align: center;
    padding: 20px;
  }
  
  .item-image {
    max-width: 200px;
    height: auto;
    display: block;
    margin: 10px auto;
  }
  
  .btn {
    padding: 10px 20px;
    margin: 10px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
  }
  
  .disabled {
    background-color: grey;
    cursor: not-allowed;
  }
  </style>