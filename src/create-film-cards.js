import {filmCard as filmCardData} from './data.js';
import FilmCard from './film-card.js';

export default class CreateFilms {
  render(filmCardCount, hasControls = false) {
    const filmCardList = [];
    for (let i = 0; i < filmCardCount; i++) {
      const film = new FilmCard(filmCardData, hasControls);
      filmCardList.push(film.render());
    }
    return filmCardList;
  }
}
