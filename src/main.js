import {filmCardList as filmCardDataList} from './data';
import FilmCards from './film-cards';
import Filters from './filters';
import {clearContainer} from './util';

const TOP_RATED_FILM_COUNT = 2;
const MOST_COMMENTED_FILM_COUNT = 2;

const addNodeListInContainer = (nodeList, container) => {
  const fragment = document.createDocumentFragment();
  for (const node of nodeList) {
    fragment.appendChild(node);
  }
  container.appendChild(fragment);
};

const getOnWatchlist = () => {
  return filmCardDataList.filter((currentCard) => currentCard.isOnWatchlist);
};

const getWatched = () => {
  return filmCardDataList.filter((currentCard) => currentCard.isWatched);
};

const getFavorites = () => {
  return filmCardDataList.filter((currentCard) => currentCard.isFavorite);
};

const filterFilmCards = (filterName) => {
  let filteredCards = [];
  switch (filterName) {
    case `All movies`:
      filteredCards = filmsCards.render(filmCardDataList);
      break;
    case `Watchlist`:
      filteredCards = filmsCards.render(getOnWatchlist());
      break;
    case `History`:
      filteredCards = filmsCards.render(getWatched());
      break;
    case `Favorites`:
      filteredCards = filmsCards.render(getFavorites());
      break;
    default:
      break;
  }
  return filteredCards;
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
filters.onFilter = (filterName) => {
  clearContainer(filmsListContainerElement, `.film-card`);
  const filteredCards = filterFilmCards(filterName);
  addNodeListInContainer(filteredCards, filmsListContainerElement);
};
filters.render(filmsListContainerElement, filmCardNodeList);
