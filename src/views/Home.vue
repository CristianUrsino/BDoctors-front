<template>
  <HeroComponent />
  <FeaturedDoctors />
  <CallActionComponent />
</template>

<script>
import FeaturedDoctors from "@/components/FeaturedDoctors.vue";
import CallActionComponent from "@/components/CallActionComponent.vue";
import HeroComponent from "@/components/HeroComponent.vue";


export default {
  name: "Home",
  data() {
    return {
    };
  },
  components: {
    FeaturedDoctors,
    CallActionComponent,
    HeroComponent,
  },
};
</script>

<style lang="scss" scoped></style>
