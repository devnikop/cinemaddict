import FilmCard from './film-card';
import FilmDetails from './film-details';
import _ from '../node_modules/lodash';

// const blockForm = (editTaskComponent) => {
//   cardFormElement = editTaskComponent.element.querySelector(`.card__inner`);
//   cardFormElement.style.border = `1px solid black`;
//   cardFormElement.classList.remove(`shake`);
//   saveButtonElement = editTaskComponent.element.querySelector(`.card__save`);
//   deleteButtonElement = editTaskComponent.element.querySelector(`.card__delete`);
//   saveButtonElement.disabled = true;
//   deleteButtonElement.disabled = true;
// };

// const unblockForm = () => {
//   cardFormElement.classList.add(`shake`);
//   cardFormElement.style.border = `1px solid red`;
//   saveButtonElement.disabled = false;
//   deleteButtonElement.disabled = false;
// };

// let cardFormElement = ``;
// let saveButtonElement = ``;
// let deleteButtonElement = ``;

export default class FilmCards {
  constructor(api) {
    this._api = api;
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
        });
    };

    filmDetails.onCloseButtonClick = () => {
      filmDetails.unrender();
      film.update(_.cloneDeep(currentFilmCardData));
      const currentFilmCard = film.element;
      document.querySelector(`.films-list__container`).replaceChild(film.render(), currentFilmCard);
    };
    filmDetails.onCommentEnter = (newData) => {
      _updateDetails(newData);
    };
    filmDetails.onUserRatingClick = (newData) => {
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
    for (let i = 0; i < filmCardDataList.length; i++) {
      const currentFilmCardData = filmCardDataList[i];
      const film = new FilmCard(_.cloneDeep(currentFilmCardData), controls);
      filmCardList.push(film.render());
      this._bindDetails(film, currentFilmCardData);
    }
    return filmCardList;
  }
}
