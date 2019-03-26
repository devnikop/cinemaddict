import FilmCard from './film-card';
import FilmDetails from './film-details';
import _ from '../node_modules/lodash';

export default class FilmCards {
  _bindHandlers(filmDetails, film, currentFilmCardData) {
    filmDetails.onCloseButtonClick = () => {
      filmDetails.unrender();
      const currentFilmCard = film.element;
      document.querySelector(`.films-list__container`).replaceChild(film.render(), currentFilmCard);
    };
    filmDetails.onCommentEnter = (newData) => {
      const currentFilmDetails = filmDetails.element;
      document.body.replaceChild(filmDetails.render(), currentFilmDetails);
      const updatedCurrentData = Object.assign(currentFilmCardData, newData);
      film.update(_.cloneDeep(updatedCurrentData));
    };
    filmDetails.onUserRatingClick = () => {
      const currentFilmDetails = filmDetails.element;
      document.body.replaceChild(filmDetails.render(), currentFilmDetails);
    };
  }

  _bindDetails(film, currentFilmCardData) {
    film.onCommentsClick = () => {
      const filmDetails = new FilmDetails(_.cloneDeep(currentFilmCardData));
      const filmDetailsNode = filmDetails.render();
      this._bindHandlers(filmDetails, film, currentFilmCardData);
      document.body.appendChild(filmDetailsNode);
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
