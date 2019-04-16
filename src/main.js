import API from './api';
import {Provider} from './provider';
import {Store} from './store';
import FilmCards from './film-cards';
import Filters from './filters';
import Statistic from './statistic';
import {clearContainer, addNodeListInContainer, compare, setUserRank} from './util';
import _ from '../node_modules/lodash';

const END_POINT = ` https://es8-demo-srv.appspot.com/moowle`;
const AUTHORIZATION = `Basic dXNlckBwYXNzd29rZAo154`;
const CARDS_STORE_KEY = `cards-store-key`;
const TOP_RATED_FILM_COUNT = 2;
const MOST_COMMENTED_FILM_COUNT = 2;

const generateId = () => String(Date.now() + Math.random());

const filmsCommonContainerElement = document.querySelector(`.films`);
const filmsListContainerElement = filmsCommonContainerElement.querySelector(`.films-list .films-list__container`);
const topRatedContainerElement = filmsCommonContainerElement.querySelector(`.films-list__container--top-rated`);
const mostCommentedContainerElement = filmsCommonContainerElement.querySelector(`.films-list__container--most-commented`);

const api = new API(END_POINT, AUTHORIZATION);
const store = new Store({key: CARDS_STORE_KEY, storage: localStorage});
const provider = new Provider({api, store, cardId: generateId()});

provider.getCards()
  .then((cards) => {
    filmsListContainerElement.textContent = ``;
    const filmCardDataList = cards;

    const filmsCards = new FilmCards(provider);
    const filmCardNodeList = filmsCards.render(cards);

    filmsCards.onUserRank = () => {
      setUserRank(filmCardDataList);
    };

    const topRatedFilmDataList = _.cloneDeep(filmCardDataList);
    topRatedFilmDataList.sort(compare(`averageRating`));
    const topRatedFilmList = filmsCards.render(topRatedFilmDataList.slice(0, TOP_RATED_FILM_COUNT), false);

    const mostCommentedFilmDataList = _.cloneDeep(filmCardDataList);
    mostCommentedFilmDataList.sort(compare(`comments`));
    const mostCommentedFilmList = filmsCards.render(mostCommentedFilmDataList.slice(0, MOST_COMMENTED_FILM_COUNT), false);

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

    setUserRank(filmCardDataList);

    const statisticComponent = new Statistic(filmCardDataList);
    document.querySelector(`main`).appendChild(statisticComponent.render());
  })
  .catch((error) => {
    // eslint-disable-next-line
    console.error(`fetch error: ${error}`);
    filmsListContainerElement.textContent = `Something went wrong while loading movies. Check your connection or try again later`;
  });

window.addEventListener(`offline`, () => {
  document.title = `${document.title}[OFFLINE]`;
});
window.addEventListener(`online`, () => {
  document.title = document.title.split(`[OFFLINE]`)[0];
  provider.syncCards();
});
