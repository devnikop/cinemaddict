import {createElement} from './util.js';

export default class FilmCard {
  constructor(film, cardControls = false) {
    this._title = film.title;
    this._rating = film.rating;
    this._year = film.year;
    this._duration = film.duration;
    this._genre = film.genre;
    this._poster = film.poster;
    this._description = film.description;
    this._commentsCount = film.commentsCount;
    this._isOnWatchlist = film.isOnWatchlist;
    this._isWatched = film.isWatched;
    this._isFavorite = film.isFavorite;
    this._cardControls = cardControls;

    this._element = null;
    this._commentsClickBinder = null;

    this._onComments = null;
  }

  get template() {
    return `
    <article class="film-card ${this._cardControls ? `film-card--no-controls` : ``}">
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${this._year}</span>
        <span class="film-card__duration">${this._duration}</span>
        <span class="film-card__genre">${this._genre}</span>
      </p>
      <img src="${this._poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${this._description}</p>
      <button class="film-card__comments">${this._commentsCount} comments</button>

      ${this._cardControls ? `` : `
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
        </form>`}
    </article>`.trim();
  }

  _onCommentsClick() {
    return typeof this._onComments === `function` && this._onComments();
  }

  set onClick(fn) {
    this._onComments = fn;
  }

  bind() {
    this._commentsClickBinder = this._onCommentsClick.bind(this);
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, this._commentsClickBinder);
  }

  unbind() {
    this._element.querySelector(`.film-card__comments`).removeEventListener(`click`, this._commentsClickBinder);
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }
}
