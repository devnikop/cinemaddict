import {filmCard as filmCardData} from './data.js';
import FilmCard from './film-card.js';
import FilmDetails from './film-details.js';

export default class CreateFilms {
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

  render(filmCardCount, hasControls = false) {
    const filmCardList = [];
    for (let i = 0; i < filmCardCount; i++) {
      const film = new FilmCard(filmCardData, hasControls);
      filmCardList.push(film.render());
      this._bindDetails(film);
    }
    return filmCardList;
  }
}
