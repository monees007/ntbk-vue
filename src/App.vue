<template>
  <v-app>
    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item @click="tap1(item)" v-bind:key v-for="(item,key) in level1"> {{ item }}</v-list-item>
      </v-list>

    </v-navigation-drawer>
    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item @click="tap2(item)" v-bind:key v-for="(item,key) in level2"> {{ item }}</v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item @click="tap3(item)" v-bind:key v-for="(item,key) in level3"> {{ item }}</v-list-item>
      </v-list>      <!--  -->

    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Application</v-app-bar-title>
    </v-app-bar>

    <v-main>
      {{ current_path }}
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
    level1: [],
    level2: [],
    level3: [],
    selected1: null,
    selected2: null,
    paths: {},
    current_path: '',

  }),
  mounted() {
    fetch('http://127.0.0.1:5000/l1')
      .then(response => response.json())
      .then(data => {
        this.level1 = data
        this.selected1 = this.level1[0]
        this.update2()
        this.update3()


      })
      .catch(error => {
        console.error('Error:', error);
      });


  },
  methods: {
    tap1(item) {
      this.selected1 = item
      this.update2()
      this.update3()
    },
    tap2(item) {
      this.selected2 = item
      this.update3()
    },
    tap3(item) {
      this.current_path = this.paths[item]
    },
    update2() {
      fetch('http://127.0.0.1:5000/l2')
        .then(response => response.json())
        .then(data => {
          this.level2 = data[this.selected1]
          this.selected2 = this.level2[0]
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
    update3() {
      fetch('http://127.0.0.1:5000/l3')
        .then(response => response.json())
        .then(data => {
          this.paths = data[this.selected1][this.selected2]['files']
          this.level3 = Object.keys(this.paths)
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }

}
</script>
