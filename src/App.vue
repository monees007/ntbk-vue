<template>
  <v-app>
    <v-navigation-drawer v-model="drawer">
      <v-list  :items="level1"></v-list>

    </v-navigation-drawer>
    <v-navigation-drawer v-model="drawer">
      <!--  -->

    </v-navigation-drawer>
    <v-navigation-drawer v-model="drawer">
      <!--  -->

    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Application</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <!--  -->
    </v-main>
  </v-app>
</template>

<script setup>
import {ref} from 'vue'

const drawer = ref(null)
</script>

<script>
export default {
  data: () => ({
    drawer: null,
    hierarchy: null,
    level1 : [],
    // level2: null,
    // level3: null,
    // selected1: null
  }),
  mounted() {
    fetch('http://127.0.0.1:5000/get_hierarchy')
      .then(response => response.json())
      .then(data => {
        this.level1 = Object.keys(data)
        this.hierarchy = data;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  },

}
</script>
