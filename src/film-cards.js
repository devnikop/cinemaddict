import FilmCard from './film-card';
import FilmDetails from './film-details';
import _ from '../node_modules/lodash';

export default class FilmCards {
  constructor(api) {
    this._api = api;

    this._commentInputElement = ``;
    this._ratingsContainerElement = ``;
    this._ratingInputElements = ``;
  }

  _blockForm(filmDetails) {
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
    const _updateDetails = (newData) => {
      Object.assign(currentFilmCardData, newData);
      this._api.updateCard({id: currentFilmCardData.id, data: currentFilmCardData.toRAW()})
        .then((newCard) => {
          const currentFilmDetails = filmDetails.element;
          document.body.replaceChild(filmDetails.render(), currentFilmDetails);
          const updatedCurrentData = Object.assign(currentFilmCardData, newCard);
          film.update(_.cloneDeep(updatedCurrentData));
        })
        .then(() => {
          if (this._commentInputElement) {
            this._commentInputElement.disabled = false;
          }
          if (this._commentInputElement) {
            this._commentInputElement.disabled = false;
          }
        })
        .catch(() => {
          this._unblockForm();
        });
    };

    filmDetails.onCloseButtonClick = () => {
      filmDetails.unrender();
      film.update(_.cloneDeep(currentFilmCardData));
      const currentFilmCard = film.element;
      document.querySelector(`.films-list__container`).replaceChild(film.render(), currentFilmCard);
    };
    filmDetails.onCommentEnter = (newData) => {
      this._blockForm(filmDetails);
      _updateDetails(newData);
    };
    filmDetails.onUserRatingClick = (newData) => {
      this._blockForm(filmDetails);
      _updateDetails(newData);
    };
    filmDetails.onAddToWatchList = (newState) => {
      currentFilmCardData.isOnWatchlist = newState;
    };
    filmDetails.onMarkAsWatched = (newState) => {
      currentFilmCardData.isWatched = newState;
    };
    filmDetails.onAddToFavorite = (newState) => {
      currentFilmCardData.isFavorite = newState;
    };
  }

  _bindDetails(film, currentFilmCardData) {
    film.onCommentsClick = () => {
      const filmDetails = new FilmDetails(_.cloneDeep(currentFilmCardData));
      const filmDetailsNode = filmDetails.render();
      this._bindHandlers(filmDetails, film, currentFilmCardData);
      document.body.appendChild(filmDetailsNode);
    };
    film.onAddToWatchList = (newState) => {
      currentFilmCardData.isOnWatchlist = newState;
    };
    film.onMarkAsWatched = (newState) => {
      currentFilmCardData.isWatched = newState;
    };
    film.onAddToFavorite = (newState) => {
      currentFilmCardData.isFavorite = newState;
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
