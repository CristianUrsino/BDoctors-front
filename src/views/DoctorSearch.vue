<template>
    <div class="container">
        <div class="d-flex">
            <v-select
            class="gap-2 mt-4"
            v-model="selectedProfession"
            :items="professions"
            label="Selezione Professione"
            outlined
             
            ></v-select>
            <v-select
            class=" gap-2 mt-4"
            v-model="selectedRating"
            :items="ratings"
            label="Seleziona voto"
            outlined
            
            ></v-select>
            <v-select
            class=" gap-2 mt-4"
            v-model="selecteCity"
            :items="ratings"
            label="Seleziona Città"
            outlined
            
            ></v-select>
            <v-btn @click="applyFilters" class="mt-5">Search</v-btn>
        </div>
        <div class="row">
            <div class="col-4 mb-5 mt-5" v-for="dottore in store.dottori" :key="dottori.id">
                <v-card
                    class="mx-auto"
                    max-width="344"
                    :title="dottore.slug"
                    subtitle="professione"
                    hover
                    link
                    >
                    <v-avatar size="70" class="ms-5"> 
                    <img :src="store.imagesBaseUrl + dottore.image" alt="Avatar">
                    </v-avatar>
                    <v-card-text>address</v-card-text>
                    <v-card-actions>
                        <v-btn
                            variant="text"
                            color="teal-accent-4"
                            @click="revealDoctor(dottore)"
                        >
                            Contatti
                        </v-btn>
                        </v-card-actions>

                        <v-expand-transition>
                        <v-card
                            v-if="dottore.reveal"
                            class="v-card--reveal"
                            style="height: 100%;"
                        >
                            <v-card-text class="pb-0">
                            <p class="text-h4 text--primary">
                                Contattami
                            </p>
                            <span>e-mail</span><br>
                            <span>telefono</span>
                            </v-card-text>
                            <v-card-actions class="pt-0">
                            <v-btn
                                variant="text"
                                color="teal-accent-4"
                                @click="hideReveal(dottore)"
                            >
                                Close
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-expand-transition>
                </v-card>
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
                dottori: [],
                
            }
        },
        methods: {
            getDoctors() {
            axios.get(store.apiBaseUrl + `/dottori`).then((res) => {
                console.log(res.data.results);
                store.dottori = res.data.results
            })
        },
        revealDoctor(dottore) {
            dottore.reveal = true;
        },
        hideReveal(dottore) {
            dottore.reveal = false;
        }
        },
        created() {
            this.getDoctors()  
        }
    }
    
</script>

<style lang="scss" scoped>
img{
    width: 100%;
}
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>