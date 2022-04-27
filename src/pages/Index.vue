<template>
  <div class="welcome-text">
    Find Similar Artists.
    <br />
    Find Your Mojo.
  </div>

  <div class="start-button absolute-bottom-left q-mb-xl">
    <router-link to="/recentArtists">
      <q-btn
        class="button q-px-xl"
        color="brand"
        label="Start"
        size="24px"
        unelevated
        rounded
        @click="onClick"
      />
    </router-link>
  </div>
</template>

<style lang="scss">
.welcome-text {
  color: #f2f2f2;
  font-size: 3.5rem;
  margin-left: 1.2em;
  margin-top: 3em;
  font-family: dmsansRegular;
}
.start-button {
  width: 100%;
  color: #191919;
  .button {
    margin: 0 auto;
    display: block;
    color: #191919 !important;
  }
}
</style>

<script>
import { defineComponent } from "vue";

export default {
  name: "PageIndex",
  methods: {
    nextPage() {
      this.$router.push("/recentArtists");
    },
    checkUser: function () {
      // check if user is using the app for the first time
      // if so, redirect to the welcome page
      if (!localStorage.getItem("user")) {
        console.log("first time user!");
        localStorage.setItem("user", "true");
      } else {
        console.log("not first time user!");
        this.nextPage();
      }
    },
  },
  mounted() {
    this.checkUser();
  },
};
</script>
