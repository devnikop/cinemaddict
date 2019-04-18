import FilmComponent from './film-component';
import moment from '../node_modules/moment';

const ACTOR_COUNT = 3;
const WRITERS_COUNT = 3;
const GENRE_COUNT = 3;

export default class FilmDetails extends FilmComponent {
  constructor(film, hasControls = false) {
    super(film);
    this._ageLimit = film.ageLimit;
    this._userRating = film.userRating;
    this._country = film.country;
    this._actorCast = film.actorCast;
    this._director = film.director;
    this._writers = film.writers;

    this._cardControls = hasControls;

    this._closeButtonElement = null;
    this._commentElement = null;
    this._userRatingContainerElement = null;
    this._addToWatchlistElement = null;
    this._markAsWatchedElement = null;
    this._markAsFavoriteElement = null;
    this._commentResetButtonElement = null;

    this._onEscapeClick = this._onEscapeClick.bind(this);
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onCommentEnter = this._onCommentEnter.bind(this);
    this._onUserRatingClick = this._onUserRatingClick.bind(this);
    this._onAddToWatchListClick = this._onAddToWatchListClick.bind(this);
    this._onMarkAsWatchedClick = this._onMarkAsWatchedClick.bind(this);
    this._onFavoriteClick = this._onFavoriteClick.bind(this);
    this._onCommentResetClick = this._onCommentResetClick.bind(this);

    this._onClose = null;
    this._onComment = null;
    this._onUserRating = null;
    this._onAddToWatchList = null;
    this._onMarkAsWatched = null;
    this._onAddToFavorite = null;
    this._onCommentReset = null;
  }

  get template() {
    return `
    <section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${this._poster}" alt="incredables-2">

            <p class="film-details__age">${this._ageLimit}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${this._title}</h3>
                <p class="film-details__title-original">Original: ${this._titleOriginal}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${this._averageRating}</p>
                <p class="film-details__user-rating">Your rate ${this._userRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${this._director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${this._writers.slice(0, WRITERS_COUNT).join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${this._actorCast.slice(0, ACTOR_COUNT).join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${moment(this._premiereDate).format(`DD MMMM YYYY`)} (USA)</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${moment.duration(this._duration, `minutes`).asMinutes()} min</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${this._country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  ${this._genre.slice(0, GENRE_COUNT).map((currentGenre) => `
                    <span class="film-details__genre">${currentGenre}</span>
                  `).join(``)}
                </td>
              </tr>
            </table>

            <p class="film-details__film-description">${this._description}</p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._state._isOnWatchlist ? `checked` : ``}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">${this._state._isOnWatchlist ? `Already in watchlist` : `Add to watchlist`}</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this._state._isWatched ? `checked` : ``}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">${this._state._isWatched ? `Already watched` : `Mark as watched`}</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._state._isFavorite ? `checked` : ``}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">${this._state._isFavorite ? `Favorite` : `Add to favorites`}</label>
        </section>

        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._commentsCount}</span></h3>

          <ul class="film-details__comments-list">
            ${this._comments.map((currentComment) => `
              <li class="film-details__comment">
                <span class="film-details__comment-emoji">😴</span>
                <div>
                  <p class="film-details__comment-text">${currentComment.comment}</p>
                  <p class="film-details__comment-info">
                    <span class="film-details__comment-author">${currentComment.author}</span>
                    <span class="film-details__comment-day">${moment(currentComment.date).fromNow()}</span>
                  </p>
                </div>
              </li>
            `).join(``)}
          </ul>

          <div class="film-details__new-comment">
            <div>
              <label for="add-emoji" class="film-details__add-emoji-label">😐</label>
              <input type="checkbox" class="film-details__add-emoji visually-hidden" id="add-emoji">

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">😴</label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-neutral-face" value="neutral-face" checked>
                <label class="film-details__emoji-label" for="emoji-neutral-face">😐</label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-grinning" value="grinning">
                <label class="film-details__emoji-label" for="emoji-grinning">😀</label>
              </div>
            </div>
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="← Select reaction, add comment here" name="comment"></textarea>
            </label>
          </div>
        </section>

        <section class="film-details__user-rating-wrap">
          <div class="film-details__user-rating-controls">
            <span class="film-details__watched-status film-details__watched-status--active"></span>
            <button class="film-details__watched-reset visually-hidden" type="button">undo</button>
          </div>

          <div class="film-details__user-score">
            <div class="film-details__user-rating-poster">
              <img src="images/posters/blackmail.jpg" alt="film-poster" class="film-details__user-rating-img">
            </div>

            <section class="film-details__user-rating-inner">
              <h3 class="film-details__user-rating-title">${this._title}</h3>

              <p class="film-details__user-rating-feelings">How you feel it?</p>

              <div class="film-details__user-rating-score">
                ${Array(9).fill().map((item, i) => `
                  <input type="radio" name="score" class="film-details__user-rating-input visually-hidden"
                    value="${i + 1}" id="rating-${i + 1}" ${+this._userRating === i + 1 ? `checked` : ``}>
                  <label class="film-details__user-rating-label" for="rating-${i + 1}">${i + 1}</label>
                `).join(``)}
              </div>
            </section>
          </div>
        </section>
      </form>
    </section>
    `.trim();
  }

