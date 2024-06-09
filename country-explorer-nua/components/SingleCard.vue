<template>
    <v-card @click="openModal(cityDetail?.id)" class="cursor-pointer">
        <v-card-text >
            <v-icon class="pb-1">mdi-city</v-icon>
            <h2 class="ml-1 font-weight-bold d-inline">{{ cityDetail?.city }}</h2>
        </v-card-text>
        <v-card-text class="py-2">
            <v-icon>mdi-map-marker</v-icon>
             <span class="ml-1">Country: {{ cityDetail?.country }}</span> 
        </v-card-text>
        <v-card-text class="py-2">
            <v-icon>mdi-web</v-icon>
             <span class="ml-1">Region: {{ cityDetail?.region }}</span>
        </v-card-text>
        <v-card-text class="py-2">
            <v-icon>mdi-compass</v-icon>
             <span class="ml-1">Lat: {{ cityDetail?.latitude }}</span>
             <span class="ml-1">Long: {{ cityDetail?.longitude }}</span>
        </v-card-text>
        <v-card-text class="py-2">
            <v-icon>mdi-account-group</v-icon>
             <span class="ml-1">Population: {{ cityDetail?.population }}</span>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: {
        cityDetail: {
            type: Object,
            default: () => {}
        },
        necessaryFieldsToDisplay: {
            type: Array,
            default: () => []
        },
    },
    methods: {
        openModal (cityId) {
            this.$emit('openModal', cityId);
        }
    }
}
</script>