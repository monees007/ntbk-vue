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
    <v-navigation-drawer >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-list>
        <v-list-item @click="tap3(item)" v-bind:key v-for="(item,key) in level3"> {{ item }}</v-list-item>
      </v-list>      <!--  -->

    </v-navigation-drawer>



    <v-main>
      <ejs-pdfviewer
        id="pdfViewer"
        :resourceUrl="resourceUrl"

        :documentPath="'http://127.0.0.1:5000/get_file'+current_path">
      </ejs-pdfviewer>
    </v-main>
  </v-app>
</template>

<script setup>
import {ref} from 'vue'


const drawer = ref(null)
</script>

<script>
import {
  PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation,
  BookmarkView, ThumbnailView, Print, TextSelection, TextSearch,
  Annotation, FormDesigner, FormFields, PageOrganizer
} from '@syncfusion/ej2-vue-pdfviewer';


export default {
  components: {
    "ejs-pdfviewer": PdfViewerComponent
  },
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
    resourceUrl: 'https://cdn.syncfusion.com/ej2/23.1.43/dist/ej2-pdfviewer-lib',

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
  },
  provide: {
    PdfViewer: [Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView,
      Print, TextSelection, TextSearch, Annotation, FormDesigner, FormFields, PageOrganizer]
  }

}
</script>

<style>
  @import '../node_modules/@syncfusion/ej2-base/styles/material-dark.css';
  @import '../node_modules/@syncfusion/ej2-buttons/styles/material-dark.css';
  @import '../node_modules/@syncfusion/ej2-dropdowns/styles/material-dark.css';
  @import '../node_modules/@syncfusion/ej2-inputs/styles/material-dark.css';
  @import '../node_modules/@syncfusion/ej2-navigations/styles/material-dark.css';
  @import '../node_modules/@syncfusion/ej2-popups/styles/material-dark.css';
  @import '../node_modules/@syncfusion/ej2-splitbuttons/styles/material-dark.css';
  @import '../node_modules/@syncfusion/ej2-lists/styles/material-dark.css';
  @import '../node_modules/@syncfusion/ej2-vue-pdfviewer/styles/material-dark.css';

  .e-pv-main-container{
    min-height: 100vh !important;
  }
</style>
