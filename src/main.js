import {renderFilter} from './make-filter.js';
import {getRandomInt} from './util.js';
import {renderFilmCard} from './make-film-card.js';
import {filmCard} from './data.js';

const FILM_COUNT_MIN = 1;
const FILM_COUNT_MAX = 7;
const FILM_CARDS_COUNT = 7;
const TOP_RATED_FILM_COUNT = 2;
const MOST_COMMENTED_FILM_COUNT = 2;

const createFilmCardList = () => {
  let filmCardList = [];
  for (let i = 0; i < FILM_CARDS_COUNT; i++) {
    filmCardList[i] = renderFilmCard(filmCard);
  }
  return filmCardList;
};

const createTopRatedFilmList = () => {
  let topRatedFilmList = [];
  for (let i = 0; i < TOP_RATED_FILM_COUNT; i++) {
    topRatedFilmList[i] = renderFilmCard(filmCard, true);
  }
  return topRatedFilmList;
};

const createMostCommentedFilmList = () => {
  let mostCommentedFilmList = [];
  for (let i = 0; i < MOST_COMMENTED_FILM_COUNT; i++) {
    mostCommentedFilmList[i] = renderFilmCard(filmCard, true);
  }
  return mostCommentedFilmList;
};

const filterClickHandler = (evt) => {
  if (evt.target.matches(`.make-navigation__item--js`)) {
    evt.preventDefault();
    const filmCardElements = filmsListContainerElement.querySelectorAll(`.film-card `);
    for (const element of filmCardElements) {
      element.remove();
    }
    let tempFilmsListContainer = ``;
    for (let i = 0; i < getRandomInt(FILM_COUNT_MIN, FILM_COUNT_MAX); i++) {
      tempFilmsListContainer += filmCardList[i];
    }
    filmsListContainerElement.insertAdjacentHTML(`beforeend`, tempFilmsListContainer);
  }
};

const renderFilterList = () => {
  const mainNavigationContainerElement = document.querySelector(`.main-navigation`);
  let tempFilterContainer = ``;
  tempFilterContainer += renderFilter(`All movies`);
  tempFilterContainer += renderFilter(`Watchlist`, getRandomInt(FILM_COUNT_MIN, FILM_COUNT_MAX));
  tempFilterContainer += renderFilter(`History`, getRandomInt(FILM_COUNT_MIN, FILM_COUNT_MAX));
  tempFilterContainer += renderFilter(`Favorites`, getRandomInt(FILM_COUNT_MIN, FILM_COUNT_MAX));
  mainNavigationContainerElement.insertAdjacentHTML(`afterbegin`, tempFilterContainer);
  mainNavigationContainerElement.addEventListener(`click`, filterClickHandler);
};

const filmCardList = createFilmCardList();
const topRatedFilmList = createTopRatedFilmList();
const mostCommentedFilmList = createMostCommentedFilmList();

const filmsListContainerElement = document.querySelector(`.films-list .films-list__container`);
const topRatedContainerElement = document.querySelector(`.films-list__container--top-rated`);
const mostCommentedContainerElement = document.querySelector(`.films-list__container--most-commented`);

filmsListContainerElement.insertAdjacentHTML(`beforeend`, filmCardList.join(``));
topRatedContainerElement.insertAdjacentHTML(`beforeend`, topRatedFilmList.join(``));
mostCommentedContainerElement.insertAdjacentHTML(`beforeend`, mostCommentedFilmList.join(``));

renderFilterList();
