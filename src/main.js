import {filmCardList as filmCardDataList} from './data';
import FilmCards from './film-cards';
import Filters from './filters';

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
const filmCardNodeList = filmsCards.render(filmCardDataList);

const topRatedFilmDataList = [];
for (let i = 0; i < TOP_RATED_FILM_COUNT; i++) {
  topRatedFilmDataList.push(filmCardDataList[i]);
}
const topRatedFilmList = filmsCards.render(topRatedFilmDataList, false);

const mostCommentedFilmDataList = [];
for (let i = 0; i < MOST_COMMENTED_FILM_COUNT; i++) {
  mostCommentedFilmDataList.push(filmCardDataList[i]);
}
const mostCommentedFilmList = filmsCards.render(mostCommentedFilmDataList, false);

const filmsCommonContainerElement = document.querySelector(`.films`);
const filmsListContainerElement = filmsCommonContainerElement.querySelector(`.films-list .films-list__container`);
const topRatedContainerElement = filmsCommonContainerElement.querySelector(`.films-list__container--top-rated`);
const mostCommentedContainerElement = filmsCommonContainerElement.querySelector(`.films-list__container--most-commented`);

addNodeListInContainer(filmCardNodeList, filmsListContainerElement);
addNodeListInContainer(topRatedFilmList, topRatedContainerElement);
addNodeListInContainer(mostCommentedFilmList, mostCommentedContainerElement);

const filters = new Filters();
filters.render(filmsListContainerElement, filmCardNodeList);
