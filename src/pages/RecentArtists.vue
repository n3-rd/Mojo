<template>
  <div>
    <q-toolbar class="text-white font-regular">
      <q-toolbar-title class="title q-ml-md"> Recent Artists </q-toolbar-title>
      <!-- add a bin icon -->
      <q-btn
        icon="delete"
        label="clear history"
        flat
        dense
        color="red"
        @click="clearHistory"
      />
    </q-toolbar>

    <div class="empty text-center" v-if="localHistory.length == 0">
      <div class="bin-icon absolute-center">
        <q-icon name="delete_outline" size="105px" />
        <div class="empty-text">Nothing Here Yet!</div>
      </div>
    </div>

    <div v-if="this.noInternetConn == false">
      <NoInternet />
    </div>

    <!-- make a v-for list for localHistory -->
    <router-link to="/SimilarArtists">
      <div
        class="q-ml-md"
        v-for="localArtist in localHistory"
        :key="localArtist"
      >
        <q-item
          clickable
          v-ripple
          @click="
            storeLocalArtist(
              localArtist.artist,
              localArtist.cutout,
              localArtist.id,
              localArtist.likes,
              localArtist.popularity
            );
            addHistoryItem(
              localArtist.artist,
              localArtist.cutout,
              localArtist.id,
              localArtist.likes,
              localArtist.popularity
            );
          "
        >
          <q-item-section avatar>
            <q-avatar size="lg">
              <img v-if="localArtist.cutout.length" :src="localArtist.cutout" />
            </q-avatar>
          </q-item-section>

          <q-item-section class="text-white">{{
            localArtist.artist
          }}</q-item-section>
        </q-item>
      </div>
    </router-link>

    <q-dialog
      v-model="searchDialog"
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="search-dialog text-white">
        <q-card-section class="indicator">
          <div class="bar-indicator" v-close-popup></div>
        </q-card-section>
        <q-card-section>
          <div class="text-h6">Search an artist</div>
        </q-card-section>

        <q-card-section>
          <div class="row">
            <div class="col-10">
              <q-input
                class="text-white q-px-md"
                outlined
                dark
                v-model="ArtistSearchtext"
                color="text-main"
                autofocus
                :input-style="{ color: '#f2f2f2' }"
                @keyup.enter="searchArtist"
              />
            </div>
            <div class="col-2">
              <q-btn
                class="text-black q-ml-lg"
                color="brand"
                icon="search"
                round
                @click="searchArtist"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-list bordered>
            <div v-if="searchIndicator" class="artists-search-indicator">
              <div class="artists-search-indicator-child"></div>
              <q-spinner-tail color="brand" size="xl" />
            </div>

            <router-link to="/SimilarArtists">
              <div
                class="q-ml-md"
                v-for="artist in artistsSearchResults"
                :key="artist.id"
              >
                <q-item
                  clickable
                  v-ripple
                  @click="
                    storeLocalArtist(
                      artist.name,
                      artist.images[0].url,
                      artist.id,
                      artist.followers.total,
                      artist.popularity
                    );
                    addHistoryItem(
                      artist.name,
                      artist.images[0].url,
                      artist.id,
                      artist.followers.total,
                      artist.popularity
                    );
                  "
                >
                  <q-item-section avatar>
                    <q-avatar size="lg">
                      <img
                        v-if="artist.images.length"
                        :src="artist.images[0].url"
                      />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section class="text-white">{{
                    artist.name
                  }}</q-item-section>
                </q-item>
              </div>
            </router-link>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div class="search-trigger-button fixed-bottom-left q-mb-xl">
      <q-btn
        class="button"
        color="brand"
        icon="search"
        size="lg"
        round
        align="around"
        @click="this.searchDialog = true"
      />
    </div>
    <div class="fixed-bottom-right ph-badge">
      <a
        href="https://www.producthunt.com/posts/mojo-music?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-mojo&#0045;music"
        target="_blank"
        ><img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=344204&theme=dark"
          alt="Mojo&#0032;Music - A&#0032;web&#0032;app&#0032;that&#0032;helps&#0032;you&#0032;know&#0032;your&#0032;artists&#0032;and&#0032;their&#0032;music | Product Hunt"
          style="width: 150px; height: 38px"
      /></a>
    </div>
  </div>
</template>

