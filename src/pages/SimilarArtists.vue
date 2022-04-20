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
        v-if="this.artistBio !== String"
      >
        <q-card>
          <q-card-section class="bg-bgblack">
            <div class="artist-bio text-white q-px-lg q-mt-md">
              {{ this.artistBio }}
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        group="tracks"
        icon="music_note"
        label="Top Tracks"
        header-class="text-brand"
        class="q-px-md"
      >
        <q-card>
          <q-card-section class="bg-bgblack">
            <div class="artist-bio text-white q-px-lg q-mt-md">
              <div v-for="track in artistTracks" :key="track.id">
                <q-item>
                  <q-item-section avatar>
                    <q-avatar size="lg">
                      <img
                        v-if="track.album.images.length"
                        :src="track.album.images[1].url"
                      />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section
                    class="similar-artist q-py-md q-px-md ellipsis"
                    :lines="1"
                  >
                    {{ track.name }}
                  </q-item-section>

                  <q-item-section clickable side>
                    <a
                      :href="track.external_urls.spotify"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <q-icon name="link" color="brand" />
                    </a>
                  </q-item-section>
                  <q-item-section clickable side v-if="track.preview_url">
                    <q-icon
                      name="play_arrow"
                      color="brand"
                      @click="playTrackPreview(track.preview_url, track.name)"
                    />
                  </q-item-section>
                </q-item>
              </div>
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
            <q-item clickable v-ripple @click="setNewArtist(similarArtist.id)">
              <q-item-section avatar>
                <q-avatar size="lg">
                  <img
                    v-if="similarArtist.images.length"
                    :src="similarArtist.images[1].url"
                  />
                </q-avatar>
              </q-item-section>

              <q-item-section class="similar-artist q-py-md q-px-md">{{
                similarArtist.name
              }}</q-item-section>
            </q-item>
          </div>
        </q-list>
      </div>
    </div>

    <div>
      <q-dialog v-model="playing" position="bottom" persistent>
        <q-card style="width: 350px">
          <!-- <q-linear-progress :value="0.6" color="brand" /> -->

          <q-card-section class="row items-center no-wrap bg-brand">
            <div>
              <div class="text-weight-bold">{{ localPlayingSongName }}</div>
            </div>

            <q-space />

            <q-btn flat round icon="stop" v-close-popup @click="stopSound" />
          </q-card-section>
        </q-card>
      </q-dialog>
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
      width: 40%;
      // overflow-x: clip;
      // overflow-x: hidden;
      overflow: hidden;
    }
  }
}
</style>

<script>
import { Howl, Howler } from "howler";

export default {
  data() {
    return {
      localArtist: localStorage.getItem("localArtist"),
      localArtistId: localStorage.getItem("localArtistId"),
      localArtistCutout: localStorage.getItem("localArtistCutout"),
      artistBio: "",
      artistTracks: [],
      similarArtists: [],
      playing: false,
      playingDialog: true,
      localPlayingSongName: localStorage.getItem("localPlayingSongName"),
    };
  },
  methods: {
    getSimilarArtists: function () {
      fetch(
        `https://n3rd-last-fm-api.glitch.me/getSimilarArtists?artistId=${this.localArtistId}`
      )
        // fetch("https://localhost:1987/similar.json")
        .then((response) => response.json())
        .then((data) => (this.similarArtists = data.artists))
        .then((data) => console.log(data));
    },
    setNewArtist: function (artistId) {
      fetch(
        `https://n3rd-last-fm-api.glitch.me/getArtistDetails?artistId=${artistId}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // this.artistsSearchResults = data.artists;
          localStorage.setItem("localArtist", data.name);
          // localStorage.setItem(
          //   "localArtistBio",
          //   data.artists[0].strBiographyEN
          // );
          localStorage.setItem("localArtistCutout", data.images[1].url);

          this.localArtist = data.name;
          this.localArtistCutout = data.images[1].url;
          this.localArtistId = data.id;

          this.$forceUpdate();
          this.getSimilarArtists();
          this.getArtistBio();
          this.getArtistTracks();
        });
    },
    getArtistBio: function () {
      fetch(
        `https://n3rd-last-fm-api.glitch.me/getArtistBio?artist=${this.localArtist}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.artistBio = data.bio.content;
        });
    },
    getArtistTracks: function () {
      fetch(
        `https://n3rd-last-fm-api.glitch.me/getArtistTracks?artistId=${this.localArtistId}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.artistTracks = data.tracks;
        });
    },
    playTrackPreview: function (track, songName) {
      this.playing = true;
      this.localPlayingSongName = songName;
      localStorage.setItem("localPlayingSongName", songName);
      var sound = new Howl({
        src: [track],
        html5: true,
      });
      Howler.stop();

      sound.play();
    },
    stopSound: function () {
      Howler.stop();
      this.playing = false;
    },
  },
  mounted() {
    this.getArtistBio();
    this.getSimilarArtists();
    this.getArtistTracks();
    // }, 2000);
  },
  updated() {
    // check if sound is playing
    // if (Howler.playing()) {
    //   this.playing = true;
    // } else {
    //   this.playing = false;
    // }
    // check if tab is emmiting audio
    // if (Howler.mute()) {
    //   this.playing = false;
    // } else {
    //   this.playing = true;
    // }
    // check if tab is emmiting audio with vanilla javascript
    // if (document.hasFocus()) {
    //   this.playing = true;
    // } else {
    //   this.playing = false;
    // }
  },
};
</script>
