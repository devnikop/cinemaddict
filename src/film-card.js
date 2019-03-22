import Component from './component';
import moment from '../node_modules/moment';

export default class FilmCard extends Component {
  constructor(film, controls = true) {
    super(film);
    this._controls = controls;

    this._commentsButton = null;
    this._addToWatchlist = null;
    this._markAsWatched = null;
    this._markAsFavorite = null;

    this._onCommentsClick = this._onCommentsClick.bind(this);
    this._onWacthlistClick = this._onWacthlistClick.bind(this);
    this._onWatchedClick = this._onWatchedClick.bind(this);
    this._onFavoriteClick = this._onFavoriteClick.bind(this);

    this._onComments = null;
  }

  get template() {
    return `
    <article class="film-card ${this._controls ? `` : `film-card--no-controls`}">
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._averageRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${moment(this._premiereDate).format(`YYYY`)}</span>
        <span class="film-card__duration">${moment.duration(this._duration, `m`).hours()}h ${moment.duration(this._duration, `m`).minutes()}</span>
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

  set onCommentsClick(fn) {
    this._onComments = fn;
  }

  _onCommentsClick(evt) {
    evt.preventDefault();
    return typeof this._onComments === `function` && this._onComments();
  }

  _onWacthlistClick(evt) {
    evt.preventDefault();
    this._state._isOnWatchlist = !this._state._isOnWatchlist;
  }

  _onWatchedClick(evt) {
    evt.preventDefault();
    this._state._isWatched = !this._state._isWatched;
  }

  _onFavoriteClick(evt) {
    evt.preventDefault();
    this._state._isFavorite = !this._state._isFavorite;
  }

  bind() {
    this._commentsButton = this._element.querySelector(`.film-card__comments`);
    this._commentsButton.addEventListener(`click`, this._onCommentsClick);

    if (this._controls) {
      this._addToWatchlist = this._element.querySelector(`.film-card__controls-item--add-to-watchlist`);
      this._markAsWatched = this._element.querySelector(`.film-card__controls-item--mark-as-watched`);
      this._markAsFavorite = this._element.querySelector(`.film-card__controls-item--favorite`);

      this._addToWatchlist.addEventListener(`click`, this._onWacthlistClick);
      this._markAsWatched.addEventListener(`click`, this._onWatchedClick);
      this._markAsFavorite.addEventListener(`click`, this._onFavoriteClick);
    }
  }

  unbind() {
    this._commentsButton.removeEventListener(`click`, this._onCommentsClick);

    if (this._controls) {
      this._addToWatchlist.removeEventListener(`click`, this._onWacthlistClick);
      this._markAsWatched.removeEventListener(`click`, this._onWatchedClick);
      this._markAsFavorite.removeEventListener(`click`, this._onFavoriteClick);
    }
  }

  update() {
    this._commentsCount = this._comments.length;
  }
}