  get _newData() {
    return {
      author: `new author`,
      comment: this.element.querySelector(`.film-details__comment-input`).value,
      date: +moment(),
      emotion: `sleeping`,
      userRating: this.element.querySelector(`.film-details__user-rating-input:checked`).value,
    };
  }

  get _currentData() {
    return {
      comments: this._comments,
      userRating: this._userRating,
      isOnWatchlist: this._state._isOnWatchlist,
      isWatched: this._state._isWatched,
      isFavorite: this._state._isFavorite,
    };
  }

  set onClose(cb) {
    this._onClose = cb;
  }

  set onCommentEnter(cb) {
    this._onComment = cb;
  }

  set onUserRatingClick(cb) {
    this._onUserRating = cb;
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

  set onCommentReset(cb) {
    this._onCommentReset = cb;
  }

  bind() {
    this._closeButtonElement = this.element.querySelector(`.film-details__close-btn`);
    this._commentElement = this.element.querySelector(`.film-details__comment-input`);
    this._userRatingContainerElement = this.element.querySelector(`.film-details__user-rating-score`);
    this._addToWatchlistElement = this.element.querySelector(`.film-details__control-label--watchlist`);
    this._markAsWatchedElement = this.element.querySelector(`.film-details__control-label--watched`);
    this._markAsFavoriteElement = this.element.querySelector(`.film-details__control-label--favorite`);
    this._commentResetButtonElement = this.element.querySelector(`.film-details__watched-reset`);

    window.addEventListener(`keydown`, this._onEscapeClick);
    this._closeButtonElement.addEventListener(`click`, this._onCloseButtonClick);
    this._commentElement.addEventListener(`keyup`, this._onCommentEnter);
    this._userRatingContainerElement.addEventListener(`click`, this._onUserRatingClick);
    this._addToWatchlistElement.addEventListener(`click`, this._onAddToWatchListClick);
    this._markAsWatchedElement.addEventListener(`click`, this._onMarkAsWatchedClick);
    this._markAsFavoriteElement.addEventListener(`click`, this._onFavoriteClick);
    this._commentResetButtonElement.addEventListener(`click`, this._onCommentResetClick);
  }

  unbind() {
    window.removeEventListener(`keydown`, this._onEscapeClick);
    this._closeButtonElement.removeEventListener(`click`, this._onCloseButtonClick);
    this._commentElement.removeEventListener(`keyup`, this._onCommentEnter);
    this._userRatingContainerElement.removeEventListener(`click`, this._onUserRatingClick);
    this._addToWatchlistElement.removeEventListener(`click`, this._onAddToWatchListClick);
    this._markAsWatchedElement.removeEventListener(`click`, this._onMarkAsWatchedClick);
    this._markAsFavoriteElement.removeEventListener(`click`, this._onFavoriteClick);
    this._commentResetButtonElement.removeEventListener(`click`, this._onCommentResetClick);
  }

  update(newObject) {
    if (newObject.comments.comment) {
      this._comments.push(newObject.comments);
    }
    this._commentsCount = this._comments.length;
    this._userRating = newObject.userRating;
  }

  _onPopupClose() {
    if (typeof this._onClose === `function`) {
      this._onClose(this._currentData);
    }
  }

  _onEscapeClick(evt) {
    if (evt.key === `Escape`) {
      this._onPopupClose();
    }
  }

  _onCloseButtonClick(evt) {
    evt.preventDefault();
    this._onPopupClose();
  }

  _onCommentEnter(evt) {
    if (evt.ctrlKey && evt.key === `Enter`) {
      evt.preventDefault();
      this.update(FilmDetails.processNewData(this._newData));
      if (typeof this._onComment === `function`) {
        this._onComment(this._currentData);
      }
    }
  }

  _onUserRatingClick(evt) {
    if (evt.target.className === `film-details__user-rating-label`) {
      document.querySelector(`input#${evt.target.htmlFor}`).checked = true;
      this.update(FilmDetails.processNewData(this._newData));
      if (typeof this._onUserRating === `function`) {
        this._onUserRating(this._currentData);
      }
    }
  }

  _onAddToWatchListClick() {
    if (typeof this._onAddToWatchList === `function`) {
      this._state._isOnWatchlist = !this._state._isOnWatchlist;
      this._onAddToWatchList(this._currentData);
    }
  }

  _onMarkAsWatchedClick() {
    if (typeof this._onMarkAsWatched === `function`) {
      this._state._isWatched = !this._state._isWatched;
      if (this._state._isWatched) {
        // this._watchingDate = +moment();
      }
      this._onMarkAsWatched(this._currentData);
    }
  }

  _onFavoriteClick() {
    if (typeof this._onAddToFavorite === `function`) {
      this._state._isFavorite = !this._state._isFavorite;
      this._onAddToFavorite(this._currentData);
    }
  }

  _onCommentResetClick() {
    this._comments.pop();
    if (typeof this._onCommentReset === `function`) {
      this._onCommentReset();
    }
  }

  static processNewData(newData) {
    const entry = {
      comments: {
        author: ``,
        comment: ``,
        date: new Date(),
        emotion: ``,
      },
      userRating: ``,
    };

    entry.comments.comment = newData.comment;
    entry.comments.author = newData.author;
    entry.comments.date = newData.date;
    entry.userRating = newData.userRating;
    return entry;
  }
}
