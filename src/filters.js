import {renderFilter} from './filter.js';
import {getRandomInt} from './util.js';

const FILM_COUNT_MIN = 1;
const FILM_COUNT_MAX = 7;

export default class Filters {
  _filterClickHandler(filmsListContainerElement, filmCardNodeList, evt) {
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
  }

  render(filmsListContainerElement, filmCardNodeList) {
    const mainNavigationContainerElement = document.querySelector(`.main-navigation`);
    let tempFilterContainer = ``;
    tempFilterContainer += renderFilter(`All movies`);
    tempFilterContainer += renderFilter(`Watchlist`, getRandomInt(FILM_COUNT_MIN, FILM_COUNT_MAX));
    tempFilterContainer += renderFilter(`History`, getRandomInt(FILM_COUNT_MIN, FILM_COUNT_MAX));
    tempFilterContainer += renderFilter(`Favorites`, getRandomInt(FILM_COUNT_MIN, FILM_COUNT_MAX));
    mainNavigationContainerElement.insertAdjacentHTML(`afterbegin`, tempFilterContainer);
    mainNavigationContainerElement.addEventListener(`click`, this._filterClickHandler.bind(null, filmsListContainerElement, filmCardNodeList));
  }
}
