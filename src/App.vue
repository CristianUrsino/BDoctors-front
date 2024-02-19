<template>
  <div v-if="store.loading">
    <div class="vh-100 my-bg-primary">
      caricamento...
    </div>
  </div>
  <div v-else>
    <AppNav />


    <div>
      <router-view></router-view>
    </div>

    <AppFooter />

  </div>
</template>

<script>
import { store } from './store';
import axios, { Axios } from "axios";
import AppProva from './components/AppProva.vue';
import AppFooter from './components/AppFooter.vue';
import Home from './views/Home.vue';
import AppNav from './components/AppNav.vue';
import DoctorDetails from './views/DoctorDetails.vue';

export default {
  name: 'App',
  data() {
    return {
      store,

    }
  },
  components: {
    AppProva,
    AppFooter,
    Home,
    AppNav,
    DoctorDetails
  },
  methods: {
    getAllDoctors() {
      this.store.loading = true;
      axios.get(store.apiBaseUrl + "/doctors").then((res) => {
        //console.log(res.data.results);
        this.store.doctors = res.data.results;
        let namesArray = [];
        const specialties = this.store.doctors.reduce((acc, doctor) => {
          //console.log(acc);

          doctor.specialties.forEach(specialty => {
            //console.log(specialty);
            if (!namesArray.includes(specialty.name)) {
              namesArray.push(specialty.name);
              acc.push(specialty);
            }
          });
          //console.log(namesArray);
          return acc;
        }, []);
        this.store.specialties = specialties;
        // this.sponsoredDoctors = this.doctorList.slice(0, 3);
      }).catch(err => {
        console.log(err);
      }).finally(el => {
        this.store.loading = false;
      });
    },
  },
  created() {
    this.getAllDoctors();
  }
}
</script>

<style lang="scss" scoped>
.red {
  color: red;
}
</style>
