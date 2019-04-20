import API from './api';
import Provider from './provider';
import Store from './store';
import FilmCards from './film-cards';
import Filters from './filters';
import Search from './search';
import ShowMore from './show-more';
import Statistic from './statistic';
import {addNodeListInContainer, compare, setUserRank} from './util';
import _ from '../node_modules/lodash';

const END_POINT = ` https://es8-demo-srv.appspot.com/moowle`;
const AUTHORIZATION = `Basic dXNlckBwYXNzd29rZAo153bsdfg7c`;
const CARDS_STORE_KEY = `cards-store-key`;
const TOP_RATED_FILM_COUNT = 2;
const MOST_COMMENTED_FILM_COUNT = 2;
const INITIAL_FILM_COUNT = 5;
const FILM_COUNT_STEP = 5;

const generateId = () => String(Date.now() + Math.random());

const getTopRatedFilmList = (filmCardDataList, filmsCardsComponent) => {
  filmCardDataList.sort(compare(`averageRating`));
  const topRatedFilmList = filmsCardsComponent.render(filmCardDataList.slice(0, TOP_RATED_FILM_COUNT), false);
  return topRatedFilmList;
};

const getMostCommentedFilmList = (filmCardDataList, filmsCardsComponent) => {
  filmCardDataList.sort(compare(`comments`));
  const mostCommentedFilmList = filmsCardsComponent.render(filmCardDataList.slice(0, MOST_COMMENTED_FILM_COUNT), false);
  return mostCommentedFilmList;
};

const addShowMoreComponent = (nodeList) => {
  if (typeof showMoreComponent !== `undefined`) {
    showMoreComponent.unrender();
    showMoreComponent = undefined;
  }
  if (nodeList.length > INITIAL_FILM_COUNT) {
    showMoreComponent = new ShowMore();
    filmsListWrapperElement.appendChild(showMoreComponent.render());
    let initialShownCount = INITIAL_FILM_COUNT;
    showMoreComponent.onShowMore = () => {
      const newNodeList = nodeList.slice(initialShownCount, initialShownCount + FILM_COUNT_STEP);
      addNodeListInContainer(newNodeList, filmsListContainerElement);
      initialShownCount += FILM_COUNT_STEP;
      if (initialShownCount >= nodeList.length) {
        showMoreComponent.unrender();
      }
    };
  }
};

const bindFilmCardsHandlers = (filmsCardsComponent, statisticComponent, filmCardDataList) => {
  filmsCardsComponent.onUserRank = () => {
    document.querySelector(`.profile__rating`).textContent = setUserRank(filmCardDataList);
  };

  filmsCardsComponent.onState = () => {
    addFiltersComponent(filmCardDataList, statisticComponent, filmsCardsComponent);
  };

  filmsCardsComponent.onUpdateContainer = (currentAction, currentId) => {
    if (activeFilter === currentAction) {
      filmsListContainerElement.textContent = ``;
      updatedDataList = updatedDataList.filter((currentNode) => currentNode.id !== currentId);
      const updatedCardNodeList = filmsCardsComponent.render(updatedDataList);
      addNodeListInContainer(updatedCardNodeList.slice(0, INITIAL_FILM_COUNT), filmsListContainerElement);
      addShowMoreComponent(updatedCardNodeList);
    }
  };
};

const addSearchComponent = (filmCardDataList, filmsCardsComponent, filmsListContainerElement) => {
  const searchComponent = new Search();
  searchComponent.onSearch = (value) => {
    const filteredDataList = filmCardDataList.filter((currentCard) => {
      return currentCard.title.toLowerCase().includes(value);
    });
    const filteredCardNodeList = filmsCardsComponent.render(filteredDataList);
    filmsListContainerElement.textContent = ``;
    addNodeListInContainer(filteredCardNodeList.slice(0, INITIAL_FILM_COUNT), filmsListContainerElement);
    addShowMoreComponent(filteredCardNodeList);
  };
  document.querySelector(`.search`).appendChild(searchComponent.render());
};

