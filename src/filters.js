import Filter from './filter';
import {getRandomInt} from './util';

const FILM_COUNT_MIN = 1;
const FILM_COUNT_MAX = 7;

const FilterName = new Set([
  `All movies`,
  `Watchlist`,
  `History`,
  `Favorites`,
]);

export default class Filters {
  constructor() {
    this._onFilter = null;
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  _bindHandlers(filterComponent) {
    filterComponent.onFilter = (filterName) => {
      this._onFilter(filterName);
    };
  }

  render() {
    const mainNavigationContainerElement = document.querySelector(`.main-navigation`);
    let tempFilterContainer = document.createDocumentFragment();
    for (let i = 0; i < FilterName.size; i++) {
      const filterComponent = new Filter([...FilterName][i], getRandomInt(FILM_COUNT_MIN, FILM_COUNT_MAX));
      this._bindHandlers(filterComponent);
      tempFilterContainer.appendChild(filterComponent.render());
    }

    mainNavigationContainerElement.insertBefore(tempFilterContainer, mainNavigationContainerElement.firstChild);
  }
}
