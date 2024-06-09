<template>
    <div class="d-flex justify-center align-center">
        <v-btn :disabled="pageNumber <= 1" @click="goPrevious">
            <v-icon>
                mdi-chevron-left
            </v-icon>
        </v-btn>
        <span class="mx-2">
            {{ pageNumber }}
        </span>
        <v-btn :disabled="pageNumber >= 5 || disableNext" @click="goNext">
            <v-icon>
                mdi-chevron-right
            </v-icon>
        </v-btn>
    </div>
</template>

<script>
export default {
    props: {
        pageNumber: {
            type: Number,
            default: 1
        },
        disableNext: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        goPrevious () {
            this.$emit('goPrevious');
        },
        goNext () {
            this.$emit('goNext');
        }
    }
}
</script>