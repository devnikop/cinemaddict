import FilmComponent from './film-component';
import moment from '../node_modules/moment';

export default class FilmCard extends FilmComponent {
  constructor(film, controls = true) {
    super(film);
    this._controls = controls;

    this._commentsButtonElement = null;
    this._addToWatchlistElement = null;
    this._markAsWatchedElement = null;
    this._markAsFavoriteElement = null;

    this._onCommentsClick = this._onCommentsClick.bind(this);
    this._onAddToWatchListClick = this._onAddToWatchListClick.bind(this);
    this._onMarkAsWatchedClick = this._onMarkAsWatchedClick.bind(this);
    this._onFavoriteClick = this._onFavoriteClick.bind(this);

    this._onComments = null;
    this._onAddToWatchList = null;
    this._onMarkAsWatched = null;
  }

  get template() {
    return `
    <article class="film-card ${this._controls ? `` : `film-card--no-controls`}">
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._averageRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${moment(this._premiereDate).format(`YYYY`)}</span>
        <span class="film-card__duration">${moment.duration(this._duration, `m`).hours()}:${moment.duration(this._duration, `m`).minutes()}</span>
        <span class="film-card__genre">${this._genre[0]}</span>
      </p>
      <img src="${this._poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${this._description}</p>
      <button class="film-card__comments">${this._commentsCount} comments</button>

      ${this._controls ? `
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
        </form>` : ``}
    </article>`.trim();
  }

  set onCommentsClick(cb) {
    this._onComments = cb;
  }

  set onAddToWatchList(cb) {
    this._onAddToWatchList = cb;
  }

  set onMarkAsWatched(cb) {
    this._onMarkAsWatched = cb;
  }

  set onAddToFavorite(cb) {
    this._onAddToFavorite = cb;
  }

  bind() {
    this._commentsButtonElement = this.element.querySelector(`.film-card__comments`);
    this._commentsButtonElement.addEventListener(`click`, this._onCommentsClick);

    if (this._controls) {
      this._addToWatchlistElement = this.element.querySelector(`.film-card__controls-item--add-to-watchlist`);
      this._markAsWatchedElement = this.element.querySelector(`.film-card__controls-item--mark-as-watched`);
      this._markAsFavoriteElement = this.element.querySelector(`.film-card__controls-item--favorite`);

      this._addToWatchlistElement.addEventListener(`click`, this._onAddToWatchListClick);
      this._markAsWatchedElement.addEventListener(`click`, this._onMarkAsWatchedClick);
      this._markAsFavoriteElement.addEventListener(`click`, this._onFavoriteClick);
    }
  }

  unbind() {
    this._commentsButtonElement.removeEventListener(`click`, this._onCommentsClick);

    if (this._controls) {
      this._addToWatchlistElement.removeEventListener(`click`, this._onAddToWatchListClick);
      this._markAsWatchedElement.removeEventListener(`click`, this._onMarkAsWatchedClick);
      this._markAsFavoriteElement.removeEventListener(`click`, this._onFavoriteClick);
    }
  }

  update(newData) {
    this._commentsCount = newData.comments.length;
    this._state._isOnWatchlist = newData.isOnWatchlist;
    this._state._isWatched = newData.isWatched;
    this._state._isFavorite = newData.isFavorite;
  }

  _onCommentsClick(evt) {
    evt.preventDefault();
    return typeof this._onComments === `function` && this._onComments();
  }

  _onAddToWatchListClick(evt) {
    evt.preventDefault();
    if (typeof this._onAddToWatchList === `function`) {
      this._state._isOnWatchlist = !this._state._isOnWatchlist;
      this._onAddToWatchList(this._state._isOnWatchlist);
    }
  }

  _onMarkAsWatchedClick(evt) {
    evt.preventDefault();
    if (typeof this._onMarkAsWatched === `function`) {
      this._state._isWatched = !this._state._isWatched;
      this._onMarkAsWatched(this._state._isWatched);
    }
  }

  _onFavoriteClick(evt) {
    evt.preventDefault();
    if (typeof this._onAddToFavorite === `function`) {
      this._state._isFavorite = !this._state._isFavorite;
      this._onAddToFavorite(this._state._isFavorite);
    }
  }
}
