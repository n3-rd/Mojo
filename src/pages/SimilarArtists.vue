<template>
  <div>
    <q-toolbar class="text-white font-regular">
      <q-toolbar-title class="title q-ml-md">
        <router-link to="/recentArtists">
          <div class="text-white">
            <q-icon name="arrow_back_ios" />
          </div>
        </router-link>
      </q-toolbar-title>
    </q-toolbar>

    <div class="artist">
      <div class="artist-image q-mt-md">
        <img src="~/assets/2095.jpg" alt="artist image" :ratio="16 / 9" />
      </div>
      <div class="artist-name text-white q-mt-md">{{ localArtist }}</div>
      <q-expansion-item
        group="somegroup"
        icon="explore"
        label="Bio"
        default-opened
        header-class="text-brand"
        class="q-px-md"
      >
        <q-card>
          <q-card-section class="bg-bgblack">
            <div class="artist-bio text-white q-px-lg q-mt-md">
              {{ localArtistBio }}
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>
  </div>
</template>

<style lang="scss">
.artist {
  .artist-image {
    width: 100%;
    img {
      width: 88%;
      display: block;
      margin: 0 auto;
      border-radius: 15px;
    }
  }
  .artist-name {
    text-align: center;
    font-size: 3rem;
    opacity: 0.7;
  }
  .artist-bio {
    opacity: 0.8;
  }
}
</style>

<script>
export default {
  data() {
    return {
      localArtist: localStorage.getItem("localArtist"),
      localArtistBio: localStorage.getItem("localArtistBio"),
    };
  },
};
</script>
