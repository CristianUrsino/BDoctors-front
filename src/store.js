
import { reactive } from "vue";

export const store = reactive({
    apiBaseUrl: "http://127.0.0.1:8000/api",
    imagesBaseUrl: "http://127.0.0.1:8000/storage/",
    selectedProfession: '',
    doctors: null,
    specialties: null,
    loading: false,

});