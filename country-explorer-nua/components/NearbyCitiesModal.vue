<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
        <v-card class="pa-4">
            <v-card class="d-flex justify-space-between align-center">
                <v-card-title class="text-h5">
                    Nearby Cities
                </v-card-title>
                <v-btn
                    class="ma-1 rounded-lg"
                    color="red"
                    min-width="36"
                    width="36"
                    height="36"
                    dark
                    @click="closeModal"
                >
                    <v-icon dark right>
                        mdi-close
                    </v-icon>
                </v-btn>
            </v-card>
            <v-row class="ma-0 pa-0">
                <v-col v-for="(field, hIdx) in necessaryFieldsToDisplay" justify="center" align="center" :key="hIdx" class="grid-border text-capitalize font-weight-bold text-h6 pa-1">
                    {{ field === 'distance' ? `${field} (miles)` : field }}
                </v-col>
            </v-row>
            <v-row v-for="(cityDetail, cIdx) in nearbyCityData" :key="cIdx" class="ma-0 pa-0">
                <v-col v-for="(field, fIdx) in necessaryFieldsToDisplay" :key="fIdx" class="grid-border pa-1">
                    {{ cityDetail?.[field] }}
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
    props: {
        dialogProp: {
            type: Boolean,
            default: false
        },
        nearbyCityData: {
            type: Array,
            default: () => []
        },
    },
    data () {
        return {
            dialog: false,
            necessaryFieldsToDisplay: ['city', 'distance', 'region']
        }
    },
    mounted () {
        this.dialog = this.dialogProp;
    },
    methods: {
        closeModal () {
            this.$emit('closeModal');
        }
    }
}
</script>

<style scoped>
.v-application--is-ltr .v-btn__content .v-icon--right {
    margin: 0px;
}
</style>