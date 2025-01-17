<template>

  <title>ProjectP</title>

  <!-- Lien vers le CSS -->
  <link rel="stylesheet" href="/src/assets/css/styleHome.css">

<body>
  <header class="header">
    <div class="logo-container">
      <img class="logo" src="../assets/images/logo.png" alt="Logo">
      <h1>ProjectP</h1>
    </div>
    <div class="search-bar">
      <input type="text" placeholder="Recherche équipement ou ressources par le nom">
      <button>🔍</button>
    </div>
    <div class="header-actions">
      <button class="btn">Items</button>
      <button class="btn">Connexion</button>
      <div class="profile-icon">
        <img src="../assets/logo.png" alt="Profile" />
      </div>
    </div>
  </header>

  <main class="main">
    <section class="stats">
      <h2>Statistiques</h2>
      <p>Classement des meilleurs objets en fonction de leur score href sur les équipements et photo niveau et rareté.</p>
    </section>
    <section class="recipes">
      <h2>Ma Liste des Recettes</h2>
      <p>Liste des ressources de la personne, avec quantité et photo.</p>
    </section>
    <section class="equipment">
      <h2>Mes Équipements</h2>
      <p>Équipement mis en favoris.</p>
    </section>
  </main>
</body>
</template>

<script setup>

// gestion des erreurs
import { ref } from "vue"
import router from "../router"
// import { host } from '../use/useHost'

// const errorMessage = ref("");
// const formData = ref({});

// async function CreateConnexion () {
//    host.value = formData.value.email
//    const response = await fetch('/auth/create_connexion', {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json' },
//       body: JSON.stringify(formData.value),
//    } 
//    )
//    if (response.status === 200) {
//       router.push('verifycode')
//    } else {
//       errorMessage.value = 'Email ou mot de passe incorrect'
//    }}
</script>