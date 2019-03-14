import {filmCard as filmCardData} from './data.js';
import FilmCard from './film-card.js';

export const createFilmCardList = (filmCardCount, notHasCardControls = false) => {
  let filmCardList = [];
  for (let i = 0; i < filmCardCount; i++) {
    const film = new FilmCard(filmCardData, notHasCardControls);
    filmCardList[i] = film.render();
  }
  return filmCardList;
};
