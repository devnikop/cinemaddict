import {filterRender} from './make-filter.js';
import {getRandomInt} from './util.js';
import {filmCardRender} from './make-film-card.js';

const FILM_COUNT_MIN = 1;
const FILM_COUNT_MAX = 7;
const FILM_CARDS_COUNT = 7;
const TOP_RATED_FILM_COUNT = 2;
const MOST_COMMENTED_FILM_COUNT = 2;

const filterClickHandler = (evt) => {
  evt.preventDefault();
  const filmCardElements = filmsListContainerElement.querySelectorAll(`.film-card `);
  for (const element of filmCardElements) {
    element.remove();
  }
  let tempFilmsListContainer = ``;
  for (let i = 0; i < getRandomInt(FILM_COUNT_MIN, FILM_COUNT_MAX); i++) {
    tempFilmsListContainer += filmCardRender();
  }
  filmsListContainerElement.insertAdjacentHTML(`beforeend`, tempFilmsListContainer);
};

const mainNavigationContainerElement = document.querySelector(`.main-navigation`);
let tempFilterContainer = ``;
tempFilterContainer += filterRender(`All movies`);
tempFilterContainer += filterRender(`Watchlist`, getRandomInt(FILM_COUNT_MIN, FILM_COUNT_MAX));
tempFilterContainer += filterRender(`History`, getRandomInt(FILM_COUNT_MIN, FILM_COUNT_MAX));
tempFilterContainer += filterRender(`Favorites`, getRandomInt(FILM_COUNT_MIN, FILM_COUNT_MAX));
mainNavigationContainerElement.insertAdjacentHTML(`afterbegin`, tempFilterContainer);

const filterElements = mainNavigationContainerElement.querySelectorAll(`.make-navigation__item--js`);
for (const element of filterElements) {
  element.addEventListener(`click`, filterClickHandler);
}

const filmsListContainerElement = document.querySelector(`.films-list .films-list__container`);
let tempFilmsListContainer = ``;
for (let i = 0; i < FILM_CARDS_COUNT; i++) {
  tempFilmsListContainer += filmCardRender();
}
filmsListContainerElement.insertAdjacentHTML(`beforeend`, tempFilmsListContainer);

const topRatedContainerElement = document.querySelector(`.films-list__container--top-rated`);
let tempTopRatedContainer = ``;
for (let i = 0; i < TOP_RATED_FILM_COUNT; i++) {
  tempTopRatedContainer += filmCardRender(true);
}
topRatedContainerElement.insertAdjacentHTML(`beforeend`, tempTopRatedContainer);

const mostCommentedContainerElement = document.querySelector(`.films-list__container--most-commented`);
let tempMostCommentedContainer = ``;
for (let i = 0; i < MOST_COMMENTED_FILM_COUNT; i++) {
  tempMostCommentedContainer += filmCardRender(true);
}
mostCommentedContainerElement.insertAdjacentHTML(`beforeend`, tempMostCommentedContainer);
