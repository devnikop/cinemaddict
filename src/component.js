import {createElement} from './util.js';

export default class Component {
  constructor(film) {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }

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
