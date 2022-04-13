const routes = [
  {
    path: "/",
    component: () => import("pages/Index.vue"),
  },
  {
    path: "/recentArtists",
    component: () => import("pages/RecentArtists.vue"),
  },
  {
    path: "/SimilarArtists",
    component: () => import("pages/SimilarArtists.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
