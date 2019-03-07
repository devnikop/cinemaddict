export const renderFilmCard = (filmCard, cardControls = false) =>
  `<article class="film-card ${cardControls ? `film-card--no-controls` : ``}">
    <h3 class="film-card__title">${filmCard.title}</h3>
    <p class="film-card__rating">${filmCard.rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${filmCard.year}</span>
      <span class="film-card__duration">${filmCard.duration}</span>
      <span class="film-card__genre">${filmCard.genre}</span>
    </p>
    <img src="${filmCard.poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${filmCard.description}</p>
    <button class="film-card__comments">${filmCard.commentsCount} comments</button>

    ${cardControls ? `` : `
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
      </form>`}
  </article>`;
