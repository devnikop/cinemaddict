import {filmCard as filmCardData} from './data.js';
import FilmCard from './film-card.js';
import FilmDetails from './film-details.js';

const createPopup = (film) => {
  film.onClick = () => {
    const filmDetails = new FilmDetails(filmCardData);
    const filmDetailsElement = filmDetails.render();
    document.body.appendChild(filmDetailsElement);
    filmDetails.onCloseClick = () => {
      filmDetailsElement.remove();
    };
  };
};

export const createFilmCardList = (filmCardCount, notHasCardControls = false) => {
  let filmCardList = [];
  for (let i = 0; i < filmCardCount; i++) {
    const film = new FilmCard(filmCardData, notHasCardControls);
    createPopup(film);
    filmCardList[i] = film.render();
  }
  return filmCardList;
};
