import Filter from './filter';

export const FilterMap = new Map([
  [`All movies`, `_allList`],
  [`Watchlist`, `_onWatchlist`],
  [`History`, `_watched`],
  [`Favorites`, `_favorites`],
]);

export default class Filters {
  constructor(filmCardDataList) {
    this._data = filmCardDataList;

    this._filterComponent = [];
    this._currentFilter = null;

    this._onFilter = null;
    this._action = null;
  }

  get filterFilmCards() {
    return this[this._action];
  }

  get currentFilter() {
    return this._currentFilter;
  }

  get _allList() {
    return this._data;
  }

  get _onWatchlist() {
    return this._data.filter((currentCard) => currentCard.isOnWatchlist);
  }

  get _watched() {
    return this._data.filter((currentCard) => currentCard.isWatched);
  }

  get _favorites() {
    return this._data.filter((currentCard) => currentCard.isFavorite);
  }

  set onFilter(cb) {
    this._onFilter = cb;
  }

  _bindHandlers(filterComponent) {
    filterComponent.onFilter = (filter) => {
      this._currentFilter = filter;
      this._action = FilterMap.get(this._currentFilter);
      if (typeof this._onFilter === `function`) {
        this._onFilter();
      }
    };
  }

  render() {
    const mainNavigationContainerElement = document.querySelector(`.main-navigation`);
    const tempFilterContainer = document.createDocumentFragment();
    [...FilterMap.keys()].forEach((filterName) => {
      this._action = FilterMap.get(filterName);
      const filteredCardCount = this._action !== FilterMap.get(`All movies`) ? this[this._action].length : 0;
      const filterComponent = new Filter(filterName, filteredCardCount);
      this._filterComponent.push(filterComponent);
      this._bindHandlers(filterComponent);
      tempFilterContainer.appendChild(filterComponent.render());
    });

    mainNavigationContainerElement.insertBefore(tempFilterContainer, mainNavigationContainerElement.firstChild);
  }

  unrender() {
    this._filterComponent.forEach((currentFilter) => currentFilter.unrender());
  }
}
