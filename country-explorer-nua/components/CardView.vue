<template>
    <v-main>
        <v-container :style="{color: color.text, background: color.background}">
            <v-row justify="center" align="center">
                <v-col cols="12" md="4" sm="6" v-for="(cityDetail, cIdx) in citiesData" :key="cIdx">
                    <SingleCard :city-detail="cityDetail" :necessary-fields-to-display="necessaryFieldsToDisplay" @openModal="openModal"></SingleCard>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
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