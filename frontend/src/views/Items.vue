<template>

    <div>
    <!-- Barre de sélection pour lvlMin -->
    <label>
      Niveau minimum :
      <input 
        type="number" 
        v-model="lvlMin" 
        :min="1" 
        :max="230" 
        placeholder="1"
      />
    </label>

    <!-- Barre de sélection pour lvlMax -->
    <label>
      Niveau maximum :
      <input 
        type="number" 
        v-model="lvlMax" 
        :min="1" 
        :max="230" 
        placeholder="230"
      />
    </label>

    <!-- Sélection du type -->
    <label>
      Type :
      <select v-model="type">
        
        <option value="">Tous</option>
        <option value="Amulette">Amulette</option>
        <option value="Anneau">Anneau</option>
        <option value="Armes 1 main">Armes à une main</option>
        <option value="Armes 2 Mains">Armes à deux mains</option>
        <option value="Bottes">Bottes</option>
        <option value="Bouclier">Bouclier</option>
        <option value="Cape">Cape</option>
        <option value="Casque">Casque</option>
        <option value="Ceinture">Ceinture</option>
        <option value="Dague">Dague</option>
        <option value="Epaulettes">Epaulettes</option>
        <option value="Plastron">Plastron</option>
      </select>
    </label>

    <!-- Sélection de la rareté -->
    <label>
      Rareté :
      <select v-model="rarity">
        <option value="">Toutes</option>
        <option value="common">Commun</option>
        <option value="rare">Rare</option>
        <option value="epic">Épique</option>
        <option value="relic">Relic</option>
        <option value="memory">Memory</option>
        <option value="mythic">Mythique</option>
        <option value="legendary">Légendaire</option>
      </select>
    </label>

     <!-- Bouton de tri -->
     <button @click="toggleSortOrder">
      Trier : {{ sortOrder === 'asc' ? 'Croissant' : 'Décroissant' }}
    </button>


    </div>
        <table class="table table-striped align-middle">
        <thead>
            <tr>
            <th scope="col">Url</th>
            <th scope="col">Rarity</th>
            <th scope="col">Img</th>
            <th scope="col">Name</th>
            <th scope="col">Lvl</th>
            <th scope="col">Type</th>
            <!-- <th scope="col">Have_recipe</th>
            <th scope="col">Is_dropable</th> -->
            </tr>
        </thead>

        <tbody>
            <tr v-for="item in items" :key="item.url">
            <!-- <td>{{ item.url }}</td> -->
            <td>{{ item.rarity }}</td>
            <td>
                <img :src="item.img" alt="Image de l'item" width="50" height="50" />
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.lvl }}</td>
            <td>{{ item.type }}</td>
            <!-- <td>{{ item.have_recipe }}</td>
            <td>{{ item.is_dropable }}</td>  -->

            </tr>
        </tbody>
        </table>

       Pagination
    <div>
      <button :disabled="currentPage === 1" @click="prevPage">Précédent</button>
      <span>Page {{ currentPage }} sur {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="nextPage">Suivant</button>
    </div>

</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

// Références pour les données et les filtres
const items = ref([]);
const lvlMin = ref(1);
const lvlMax = ref(230);
const sortOrder = ref('asc'); // 'asc' pour croissant, 'desc' pour décroissant
const type = ref("");
const rarity = ref("");
const totalPages = ref(0);
const currentPage = ref(1);
const totalItemsFilters = ref(0);

// nbres items par page
const limit = ref(15);

// Fonction pour récupérer les items filtrés depuis le backend
const fetchItems = async () => {
  const queryParams = new URLSearchParams({
    lvlMin: lvlMin.value,
    lvlMax: lvlMax.value,
    type: type.value,
    rarity: rarity.value,
    page: currentPage.value,
    limit: limit.value,
    sortOrder: sortOrder.value,
  });

    const response = await fetch(`/api/items?${queryParams}`);
    const data = await response.json();

    // Mise à jour des données
    items.value = data.items;
    totalPages.value = data.totalPages;
    totalItemsFilters.value = data.totalItems;
};

// Inverser l'ordre de tri
const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  fetchItems();
};

// Met à jour la liste chaque fois qu'un filtre change
watch([lvlMin, lvlMax, type, rarity], fetchItems, { immediate: true });

// Aller à la page suivante
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchItems();
  }
};

// Revenir à la page précédente
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchItems();
  }
};


// Appel initial pour récupérer les données
onMounted(fetchItems);
</script>

<style>
.pagination {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>