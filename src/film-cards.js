import FilmCard from './film-card';
import FilmDetails from './film-details';
import _ from '../node_modules/lodash';

export default class FilmCards {
  constructor(api) {
    this._api = api;

    this._onUserRank = null;

    this._watchlistLabelElement = ``;
    this._watchedLabelElement = ``;
    this._favoritesLabelElement = ``;
    this._commentInputElement = ``;
    this._ratingsContainerElement = ``;
    this._ratingInputElements = ``;
  }

  set onUserRank(cb) {
    this._onUserRank = cb;
  }

  _blockForm(filmDetails) {
    this._watchlistLabelElement = filmDetails.element.querySelector(`.film-details__control-label--watchlist`);
    this._watchlistLabelElement.style.pointerEvents = `none`;
    this._watchedLabelElement = filmDetails.element.querySelector(`.film-details__control-label--watched`);
    this._watchedLabelElement.style.pointerEvents = `none`;
    this._favoritesLabelElement = filmDetails.element.querySelector(`.film-details__control-label--favorite`);
    this._favoritesLabelElement.style.pointerEvents = `none`;

    this._commentInputElement = filmDetails.element.querySelector(`.film-details__comment-input`);
    this._commentInputElement.style.border = `1px solid black`;
    this._commentInputElement.classList.remove(`shake`);
    this._commentInputElement.disabled = true;

    this._ratingsContainerElement = filmDetails.element.querySelector(`.film-details__user-rating-score`);
    this._ratingsContainerElement.style.border = `1px solid transparent`;
    this._ratingsContainerElement.classList.remove(`shake`);
    this._ratingInputElements = filmDetails.element.querySelectorAll(`.film-details__user-rating-label`);
    for (const element of this._ratingInputElements) {
      element.style.pointerEvents = `none`;
    }
  }

  _unblockForm() {
    this._commentInputElement.disabled = false;
    this._commentInputElement.classList.add(`shake`);
    this._commentInputElement.style.border = `1px solid red`;

    this._ratingsContainerElement.classList.add(`shake`);
    this._ratingsContainerElement.style.border = `1px solid red`;
    for (const element of this._ratingInputElements) {
      element.style.pointerEvents = `auto`;
    }
  }

  _bindHandlers(filmDetails, film, currentFilmCardData) {
    const _updateDetails = (newData, eventType = ``) => {
      Object.assign(currentFilmCardData, newData);
      this._api.updateCard({id: currentFilmCardData.id, data: currentFilmCardData.toRAW()})
        .then((newCard) => {
          const currentFilmDetails = filmDetails.element;
          filmDetails.update(currentFilmCardData);
          document.body.replaceChild(filmDetails.render(), currentFilmDetails);
          const updatedCurrentData = Object.assign(currentFilmCardData, newCard);
          film.update(_.cloneDeep(updatedCurrentData));
        })
        .then(() => {
          if (eventType === `onCommentEnter`) {
            filmDetails.element.querySelector(`.film-details__watched-status`).textContent = `Comment added`;
            filmDetails.element.querySelector(`.film-details__watched-reset`).classList.remove(`visually-hidden`);
          } else if (eventType === `onCommentReset`) {
            filmDetails.element.querySelector(`.film-details__watched-status`).textContent = `Comment deleted`;
            filmDetails.element.querySelector(`.film-details__watched-reset`).classList.add(`visually-hidden`);
          }
        })
        .catch(() => {
          this._unblockForm();
        });
    };

    filmDetails.onClose = () => {
      filmDetails.unrender();
      film.update(_.cloneDeep(currentFilmCardData));
      const currentFilmCard = film.element;
      document.querySelector(`.films-list__container`).replaceChild(film.render(), currentFilmCard);
    };

    filmDetails.onCommentEnter = (newData) => {
      this._blockForm(filmDetails);
      _updateDetails(newData, `onCommentEnter`);
    };

    filmDetails.onUserRatingClick = (newData) => {
      this._blockForm(filmDetails);
      _updateDetails(newData);
    };

    filmDetails.onAddToWatchList = (newData) => {
      this._blockForm(filmDetails);
      _updateDetails(newData);
    };

    filmDetails.onMarkAsWatched = (newData) => {
      this._blockForm(filmDetails);
      _updateDetails(newData);
      if (typeof this._onUserRank === `function`) {
        this._onUserRank();
      }
    };

    filmDetails.onAddToFavorite = (newData) => {
      this._blockForm(filmDetails);
      _updateDetails(newData);
    };

    filmDetails.onCommentReset = () => {
      this._blockForm(filmDetails);
      currentFilmCardData.comments.pop();
      _updateDetails(currentFilmCardData, `onCommentReset`);
    };
  }

  _bindDetails(film, currentFilmCardData) {
    const _updateData = () => {
      this._api.updateCard({id: currentFilmCardData.id, data: currentFilmCardData.toRAW()})
        .then((newCard) => {
          const updatedCurrentData = Object.assign(currentFilmCardData, newCard);
          const currentFilmCard = film.element;
          film.update(_.cloneDeep(updatedCurrentData));
          document.querySelector(`.films-list__container`).replaceChild(film.render(), currentFilmCard);
        });
    };

    film.onCommentsClick = () => {
      const filmDetails = new FilmDetails(_.cloneDeep(currentFilmCardData));
      const filmDetailsNode = filmDetails.render();
      this._bindHandlers(filmDetails, film, currentFilmCardData);
      document.body.appendChild(filmDetailsNode);
    };
    film.onAddToWatchList = (newState) => {
      currentFilmCardData.isOnWatchlist = newState;
      _updateData();
    };
    film.onMarkAsWatched = (newState) => {
      currentFilmCardData.isWatched = newState;
      _updateData();
      if (typeof this._onUserRank === `function`) {
        this._onUserRank();
      }
    };
    film.onAddToFavorite = (newState) => {
      currentFilmCardData.isFavorite = newState;
      _updateData();
    };
  }

  render(filmCardDataList, controls = true) {
    const filmCardList = [];
    for (const currentFilmCardData of filmCardDataList) {
      const film = new FilmCard(_.cloneDeep(currentFilmCardData), controls);
      filmCardList.push(film.render());
      this._bindDetails(film, currentFilmCardData);
    }
    return filmCardList;
  }
}
