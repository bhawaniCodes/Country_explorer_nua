<template>
    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            persistent
            max-width="290"
        >
            <v-card>
                <v-input
                v-model="inputString"
                prepend-icon="mdi-magnify"
                @click:prepend="searchCity"
                >
                </v-input>
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
            inputString: '',
            dialog: false,
        }
    },
    mounted () {
        this.dialog = this.dialogProp;
    },
    methods: {
        searchCity () {
            this.fetchCitiesList(0, 10, inputString)
        },
        async fetchCitiesList (limit=10, offset=10, namePrefix) {
            try {
                await this.$store.dispatch('fetchCitiesList', {limit, offset, namePrefix});
            } catch (e) {
                console.log('error in index.vue mounted', e)
            }
        },
        closeModal () {
            this.$emit('closeModal');
        }
    },
}
</script>