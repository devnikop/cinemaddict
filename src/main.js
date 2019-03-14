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
  film.onClick = () => {
    const filmDetails = new FilmDetails(filmCardData);
    const filmDetailsElement = filmDetails.render();
    document.body.appendChild(filmDetailsElement);
    filmDetails.onCloseClick = () => {
      filmDetailsElement.remove();
    };
  };
};

const createFilmCardList = (filmCardCount, notHasCardControls = false) => {
  let filmCardList = [];
  for (let i = 0; i < filmCardCount; i++) {
    const film = new FilmCard(filmCardData, notHasCardControls);
    createPopup(film);
    filmCardList[i] = film.render();
  }
  return filmCardList;
};

const addInContainer = (filmList, container) => {
  const fragment = document.createDocumentFragment();
  for (const film of filmList) {
    fragment.appendChild(film);
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

addInContainer(filmCardNodeList, filmsListContainerElement);
addInContainer(topRatedFilmList, topRatedContainerElement);
addInContainer(mostCommentedFilmList, mostCommentedContainerElement);

renderFilterList();
