<template>
    <div class="my-bg-primary">
        <div class="container mypt">
            <h1 class="text-center mb-5 mt-5 text-white text-uppercase">{{ title }}</h1>
            <div class="row gy-5 justify-content-center mt-4 py-5">
                <div class="col-12 col-md-6 col-lg-4 col-xl-3" v-for="member in members">

                    <DoctorCards :name="member.name" :surname="member.last_name" :specialty="member.type"
                        :image="member.avatar" @error="setDefaultImage($event, member)" :slg="member.name" />
                    <!-- <div class="card dnd-card flex-fill">
                    <div class="d-flex justify-content-center">
                        <div class="img-container rounded-circle ">
                            <img :src="member.avatar" class="card-img-top " :alt="member.name">
                        </div>
                    </div>


                    <div class="card-body text-center ">
                        <h5 class="card-title dnd-card-title">{{ member.name }}</h5>
                        <p class="card-text dnd-card-text">{{ member.description }}</p>
                        <div>
                            <span> Dev type: </span><span class="badge "
                                :class="[member.type == 'Front-end' ? 'text-bg-danger' : 'text-bg-success']">
                                {{ ' ' + member.type }}
                            </span>

                        </div>

                    </div>
                </div> -->
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import DoctorCards from '@/components/DoctorCards.vue';
export default {
    name: 'AppOurTeam',
    data() {
        return {
            title: 'Il nostro team',
            members: [
                {
                    name: 'Chiara',
                    last_name: 'Pontello',
                    type: 'Front-end',
                    avatar: 'images/avatar-team/1706517661745.jpg'
                },
                {
                    name: 'Matteo',
                    last_name: 'Tuveri',
                    type: 'Front-end',
                    avatar: 'images/avatar-team/IMG-20240128-WA0022.jpeg'
                },
                {
                    name: 'Matteo',
                    last_name: 'Pupino',
                    type: 'Front-end',
                    avatar: 'images/avatar-team/eqweqweqe.PNG'
                },
                {
                    name: 'Cristian',
                    last_name: 'Ursino',
                    type: 'Back-end',
                    avatar: 'images/avatar-team/20240129_090738.jpg'
                },
                {
                    name: 'Valerio',
                    last_name: 'Bartoletti',
                    type: 'Back-end',
                    avatar: 'images/avatar-team/Picsart_23-04-17_10-56-56-465.jpg'
                },
                {
                    name: 'Michele',
                    last_name: 'Ebau',
                    type: 'Security',
                    avatar: 'images/avatar-team/IMG_9317.JPG'
                },
            ]
        }
    },
    components: {
        DoctorCards,
    },
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/partials/_variables.scss";

.img-container {
    width: 200px;
    height: 200px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

}

.dnd-card {
    border: 2px solid $marian-blue;
    ;
    background-color: $honolulu-blue;
    transition: transform 0.2s;
}

.dnd-card:hover {
    transform: scale(1.05);
}

.dnd-card-title {
    color: black;
}

.dnd-card-text {
    color: #000;
}

.dnd-btn {
    background-color: #6b4226;
    border-color: #6b4226;
}

.dnd-btn:hover {
    background-color: #4d2c18;
    border-color: #4d2c18;
}

.mypt {
    padding-top: 80px
}
</style>