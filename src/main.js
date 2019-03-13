import {renderFilter} from './make-filter.js';
import {getRandomInt} from './util.js';
import {filmCard as filmCardData} from './data.js';
import FilmCard from './film-card.js';
import FilmDetails from './film-details.js';

const FILM_COUNT_MIN = 1;
const FILM_COUNT_MAX = 7;
const FILM_CARDS_COUNT = 7;
const TOP_RATED_FILM_COUNT = 2;
const MOST_COMMENTED_FILM_COUNT = 2;

const createPopup = (film) => {
  const filmDetails = new FilmDetails(filmCardData);
  const filmDetailsElement = filmDetails.render();
  film.filmDetailsElement = filmDetailsElement;
};

const createFilmCardList = () => {
  let filmCardList = [];
  for (let i = 0; i < FILM_CARDS_COUNT; i++) {
    const film = new FilmCard(filmCardData);
    createPopup(film);
    filmCardList[i] = film.render();
  }
  return filmCardList;
};

const createTopRatedFilmList = () => {
  let topRatedFilmList = [];
  for (let i = 0; i < TOP_RATED_FILM_COUNT; i++) {
    const film = new FilmCard(filmCardData, true);
    createPopup(film);
    topRatedFilmList[i] = film.render();
  }
  return topRatedFilmList;
};

const createMostCommentedFilmList = () => {
  let mostCommentedFilmList = [];
  for (let i = 0; i < MOST_COMMENTED_FILM_COUNT; i++) {
    const film = new FilmCard(filmCardData, true);
    createPopup(film);
    mostCommentedFilmList[i] = film.render();
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
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < getRandomInt(FILM_COUNT_MIN, FILM_COUNT_MAX); i++) {
      fragment.appendChild(filmCardList[i]);
    }
    filmsListContainerElement.appendChild(fragment);
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

const filmCardListFragment = document.createDocumentFragment();
for (const film of filmCardList) {
  filmCardListFragment.appendChild(film);
}
filmsListContainerElement.appendChild(filmCardListFragment);

const topRatedFragment = document.createDocumentFragment();
for (const film of topRatedFilmList) {
  topRatedFragment.appendChild(film);
}
topRatedContainerElement.appendChild(topRatedFragment);

const mostCommentedFragment = document.createDocumentFragment();
for (const film of mostCommentedFilmList) {
  mostCommentedFragment.appendChild(film);
}
mostCommentedContainerElement.appendChild(mostCommentedFragment);

renderFilterList();