<style lang="scss">
// mobile breakpoint
@media only screen and (max-width: 600px) {
  #q-app > div > div.absolute-bottom-right.ph-badge > a > img {
    width: 217px;
    height: 39px;
  }
}
.search-trigger-button {
  width: 100%;
  .button {
    margin: 0 auto;
    display: block;
    color: #191919 !important;
  }
}
#q-app
  > div
  > div
  > button
  > span.q-btn__content.text-center.col.items-center.q-anchor--skip.justify-around.row
  > i {
  position: absolute;
  top: 11px;
}
.title {
  font-size: 1.6rem;
}
.empty {
  color: #373737;
  opacity: 0.7;
  .empty-text {
    font-size: 1.4rem;
  }
}
body
  > div:nth-child(2)
  > div
  > div.q-dialog__inner.flex.no-pointer-events.q-dialog__inner--maximized.q-dialog__inner--standard.fixed-full.flex-center {
  margin-top: 9em;
}
body
  > div:nth-child(2)
  > div
  > div.q-dialog__inner.flex.no-pointer-events.q-dialog__inner--maximized.q-dialog__inner--standard.fixed-full.flex-center
  > div
  > div:nth-child(3)
  > div
  > div.col-10
  > label
  > div
  > div
  > div {
  // background-color: #0d0d0d;
  color: #f2f2f2;
}
.search-dialog {
  background-color: #191919;
}
.indicator {
  width: 100%;
  .bar-indicator {
    display: block;
    margin: 0 auto;
    height: 12px;
    width: 100px;
    background-color: #373737;
    border-radius: 15px;
  }
}
.artists-search-indicator {
  // center child in the middle
  width: 90vw;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<script>
// Vue.use(VueOnlineProp);

import NoInternet from "../components/NoInternet.vue";
// import checkInternetConnected from "check-internet-connected";
// const checkInternetConnected = require("check-internet-connected");

export default {
  name: "RecentArtists",
  components: {
    NoInternet,
  },
  data() {
    return {
      searchDialog: false,
      ArtistSearchtext: "",
      artistsSearchResults: [],
      searchIndicator: false,
      noInternetConn: true,
      localHistory: [],
    };
  },
  methods: {
    searchArtist: function () {
      this.searchIndicator = true;
      fetch(
        `https://n3rd-last-fm-api.glitch.me/searchArtist?artist=${this.ArtistSearchtext}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.searchIndicator = false;
          this.artistsSearchResults = data.body.artists.items;
        });
    },
    storeLocalArtist: function (artist, cutout, id, likes, popularity) {
      localStorage.setItem("localArtist", artist);
      localStorage.setItem("localArtistCutout", cutout);
      localStorage.setItem("localArtistId", id);
      localStorage.setItem("localArtistLikes", likes);
      localStorage.setItem("localArtistPopularity", popularity);
    },
    checkInternet: function () {
      const checkOnlineStatus = async () => {
        try {
          const online = await fetch(
            "https://theaudiodb.com/api/v1/json/2/search.php?s=coldplay"
          );
          return online.status >= 200 && online.status < 300; // either true or false
        } catch (err) {
          return false; // definitely offline
        }
      };

      setInterval(async () => {
        const result = await checkOnlineStatus();
        this.noInternetConn = result ? true : false;
      }, 30000);
    },
    checkLocalStorage: function () {
      if (!localStorage.getItem("localHistory")) {
        // localStorage.setItem("localHistory", JSON.stringify([]));
        console.log("no local history, creating database");
        localStorage.setItem("localHistory", JSON.stringify([]));
      } else {
        console.log("local history exists, filling localHistory");
        this.localHistory = JSON.parse(localStorage.getItem("localHistory"));
      }
    },
    addHistoryItem: function (artist, cutout, id, likes, popularity) {
      const found = this.localHistory.find((item) => item.id === id);
      if (!found) {
        localStorage.setItem(
          "localHistory",
          // place at the beginning of the array
          JSON.stringify([
            {
              artist: artist,
              cutout: cutout,
              id: id,
              likes: likes,
              popularity: popularity,
            },
            ...this.localHistory,
          ])
        );
        this.localHistory = JSON.parse(localStorage.getItem("localHistory"));
      }
    },
    clearHistory: function () {
      localStorage.removeItem("localHistory");
      this.localHistory = [];
    },
  },
  mounted() {
    this.checkLocalStorage();
    this.checkInternet();
  },
};
</script>

<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-695TLNK355"
></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());

gtag("config", "G-695TLNK355");
</script>
