import Component from './component';

export default class FilmComponent extends Component {
  constructor(film) {
    if (new.target === Component) {
      throw new Error(`Can't instantiate FilmComponent, only concrete one.`);
    }

    super();

    this._id = film.id;
    this._title = film.title;
    this._titleOriginal = film.titleOriginal;
    this._averageRating = film.averageRating;
    this._premiereDate = film.premiereDate;
    this._duration = +film.duration;
    this._genre = film.genre.length ? film.genre : [`No genre`];
    this._poster = film.poster;
    this._description = film.description;
    this._comments = film.comments;
    this._commentsCount = this._comments.length;
    this._watchingDate = film.watchingDate;

    this._ageLimit = film.ageLimit;
    this._userRating = film.userRating;
    this._country = film.country;
    this._actorCast = film.actorCast;
    this._director = film.director;
    this._writers = film.writers;

    this._state = {
      _isOnWatchlist: film.isOnWatchlist,
      _isWatched: film.isWatched,
      _isFavorite: film.isFavorite,
    };

    this._element = null;
  }
}
