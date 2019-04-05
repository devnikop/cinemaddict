import Filter from './filter';

const filterMap = new Map([
  [`All movies`, `_getAllList`],
  [`Watchlist`, `_getOnWatchlist`],
  [`History`, `_getWatched`],
  [`Favorites`, `_getFavorites`],
]);

export default class Filters {
  constructor(filmCardDataList) {
    this._data = filmCardDataList;

    this._onFilter = null;
    this._action = null;
  }

  get filterFilmCards() {
    return this[this._action];
  }

  get _getAllList() {
    return this._data;
  }

  get _getOnWatchlist() {
    return this._data.filter((currentCard) => currentCard.isOnWatchlist);
  }

  get _getWatched() {
    return this._data.filter((currentCard) => currentCard.isWatched);
  }

  get _getFavorites() {
    return this._data.filter((currentCard) => currentCard.isFavorite);
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  _bindHandlers(filterComponent) {
    filterComponent.onFilter = (filter) => {
      this._action = filterMap.get(filter);
      if (typeof this._onFilter === `function`) {
        this._onFilter();
      }
    };
  }

  render() {
    const mainNavigationContainerElement = document.querySelector(`.main-navigation`);
    let tempFilterContainer = document.createDocumentFragment();

    [...filterMap.keys()].forEach((filterName) => {
      this._action = filterMap.get(filterName);
      const filteredCardCount = this[this._action].length;
      const filterComponent = new Filter(filterName, filteredCardCount);
      this._bindHandlers(filterComponent);
      tempFilterContainer.appendChild(filterComponent.render());
    });

    mainNavigationContainerElement.insertBefore(tempFilterContainer, mainNavigationContainerElement.firstChild);
  }
}
