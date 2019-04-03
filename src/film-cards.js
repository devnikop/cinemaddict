import FilmCard from './film-card';
import FilmDetails from './film-details';
import _ from '../node_modules/lodash';

export default class FilmCards {
  constructor(api) {
    this._api = api;
  }
  _bindHandlers(filmDetails, film, currentFilmCardData) {
    filmDetails.onCloseButtonClick = (id, newData) => {
      const updatedCurrentData = Object.assign(currentFilmCardData, newData);
      Object.assign(currentFilmCardData, newData);
      this._api.updateCard({id, data: updatedCurrentData.toRAW()})
        .then((newCard) => {
          filmDetails.unrender();
          film.update(_.cloneDeep(newCard));
          const currentFilmCard = film.element;
          document.querySelector(`.films-list__container`).replaceChild(film.render(), currentFilmCard);
        });
    };
    filmDetails.onCommentEnter = (newData) => {
      const currentFilmDetails = filmDetails.element;
      document.body.replaceChild(filmDetails.render(), currentFilmDetails);
      const updatedCurrentData = Object.assign(currentFilmCardData, newData);
      film.update(_.cloneDeep(updatedCurrentData));
    };
    filmDetails.onUserRatingClick = (newData) => {
      const currentFilmDetails = filmDetails.element;
      document.body.replaceChild(filmDetails.render(), currentFilmDetails);
      Object.assign(currentFilmCardData, newData);
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
