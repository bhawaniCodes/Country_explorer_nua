<template>
  <v-main>
    <template v-if="citiesData?.length">
      <v-container v-if="isGridView" class="overflow-auto">
        <GridView
          :cities-data="citiesData"
          :necessary-fields-to-display="necessaryFieldsToDisplay"
          :color="color"
          @openModal="openModal"
        ></GridView>
      </v-container>
      <v-container v-else>
        <CardView
          :cities-data="citiesData"
          :necessary-fields-to-display="necessaryFieldsToDisplay"
          :color="color"
          @openModal="openModal"
        ></CardView>
      </v-container>
      <v-container>
        <Pagination :page-number="pageNumber" :disable-next="disableNextButton" @goPrevious="goPrevious" @goNext="goNext"></Pagination>
      </v-container>
      <template v-if="dialog">
        <NearbyCitiesModal :dialog-prop="dialog" :nearby-city-data="nearbyCityData" @closeModal="closeModal"></NearbyCitiesModal>
      </template>
    </template>
    <template v-else>
      <h1>No City Found</h1>
    </template>
  </v-main>
</template>

<script>
import Pagination from '../components/Pagination.vue';
export default {
  components: { Pagination },
  name: 'IndexPage',
  data () {
    return {
      necessaryFieldsToDisplay: ['city', 'country', 'region', 'latitude', 'longitude', 'population'],
      dialog: false,
      nearbyCityData: [],
      pageNumber: 1,
      apiLimit: 10,
    }
  },
  computed: {
    isGridView () {
      return this.$store.getters['getCurrentView'];
    },
    color () {
      return this.$store.getters['getColors'];
    },
    citiesData () {
      return this.$store.getters['getCities'] || [];
    },
    disableNextButton () {
        return this.citiesData.length < 10;
    },
  },
  watch: {
    pageNumber (number) {
      if (number >= 1 && number <= 5) {
        const offset = this.offset(number, this.apiLimit);
        this.fetchCitiesList(10, offset);
        // offset -> 0, 10, 20
        // limit ->  9, 19, 29
      }
    }
  },
  mounted () {
    const offset = this.offset(this.pageNumber, this.apiLimit);
    this.fetchCitiesList(this.apiLimit, offset);
  },
  methods: {
    async openModal (cityId) {
        this.nearbyCityData = await this.$store.dispatch('fetchNearbyCities', cityId)
        this.dialog = true;
    },
    closeModal () {
        this.dialog = false;
    },
    // Go to previous page
    goPrevious () {
        this.pageNumber -= 1;
    },
    // Go to next page
    goNext () {
        this.pageNumber += 1;
    },
    // Calculating offset
    offset (number, limit) {
        return (number - 1) * limit;
    },
    async fetchCitiesList (limit, offset) {
      try {
        await this.$store.dispatch('fetchCitiesList', {limit, offset});
      } catch (e) {
        console.log('error in index.vue mounted', e)
      }
    }
  },
}
</script>

<style>
.grid-border {
  border: 1px solid;  
}
.cursor-pointer {
  cursor: pointer;
}
</style>