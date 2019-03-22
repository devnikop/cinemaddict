import {createElement} from './util';

export default class Component {
  constructor(film) {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }

    this._title = film.title;
    this._titleOriginal = film.titleOriginal;
    this._averageRating = film.averageRating;
    this._premiereDate = film.premiereDate;
    this._duration = +film.duration;
    this._genre = film.genre;
    this._poster = film.poster;
    this._description = film.description;
    this._commentsCount = film.commentsCount;

    this._state = {
      _isOnWatchlist: film.isOnWatchlist,
      _isWatched: film.isWatched,
      _isFavorite: film.isFavorite,
    };

    this._element = null;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  bind() {}

  unbind() {}

  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element.remove();
    this._element = null;
  }
}
