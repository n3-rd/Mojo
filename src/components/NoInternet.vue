<template>
  <div>
    <q-dialog v-model="carousel" persistent dark>
      <q-carousel
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        animated
        v-model="slide"
        control-color="brand"
        navigation-icon="radio_button_unchecked"
        navigation
        padding
        dark
        :autoplay="2500"
        height="200px"
        class="bg-white shadow-1 rounded-borders"
      >
        <q-carousel-slide :name="1" class="column no-wrap flex-center bg-black">
          <q-icon name="wifi_off" color="brand" size="56px" />
          <div class="q-mt-md text-center">
            {{ slide1 }}
            <br />
            {{ slide1Sub }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="2" class="column no-wrap flex-center bg-black">
          <q-icon name="refresh" color="brand" size="56px" />
          <div class="q-mt-md text-center">
            {{ slide2 }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="3" class="column no-wrap flex-center bg-black">
          <q-icon name="settings_suggest" color="brand" size="56px" />
          <div class="q-mt-md text-center">
            {{ slide3 }}
          </div>
        </q-carousel-slide>
      </q-carousel>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  data() {
    return {
      slide: 1,
      carousel: true,
      slide1: "No Internet!",
      slide1Sub: "Please check your internet connection and try again.",
      slide2: "You should try refreshing the page.",
      slide3: "You should also check your wifi connection or settiings",
    };
  },
  methods: {
    openCarousel() {
      this.carousel = true;
    },
    closeCarousel() {
      this.carousel = false;
    },
  },
};
</script>
