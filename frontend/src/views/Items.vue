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
        <!-- Pagination -->
    <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Précédent</button>
        <span>Page {{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>
    </div>
</template>

<script setup>

    import { ref, onMounted } from "vue";

    // Références pour les données de pagination et les articles
    const items = ref([]);
    const currentPage = ref(1);
    const totalPages = ref(0);

    // Fonction pour récupérer les items depuis l'API
    const fetchItems = async (page) => {
        const response = await fetch(`/api/items?page=${page}&limit=25`);
        const data = await response.json();

        items.value = data.items;
        currentPage.value = data.currentPage;
        totalPages.value = data.totalPages;
    };

    // Navigation entre les pages
    const nextPage = () => {
        if (currentPage.value < totalPages.value) {
    fetchItems(currentPage.value + 1);
        }
    };
    const prevPage = () => {
        if (currentPage.value > 1) {
    fetchItems(currentPage.value - 1);
        }
    };

    // Récupère les articles au montage du composant
    onMounted(() => fetchItems(currentPage.value));

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