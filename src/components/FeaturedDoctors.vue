<template>
  <div class="mybg py-5">
    <div class="container">
      <h1 class="text-center text-white py-5">Medici in evidenza</h1>
      <div class="row my-5 pt-5">
        <div class="col-4" v-for="doctor in sponsoredDoctors" :key="doctor.id">
          <DoctorCards :name="doctor.name" :surname="doctor.last_name" :specialty="doctor.specialties[0]" :image="doctor.image" :address="doctor.address"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DoctorCards from "./DoctorCards.vue";
import { store } from "../store";
import axios from "axios";
export default {
  name: "FeaturedDoctors",
  data() {
    return {
      sponsoredDoctors:[],
      doctorList: [],
      store,
    }
  },
  components: {
    DoctorCards,
  },
  methods: {
    getAllDoctors() {
      axios.get(store.apiBaseUrl + "/doctors").then((res) => {
        console.log(res.data.results);
        this.doctorList = res.data.results;
        this.sponsoredDoctors= this.doctorList.slice(0, 3);
      });
    },
  },
  created() {
    this.getAllDoctors();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/partials/_variables.scss";
.mybg {
  background-color: $blue-green;
  padding: 50px;
}
</style>
