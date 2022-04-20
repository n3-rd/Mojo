<template>
  <div>
    <q-toolbar class="text-white font-regular">
      <q-toolbar-title class="title q-ml-md"> Recent Artists </q-toolbar-title>
    </q-toolbar>

    <div class="empty text-center">
      <div class="bin-icon absolute-center">
        <q-icon name="delete_outline" size="105px" />
        <div class="empty-text">Nothing Here Yet!</div>
      </div>
    </div>

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
                :input-style="{ color: '#f2f2f2' }"
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
                      artist.images[1].url,
                      artist.id
                    )
                  "
                >
                  <q-item-section avatar>
                    <q-avatar size="lg">
                      <img
                        v-if="artist.images.length"
                        :src="artist.images[1].url"
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

    <div class="search-trigger-button absolute-bottom-left q-mb-xl">
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
  </div>
</template>

<style lang="scss">
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
</style>
<script>
export default {
  data() {
    return {
      searchDialog: false,
      ArtistSearchtext: "",
      artistsSearchResults: [],
    };
  },
  methods: {
    searchArtist: function () {
      fetch(
        `https://n3rd-last-fm-api.glitch.me/searchArtist?artist=${this.ArtistSearchtext}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.artistsSearchResults = data.body.artists.items;
        });
    },
    storeLocalArtist: function (artist, cutout, id) {
      localStorage.setItem("localArtist", artist);
      localStorage.setItem("localArtistCutout", cutout);
      localStorage.setItem("localArtistId", id);
    },
  },
};
</script>
