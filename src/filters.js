import Filter from './filter';

const FilterMap = new Map([
  [`All movies`, `_allList`],
  [`Watchlist`, `_onWatchlist`],
  [`History`, `_watched`],
  [`Favorites`, `_favorites`],
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
      this._action = FilterMap.get(filter);
      if (typeof this._onFilter === `function`) {
        this._onFilter();
      }
    };
  }

  render() {
    const mainNavigationContainerElement = document.querySelector(`.main-navigation`);
    let tempFilterContainer = document.createDocumentFragment();
    [...FilterMap.keys()].forEach((filterName) => {
      this._action = FilterMap.get(filterName);
      const filteredCardCount = this[this._action].length;
      const filterComponent = new Filter(filterName, filteredCardCount);
      this._bindHandlers(filterComponent);
      tempFilterContainer.appendChild(filterComponent.render());
    });

    mainNavigationContainerElement.insertBefore(tempFilterContainer, mainNavigationContainerElement.firstChild);
  }
}