const addUserRank = (filmCardDataList) => {
  document.querySelector(`.profile__rating`).textContent = setUserRank(filmCardDataList);
};

const addFooterStatistic = (filmCardDataList) => {
  document.querySelector(`.footer__statistics p`).textContent = `${filmCardDataList.length} movies inside`;
};

const addStatisticComponent = (filmCardDataList) => {
  const statisticComponent = new Statistic(filmCardDataList);
  statisticComponent.calculateUserRank(filmCardDataList);
  statisticComponent.countSimilarGenres();
  statisticComponent.getStatistic();
  document.querySelector(`main`).appendChild(statisticComponent.render());
  return statisticComponent;
};

const addFiltersComponent = (filmCardDataList, statisticComponent, filmsCardsComponent) => {
  if (typeof filtersComponent !== `undefined`) {
    filtersComponent.unrender();
    filtersComponent = undefined;
  }
  filtersComponent = new Filters(filmCardDataList);
  filtersComponent.onFilter = () => {
    filmsContainerElement.classList.remove(`visually-hidden`);
    statisticComponent.element.classList.add(`visually-hidden`);
    filmsListContainerElement.textContent = ``;
    const filteredDataList = filtersComponent.filterFilmCards;
    updatedDataList = filteredDataList;
    activeFilter = filtersComponent.currentFilter;
    const filteredCards = filmsCardsComponent.render(filteredDataList);
    addNodeListInContainer(filteredCards.slice(0, INITIAL_FILM_COUNT), filmsListContainerElement);
    addShowMoreComponent(filteredCards);
  };
  filtersComponent.render();
};

const filmsContainerElement = document.querySelector(`.films`);
const filmsListWrapperElement = filmsContainerElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsContainerElement.querySelector(`.films-list .films-list__container`);
const topRatedContainerElement = filmsContainerElement.querySelector(`.films-list__container--top-rated`);
const mostCommentedContainerElement = filmsContainerElement.querySelector(`.films-list__container--most-commented`);

const api = new API(END_POINT, AUTHORIZATION);
const store = new Store({key: CARDS_STORE_KEY, storage: localStorage});
const provider = new Provider({api, store, cardId: generateId()});

let showMoreComponent;
let filtersComponent;
let activeFilter;
let updatedDataList;

provider.getCards()
  .then((cards) => {
    filmsListContainerElement.textContent = ``;
    const filmCardDataList = cards;

    const statisticComponent = addStatisticComponent(filmCardDataList);

    const filmsCardsComponent = new FilmCards(provider);
    const filmCardNodeList = filmsCardsComponent.render(filmCardDataList);
    bindFilmCardsHandlers(filmsCardsComponent, statisticComponent, filmCardDataList);

    addFiltersComponent(filmCardDataList, statisticComponent, filmsCardsComponent);

    addNodeListInContainer(filmCardNodeList.slice(0, INITIAL_FILM_COUNT), filmsListContainerElement);
    addShowMoreComponent(filmCardNodeList);
    const topRatedFilmList = getTopRatedFilmList(_.cloneDeep(filmCardDataList), filmsCardsComponent);
    addNodeListInContainer(topRatedFilmList, topRatedContainerElement);
    const mostCommentedFilmList = getMostCommentedFilmList(_.cloneDeep(filmCardDataList), filmsCardsComponent);
    addNodeListInContainer(mostCommentedFilmList, mostCommentedContainerElement);

    addSearchComponent(filmCardDataList, filmsCardsComponent, filmsListContainerElement);
    addUserRank(filmCardDataList);
    addFooterStatistic(filmCardDataList);
  })
  .catch(() => {
    filmsListContainerElement.textContent = `Something went wrong while loading movies. Check your connection or try again later`;
  });

window.addEventListener(`offline`, () => {
  document.title = `${document.title}[OFFLINE]`;
});
window.addEventListener(`online`, () => {
  document.title = document.title.split(`[OFFLINE]`)[0];
  provider.syncCards();
});
