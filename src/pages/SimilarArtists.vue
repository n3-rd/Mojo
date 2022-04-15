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
        <!-- <img src="~/assets/2095.jpg" alt="artist image" :ratio="16 / 9" /> -->
        <img :src="localArtistCutout" alt="artist image" :ratio="16 / 9" />
      </div>
      <div class="artist-name text-white q-mt-md">{{ localArtist }}</div>
      <!-- <div v-if="localArtistBio !== String">bbb</div> -->
      <q-expansion-item
        group="somegroup"
        icon="explore"
        label="Bio"
        header-class="text-brand"
        class="q-px-md"
        v-if="localArtistBio"
      >
        <q-card>
          <q-card-section class="bg-bgblack">
            <div class="artist-bio text-white q-px-lg q-mt-md">
              {{ localArtistBio }}
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <div class="similar-artists">
        <div class="similar-artist-title text-white q-ml-lg q-py-md">
          Similar Artists
        </div>
        <q-list separator class="text-white">
          <div
            v-for="similarArtist in similarArtists"
            :key="similarArtist.Name"
          >
            <q-item
              clickable
              v-ripple
              @click="setNewArtist(similarArtist.name)"
            >
              <q-item-section class="similar-artist q-py-md q-px-md">{{
                similarArtist.name
              }}</q-item-section>
            </q-item>
          </div>
        </q-list>
      </div>
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
    font-size: 1.1rem;
  }
  .similar-artists {
    .similar-artist-title {
      font-size: 1.5rem;
      font-family: dmsansBold;
    }
    .similar-artist {
      font-size: 1.3rem;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      localArtist: localStorage.getItem("localArtist"),
      localArtistBio: localStorage.getItem("localArtistBio"),
      localArtistCutout: localStorage.getItem("localArtistCutout"),
      similarArtists: [],
    };
  },
  methods: {
    getSimilarArtists: function () {
      fetch(
        `https://n3rd-last-fm-api.glitch.me/getSimilarArtists?artist=${this.localArtist}`
      )
        // fetch("http://localhost:1987/similar.json")
        .then((response) => response.json())
        .then((data) => (this.similarArtists = data.artist))
        .then((data) => console.log(data));
    },
    setNewArtist: function (newArtist) {
      fetch(`https://theaudiodb.com/api/v1/json/2/search.php?s=${newArtist}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.artists[0].strArtist);
          // this.artistsSearchResults = data.artists;
          localStorage.setItem("localArtist", data.artists[0].strArtist);
          localStorage.setItem(
            "localArtistBio",
            data.artists[0].strBiographyEN
          );
          localStorage.setItem(
            "localArtistCutout",
            data.artists[0].strArtistThumb
          );

          this.localArtist = data.artists[0].strArtist;
          this.localArtistBio = data.artists[0].strBiographyEN;
          this.localArtistCutout = data.artists[0].strArtistThumb;

          this.$forceUpdate();
          this.getSimilarArtists();
        });
    },
  },
  mounted() {
    // setTimeout(function () {
    this.getSimilarArtists();
    // }, 2000);
  },
};
</script>
