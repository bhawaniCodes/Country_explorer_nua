<template>
    <v-container :style="{color: color.text, background: color.background}" class="grid-container">
        <v-row>
            <v-col v-for="(field, hIdx) in necessaryFieldsToDisplay" justify="center" align="center" :key="hIdx" class="grid-border text-capitalize font-weight-bold text-h6 pa-1">
                {{ field }}
            </v-col>
        </v-row>
        <v-row v-for="(cityDetail, cIdx) in citiesData" :key="cIdx">
            <v-col v-for="(field, fIdx) in necessaryFieldsToDisplay" :key="fIdx" @click="openModal(cityDetail?.id)" class="grid-border pa-1 cursor-pointer">
                {{ cityDetail?.[field] }}
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    props: {
        citiesData: {
            type: Array,
            default: () => []
        },
        necessaryFieldsToDisplay: {
            type: Array,
            default: () => []
        },
        color: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        openModal (cityId) {
            this.$emit('openModal', cityId);
        }
    }
}
</script>



<style scoped>
.grid-container {
  min-width: 900px;
  overflow-x: auto;
}
</style>