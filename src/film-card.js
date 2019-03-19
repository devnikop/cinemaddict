import Component from './component.js';

const MINUTES_IN_HOUR = 60;

export default class FilmCard extends Component {
  constructor(film, hasControls = false) {
    super(film);
    this._hasControls = hasControls;

    this._commentsButton = null;
    this._onCommentsClick = this._onCommentsClick.bind(this);
    this._onComments = null;
  }

  get template() {
    return `
    <article class="film-card ${this._hasControls ? `film-card--no-controls` : ``}">
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

      ${this._hasControls ? `` : `
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

  set onCommentsClick(fn) {
    this._onComments = fn;
  }

  _onCommentsClick(evt) {
    evt.preventDefault();
    return typeof this._onComments === `function` && this._onComments();
  }

  bind() {
    this._commentsButton = this._element.querySelector(`.film-card__comments`);
    this._commentsButton.addEventListener(`click`, this._onCommentsClick);
  }

  unbind() {
    this._commentsButton.removeEventListener(`click`, this._onCommentsClick);
  }
}
