const CACHE_NAME = `MOOWLE`;

self.addEventListener(`install`, (evt) => {
  evt.waitUntil(
      caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll([
          `./`,
          `./index.html`,
          `./bundle.js`,
          `./bundle.js.map`,
          `./css/normalize.css`,
          `./css/main.css`,
          `./images/posters/accused.jpg`,
          `./images/posters/blackmail.jpg`,
          `./images/posters/blue-blazes.jpg`,
          `./images/posters/fuga-da-new-york.jpg`,
          `./images/posters/moonrise.jpg`,
          `./images/posters/three-friends.jpg`,
          `./images/background.png`,
          `./images/icon-favorite.png`,
          `./images/icon-favorite.svg`,
          `./images/icon-watched.png`,
          `./images/icon-watchlist.png`,
          `./images/icon-watchlist.svg`,
        ]);
      })
  );
});

self.addEventListener(`fetch`, (evt) => {
  evt.respondWith(
      caches.match(evt.request)
      .then((response) => {
        return response ? response : fetch(evt.request);
      })
      .catch((err) => {
        throw err;
      })
  );
});
