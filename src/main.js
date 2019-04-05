import API from './api';
import FilmCards from './film-cards';
import Filters from './filters';
import Statistic from './statistic';
import {clearContainer, addNodeListInContainer} from './util';

const END_POINT = ` https://es8-demo-srv.appspot.com/moowle`;
const AUTHORIZATION = `Basic dXNlckBwYXNzd29rZAo=${Math.random()}`;
const TOP_RATED_FILM_COUNT = 2;
const MOST_COMMENTED_FILM_COUNT = 2;

const filmsCommonContainerElement = document.querySelector(`.films`);
const filmsListContainerElement = filmsCommonContainerElement.querySelector(`.films-list .films-list__container`);
const topRatedContainerElement = filmsCommonContainerElement.querySelector(`.films-list__container--top-rated`);
const mostCommentedContainerElement = filmsCommonContainerElement.querySelector(`.films-list__container--most-commented`);

let filmCardDataList = [];
let filmsCards = ``;
const api = new API(END_POINT, AUTHORIZATION);
api.getCards()
  .then((cards) => {
    filmsListContainerElement.textContent = ``;
    filmCardDataList = cards;

    filmsCards = new FilmCards(api);
    const filmCardNodeList = filmsCards.render(cards);

    // NEED TO IMPLEMENT TOP RATED & MOST COMMENTED
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

    addNodeListInContainer(filmCardNodeList, filmsListContainerElement);
    addNodeListInContainer(topRatedFilmList, topRatedContainerElement);
    addNodeListInContainer(mostCommentedFilmList, mostCommentedContainerElement);

    const filters = new Filters(filmCardDataList);
    filters.onFilter = () => {
      filmsCommonContainerElement.classList.remove(`visually-hidden`);
      statisticComponent.element.classList.add(`visually-hidden`);
      clearContainer(filmsListContainerElement, `.film-card`);
      const filteredDataList = filters.filterFilmCards;
      const filteredCards = filmsCards.render(filteredDataList);
      addNodeListInContainer(filteredCards, filmsListContainerElement);
    };
    filters.render();

    const statisticComponent = new Statistic(filmCardDataList);
    document.querySelector(`main`).appendChild(statisticComponent.render());
  })
  .catch(() => {
    filmsListContainerElement.textContent = `Something went wrong while loading movies. Check your connection or try again later`;
  });
