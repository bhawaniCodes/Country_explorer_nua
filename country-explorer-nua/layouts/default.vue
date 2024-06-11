<template>
  <v-app dark>
      <v-card
        height="50"
      >
        <v-app-bar
          class="height-50-px"
          color="deep-purple accent-4"
          dark
          prominent
        >
          <div class="d-flex justify-left align-center">
            <v-text-field
              max-width="200px"
              height="39px"
              class="search-style"
              :color="color?.text"
              :background-color="color?.background"
              v-model="inputPrefix"
              label="Search for a city"
              @keyup.enter="searchCity"
            ></v-text-field>
            <v-btn icon @click="searchCity">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn icon @click="clearSearch">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>

          <div>
            <v-switch
              v-model="gridView"
              label="Grid View"
              hide-details
            ></v-switch>
          </div>
        </v-app-bar>
    </v-card>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>


<script>
  export default {
    data: () => ({
      drawer: false,
      gridView: true,
      inputPrefix: '',
    }),

    watch: {
      gridView (newValue) {
        this.$store.dispatch('changeView', newValue)
      },
    },
    computed: {
      color () {
        return this.$store.getters['getColors'];
      },
      citiesData () {
        return this.$store.getters['getCities'] || [];
      },
      isDesktop () {
        return this.$vuetify.breakpoint.mdAndUp;
      },
    },
    methods: {
      searchCity () {
        if (this.inputPrefix.length > 2) {
          this.fetchCitiesList(9, 0, this.inputPrefix)
        }
      },
      clearSearch () {
          this.inputPrefix = '';
          if (this.citiesData.length < 10) {
            this.fetchCitiesList(10, 0)
          }
      },
      async fetchCitiesList (limit=10, offset=0, namePrefix='') {
          try {
              await this.$store.dispatch('fetchCitiesList', {limit, offset, namePrefix});
          } catch (e) {
              console.log('error in index.vue mounted', e)
          }
      },
    }
  }
</script>

<style scoped>
.height-50-px {
  height: 50px !important;
}

::v-deep .v-toolbar__content {
  height: 50px !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

::v-deep .v-main__wrap {
  overflow-x: hidden;
}

.search-style {
  height: 38px;
}

@media (min-width: 756px) {
  .search-style {
    width: 50%;
  }
}
</style>
