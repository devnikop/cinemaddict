import FilmCards from './film-cards.js';
import Filters from './filters.js';

const FILM_CARDS_COUNT = 7;
const TOP_RATED_FILM_COUNT = 2;
const MOST_COMMENTED_FILM_COUNT = 2;

const addNodeListInContainer = (nodeList, container) => {
  const fragment = document.createDocumentFragment();
  for (const node of nodeList) {
    fragment.appendChild(node);
  }
  container.appendChild(fragment);
};

const filmsCards = new FilmCards();
const filmCardNodeList = filmsCards.render(FILM_CARDS_COUNT);
const topRatedFilmList = filmsCards.render(TOP_RATED_FILM_COUNT, true);
const mostCommentedFilmList = filmsCards.render(MOST_COMMENTED_FILM_COUNT, true);

const filmsCommonContainerElement = document.querySelector(`.films`);
const filmsListContainerElement = filmsCommonContainerElement.querySelector(`.films-list .films-list__container`);
const topRatedContainerElement = filmsCommonContainerElement.querySelector(`.films-list__container--top-rated`);
const mostCommentedContainerElement = filmsCommonContainerElement.querySelector(`.films-list__container--most-commented`);

addNodeListInContainer(filmCardNodeList, filmsListContainerElement);
addNodeListInContainer(topRatedFilmList, topRatedContainerElement);
addNodeListInContainer(mostCommentedFilmList, mostCommentedContainerElement);

const filters = new Filters();
filters.render(filmsListContainerElement, filmCardNodeList);
