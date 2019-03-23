import Component from './component';
import moment from '../node_modules/moment';

const ACTOR_COUNT = 3;
const GENRE_COUNT = 3;

export default class FilmDetails extends Component {
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

    this._onCloseButton = null;
    this._onComment = null;
    this.onUserRating = null;
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

  set onCloseButtonClick(fn) {
    this._onCloseButton = fn;
  }

  set onCommentEnter(fn) {
    this._onComment = fn;
  }

  set onUserRatingClick(fn) {
    this.onUserRating = fn;
  }

  _processForm(newData) {
    const entry = {
      text: [],
      author: ``,
      date: new Date(),
      userRating: ``,
    };

    entry.text = newData.text;
    entry.author = newData.author;
    entry.date = newData.date;
    entry.userRating = newData.userRating;
    return entry;
  }

  _dataUpdate() {
    const data = {
      text: this._element.querySelector(`.film-details__comment-input`).value,
      author: `new author`,
      date: moment().format(`YYYY-MM-DD`),
      // userRating: this.element.querySelector(`.film-details__user-rating-input:hover`).value,
      userRating: this.element.querySelector(`.film-details__user-rating-input:checked`).value,
    };
    const newData = this._processForm(data);
    this.update(newData);
    return newData;
  }

  _onCloseButtonClick(evt) {
    evt.preventDefault();
    return typeof this._onCloseButton === `function` && this._onCloseButton();
  }

  _onCommentEnter(evt) {
    if (evt.key === `Enter`) {
      evt.preventDefault();
      const newData = this._dataUpdate();
      // eslint-disable-next-line no-unused-expressions
      typeof this._onComment === `function` && this._onComment(newData);
    }
  }

  _onUserRatingClick(evt) {
    if (evt.target.className === `film-details__user-rating-label`) {
      evt.preventDefault();
      const newData = this._dataUpdate();
      // eslint-disable-next-line no-unused-expressions
      typeof this.onUserRating === `function` && this.onUserRating(newData);
    }
  }

  bind() {
    this._closeButton = this._element.querySelector(`.film-details__close-btn`);
    this._commentElement = this._element.querySelector(`.film-details__comment-input`);
    this._userRatingContainerElement = this._element.querySelector(`.film-details__user-rating-score`);

    this._closeButton.addEventListener(`click`, this._onCloseButtonClick);
    this._commentElement.addEventListener(`keydown`, this._onCommentEnter);
    this._userRatingContainerElement.addEventListener(`click`, this._onUserRatingClick);
  }

  unbind() {
    this._closeButton.removeEventListener(`click`, this._onCloseButtonClick);
    this._commentElement.removeEventListener(`keydown`, this._onCommentEnter);
    this._userRatingContainerElement.removeEventListener(`click`, this._onUserRatingClick);
  }

  update(newData) {
    // eslint-disable-next-line no-unused-expressions
    newData.text && this._comments.push(newData);
    this._commentsCount = this._comments.length;
    this._userRating = newData.userRating;
  }
}
