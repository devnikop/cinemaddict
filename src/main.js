import {renderFilter} from './make-filter.js';
import {getRandomInt} from './util.js';
import {createFilmCardList} from './create-film-cards.js';

const FILM_COUNT_MIN = 1;
const FILM_COUNT_MAX = 7;
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

const filterClickHandler = (evt) => {
  if (evt.target.matches(`.make-navigation__item--js`)) {
    evt.preventDefault();
    const filmCardElements = filmsListContainerElement.querySelectorAll(`.film-card `);
    for (const element of filmCardElements) {
      element.remove();
    }
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < getRandomInt(FILM_COUNT_MIN, FILM_COUNT_MAX); i++) {
      fragment.appendChild(filmCardNodeList[i]);
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

const filmCardNodeList = createFilmCardList(FILM_CARDS_COUNT);
const topRatedFilmList = createFilmCardList(TOP_RATED_FILM_COUNT, true);
const mostCommentedFilmList = createFilmCardList(MOST_COMMENTED_FILM_COUNT, true);

const filmsListContainerElement = document.querySelector(`.films-list .films-list__container`);
const topRatedContainerElement = document.querySelector(`.films-list__container--top-rated`);
const mostCommentedContainerElement = document.querySelector(`.films-list__container--most-commented`);

addNodeListInContainer(filmCardNodeList, filmsListContainerElement);
addNodeListInContainer(topRatedFilmList, topRatedContainerElement);
addNodeListInContainer(mostCommentedFilmList, mostCommentedContainerElement);

renderFilterList();
