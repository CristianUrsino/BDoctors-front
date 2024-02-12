<template>
    <div class="single-doctor-section py-5">
        <div class="container">
            <div class="row">
                <div class="col-12 ">
                    <div class="single-doctor-card bg-white p-4 d-flex">
                        <div class="doctor-img">
                            <img src="/images/doc-profile-img.avif" alt="doctor.surname">
                        </div>
                        <div class="doctor-info px-4">
                            <div class="d-flex align-items-center">
                                <h2>Dr. Valerio Bartoletti</h2>
                                <i class="fa-solid fa-circle-check ms-2"></i>
                            </div>
                            <span class="speciaties">Cardiologo, Endocrinologo</span>
                            <div class="doctor-rating d-flex mt-2">
                                <div>
                                    <i class="fa-solid fa-star" v-for="n in 5"></i>
                                </div>
                                <span class="doctor-votes ms-2">
                                    <u>53 voti</u>
                                </span>
                            </div>
                            <button type="button" class="btn btn-light send-message mt-5">
                                <i class="fa-regular fa-comment-dots"></i>
                                <span class="ms-2">Invia un messaggio</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name:'DoctorDetails',
        data(){
            return{

            }
        },
    }
</script>

<style lang="scss" scoped>
@import "@/assets/styles/partials/_variables.scss";

.send-message{
    border:1px solid rgb(177, 176, 176);
    padding:10px 10px
}
.single-doctor-section{
    background-color: $blue-green;
}
.single-doctor-card{
    border-radius:5px;
    .doctor-img{
        width:160px;
        height:160px;
        overflow:hidden;
        transition:0.5s;
        img{
            width:100%;
            height:100%;
            object-fit:cover
        }
        img:hover{
            cursor:pointer;
        }
    }
    .doctor-img:hover{
        transform: scale(1.05);
        transition:0.3s
    }
    .doctor-info{
        h2{
            font-size: 1.8em;
            display:inline-block;
            margin:0
        }
        .fa-solid.fa-circle-check{
            color:$honolulu-blue
        }
        .speciaties{
            font-size:1.1em;
        }
        .fa-solid.fa-star{
            color:$honolulu-blue;
            font-size: 1.4em;
        }
        .doctor-votes:hover{
            cursor:pointer;
            color: rgb(80, 78, 78)
        }
    }
}
</style>