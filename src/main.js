import {filterRender} from './make-filter.js';
import {getRandomInt} from './util.js';
import {filmCardRender} from './make-film-card.js';

const FILM_COUNT_MIN = 2;
const FILM_COUNT_MAX = 5;
const FILM_CARDS_COUNT = 7;
{
  const mainNavigationContainerElement = document.querySelector(`.main-navigation`);
  let tempFilterContainer = ``;
  tempFilterContainer += filterRender(`All movies`);
  tempFilterContainer += filterRender(`Watchlist`, getRandomInt(FILM_COUNT_MIN, FILM_COUNT_MAX));
  tempFilterContainer += filterRender(`History`, getRandomInt(FILM_COUNT_MIN, FILM_COUNT_MAX));
  tempFilterContainer += filterRender(`Favorites`, getRandomInt(FILM_COUNT_MIN, FILM_COUNT_MAX));
  mainNavigationContainerElement.insertAdjacentHTML(`afterbegin`, tempFilterContainer);
}

{
  const filmsListContainerElement = document.querySelector(`.films-list .films-list__container`);
  let tempFilmsListContainer = ``;
  for (let i = 0; i < FILM_CARDS_COUNT; i++) {
    tempFilmsListContainer += filmCardRender();
  }
  filmsListContainerElement.insertAdjacentHTML(`beforeend`, tempFilmsListContainer);
}

{
  const topRatedContainerElement = document.querySelector(`.films-list__container--top-rated`);
  let tempTopRatedContainer = ``;
  for (let i = 0; i < 2; i++) {
    tempTopRatedContainer += filmCardRender(true);
  }
  topRatedContainerElement.insertAdjacentHTML(`beforeend`, tempTopRatedContainer);
}

{
  const mostCommentedContainerElement = document.querySelector(`.films-list__container--most-commented`);
  let tempMostCommentedContainer = ``;
  for (let i = 0; i < 2; i++) {
    tempMostCommentedContainer += filmCardRender(true);
  }
  mostCommentedContainerElement.insertAdjacentHTML(`beforeend`, tempMostCommentedContainer);
}
