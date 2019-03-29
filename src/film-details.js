import FilmComponent from './film-component';
import moment from '../node_modules/moment';

const ACTOR_COUNT = 3;
const GENRE_COUNT = 3;

export default class FilmDetails extends FilmComponent {
  constructor(film, hasControls = false) {
    super(film);
    this._ageLimit = film.ageLimit;
    this._userRating = film.userRating;
    this._country = film.country;
    this._actorCast = film.actorCast;

    this._cardControls = hasControls;

    this._closeButton = null;
    this._commentElement = null;
    this._userRatingContainerElement = null;

    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onCommentEnter = this._onCommentEnter.bind(this);
    this._onUserRatingClick = this._onUserRatingClick.bind(this);
    this._onAddToWatchListClick = this._onAddToWatchListClick.bind(this);
    this._onMarkAsWatchedClick = this._onMarkAsWatchedClick.bind(this);
    this._onFavoriteClick = this._onFavoriteClick.bind(this);

    this._onCloseButton = null;
    this._onComment = null;
    this._onUserRating = null;
    this._onAddToWatchList = null;
    this._onMarkAsWatched = null;
    this._onAddToFavorite = null;
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
                <td class="film-details__cell">Brad Bird</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">Brad Bird</td>
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
                  <p class="film-details__comment-text">${currentComment.text}</p>
                  <p class="film-details__comment-info">
                    <span class="film-details__comment-author">${currentComment.author}</span>
                    <span class="film-details__comment-day">${moment(currentComment.date, `YYYY-MM-DD`).fromNow()}</span>
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
            <span class="film-details__watched-status film-details__watched-status--active">Already watched</span>
            <button class="film-details__watched-reset" type="button">undo</button>
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
      text: this.element.querySelector(`.film-details__comment-input`).value,
      author: `new author`,
      date: moment().format(`YYYY-MM-DD`),
      userRating: this.element.querySelector(`.film-details__user-rating-input:checked`).value,
    };
  }

  get _currentData() {
    return {
      comments: this._comments,
      userRating: this._userRating,
    };
  }

  set onCloseButtonClick(fn) {
    this._onCloseButton = fn;
  }

  set onCommentEnter(fn) {
    this._onComment = fn;
  }

  set onUserRatingClick(fn) {
    this._onUserRating = fn;
  }

  set onAddToWatchList(fn) {
    this._onAddToWatchList = fn;
  }

  set onMarkAsWatched(fn) {
    this._onMarkAsWatched = fn;
  }

  set onAddToFavorite(fn) {
    this._onAddToFavorite = fn;
  }

  _processNewData(newData) {
    const entry = {
      comments: {
        text: [],
        author: ``,
        date: new Date(),
      },
      userRating: ``,
    };

    entry.comments.text = newData.text;
    entry.comments.author = newData.author;
    entry.comments.date = newData.date;
    entry.userRating = newData.userRating;
    return entry;
  }

  _onCloseButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onCloseButton === `function`) {
      this._onCloseButton();
    }
  }

  _onCommentEnter(evt) {
    if (evt.key === `Enter`) {
      evt.preventDefault();
      this.update(this._processNewData(this._newData));
      if (typeof this._onComment === `function`) {
        this._onComment(this._currentData);
      }
    }
  }

  _onUserRatingClick(evt) {
    if (evt.target.className === `film-details__user-rating-label`) {
      document.querySelector(`input#${evt.target.htmlFor}`).checked = true;
      this.update(this._processNewData(this._newData));
      if (typeof this._onUserRating === `function`) {
        this._onUserRating();
      }
    }
  }

  _onAddToWatchListClick() {
    if (typeof this._onAddToWatchList === `function`) {
      this._state._isOnWatchlist = !this._state._isOnWatchlist;
      this._onAddToWatchList(this._state._isOnWatchlist);
    }
  }

  _onMarkAsWatchedClick() {
    if (typeof this._onMarkAsWatched === `function`) {
      this._state._isWatched = !this._state._isWatched;
      this._onMarkAsWatched(this._state._isWatched);
    }
  }

  _onFavoriteClick() {
    if (typeof this._onAddToFavorite === `function`) {
      this._state._isFavorite = !this._state._isFavorite;
      this._onAddToFavorite(this._state._isFavorite);
    }
  }

  bind() {
    this._closeButton = this.element.querySelector(`.film-details__close-btn`);
    this._commentElement = this.element.querySelector(`.film-details__comment-input`);
    this._userRatingContainerElement = this.element.querySelector(`.film-details__user-rating-score`);
    this._addToWatchlist = this.element.querySelector(`.film-details__control-label--watchlist`);
    this._markAsWatched = this.element.querySelector(`.film-details__control-label--watched`);
    this._markAsFavorite = this.element.querySelector(`.film-details__control-label--favorite`);

    this._closeButton.addEventListener(`click`, this._onCloseButtonClick);
    this._commentElement.addEventListener(`keydown`, this._onCommentEnter);
    this._userRatingContainerElement.addEventListener(`click`, this._onUserRatingClick);
    this._addToWatchlist.addEventListener(`click`, this._onAddToWatchListClick);
    this._markAsWatched.addEventListener(`click`, this._onMarkAsWatchedClick);
    this._markAsFavorite.addEventListener(`click`, this._onFavoriteClick);
  }

  unbind() {
    this._closeButton.removeEventListener(`click`, this._onCloseButtonClick);
    this._commentElement.removeEventListener(`keydown`, this._onCommentEnter);
    this._userRatingContainerElement.removeEventListener(`click`, this._onUserRatingClick);
    this._addToWatchlist.removeEventListener(`click`, this._onAddToWatchListClick);
    this._markAsWatched.removeEventListener(`click`, this._onMarkAsWatchedClick);
    this._markAsFavorite.removeEventListener(`click`, this._onFavoriteClick);
  }

  update(newObject) {
    if (newObject.comments.text) {
      this._comments.push(newObject.comments);
    }
    this._commentsCount = this._comments.length;
    this._userRating = newObject.userRating;
  }
}
