import {createElement} from './util.js';
import FilmDetails from './film-details.js';
import {filmCard as filmCardData} from './data.js';

const MINUTES_IN_HOUR = 60;

export default class FilmCard {
  constructor(film, notHasCardControls = false) {
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
    this._cardControls = notHasCardControls;

    this._element = null;
    this._commentsClickBinder = this._onCommentsClick.bind(this);
  }

  get template() {
    return `
    <article class="film-card ${this._cardControls ? `film-card--no-controls` : ``}">
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${this._year}</span>
        <span class="film-card__duration">${this._minutesToHour()}</span>
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

  _minutesToHour() {
    const hours = Math.trunc(this._duration / MINUTES_IN_HOUR);
    const minutes = this._duration % MINUTES_IN_HOUR;
    return `${hours}h ${minutes}`;
  }

  _onCommentsClick() {
    const filmDetails = new FilmDetails(filmCardData);
    document.body.appendChild(filmDetails.render());
  }

  bind() {
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