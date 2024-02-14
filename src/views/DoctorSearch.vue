<template>
    <div class="container">
        <div class="row">
            <div class="col-4" v-for="dottore in store.dottori" :key="dottori.id">
                {{ dottore.slug }}
            </div>
        </div>
    </div>
</template>

<script>
    import { store } from "../store";
    import axios from "axios";
    export default {
        name: 'DoctorSearch',
        data() {
            return {
                store,
                dottori: []
            }
        },
        methods: {
            getDoctors() {
            axios.get(store.apiBaseUrl + `/dottori`).then((res) => {
                console.log(res.data.results);
                store.dottori = res.data.results
            })
        }
        },
        created() {
            this.getDoctors()  
        }
    }
    
</script>

<style lang="scss" scoped>

</style>