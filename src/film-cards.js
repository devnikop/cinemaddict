import {filmCard as filmCardData} from './data';
import FilmCard from './film-card';
import FilmDetails from './film-details';

export default class FilmCards {
  _detailsCloseHandler(filmDetails) {
    filmDetails.onCloseButtonClick = () => {
      filmDetails.unrender();
    };
  }

  _bindDetails(film) {
    film.onCommentsClick = () => {
      const filmDetails = new FilmDetails(filmCardData);
      const filmDetailsNode = filmDetails.render();
      this._detailsCloseHandler(filmDetails);
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
