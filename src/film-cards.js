import {filmCard as filmCardData} from './data';
import FilmCard from './film-card';
import FilmDetails from './film-details';

export default class FilmCards {
  _bindHandlers(filmDetails, film) {
    filmDetails.onCloseButtonClick = () => {
      filmDetails.unrender();
    };
    filmDetails.onCommentEnter = (newData) => {
      const currentFilmDetails = filmDetails.element;
      document.body.replaceChild(filmDetails.render(), currentFilmDetails);
      film.update(newData);
      const currentFilmCard = film.element;
      document.querySelector(`.films-list__container`).replaceChild(film.render(), currentFilmCard);
    };
    filmDetails.onUserRatingClick = () => {

    };
  }

  _bindDetails(film) {
    film.onCommentsClick = () => {
      const filmDetails = new FilmDetails(filmCardData);
      const filmDetailsNode = filmDetails.render();
      this._bindHandlers(filmDetails, film);
      document.body.appendChild(filmDetailsNode);
    };
  }

  render(filmCardCount, controls = true) {
    const filmCardList = [];
    for (let i = 0; i < filmCardCount; i++) {
      const film = new FilmCard(filmCardData, controls);
      filmCardList.push(film.render());
      this._bindDetails(film);
    }
    return filmCardList;
  }
}
