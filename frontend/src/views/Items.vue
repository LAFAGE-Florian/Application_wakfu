<template>
    <table class="table table-striped align-middle">
      <thead>
        <tr>
          <th scope="col">Url</th>
          <th scope="col">Rarity</th>
          <th scope="col">Img</th>
          <th scope="col">Name</th>
          <th scope="col">Lvl</th>
          <th scope="col">Type</th>
          <th scope="col">Have_recipe</th>
          <th scope="col">Is_dropable</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in items" :key="item.url">
          <td>{{ item.url }}</td>
          <td>{{ item.rarity }}</td>
          <td>{{ item.img }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.lvl }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.have_recipe }}</td>
          <td>{{ item.is_dropable }}</td> 

        </tr>
      </tbody>
    </table>
</template>

<script setup>

    import { ref, onMounted } from "vue";

    // Références pour les données de pagination et les articles
    const items = ref([]);
    const currentPage = ref(1);
    const totalPages = ref(0);

    // Fonction pour récupérer les articles depuis l'API
    const fetchItems = async (page) => {
        const response = await fetch(`/api/items?page=${page}&limit=25`);
        const data = await response.json();

        items.value = data.items;
        currentPage.value = data.currentPage;
        totalPages.value = data.totalPages;
    };

    // Récupère les articles au montage du composant
    onMounted(() => fetchItems(currentPage.value));

</script>