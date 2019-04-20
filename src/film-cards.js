import FilmCard from './film-card';
import FilmDetails from './film-details';
import _ from '../node_modules/lodash';

export default class FilmCards {
  constructor(api) {
    this._api = api;

    this._onUserRank = null;
    this._onState = null;
    this._onUpdateContainer = null;

    this._watchlistLabelElement = ``;
    this._watchedLabelElement = ``;
    this._favoritesLabelElement = ``;
    this._commentInputElement = ``;
    this._ratingsContainerElement = ``;
    this._ratingInputElements = ``;
  }

  set onUserRank(cb) {
    this._onUserRank = cb;
  }

  set onState(cb) {
    this._onState = cb;
  }

  set onUpdateContainer(cb) {
    this._onUpdateContainer = cb;
  }

  _updateFilters() {
    if (typeof this._onState === `function`) {
      this._onState();
    }
  }

  _blockForm(filmDetailsComponent) {
    this._watchlistLabelElement = filmDetailsComponent.element.querySelector(`.film-details__control-label--watchlist`);
    this._watchlistLabelElement.style.pointerEvents = `none`;
    this._watchedLabelElement = filmDetailsComponent.element.querySelector(`.film-details__control-label--watched`);
    this._watchedLabelElement.style.pointerEvents = `none`;
    this._favoritesLabelElement = filmDetailsComponent.element.querySelector(`.film-details__control-label--favorite`);
    this._favoritesLabelElement.style.pointerEvents = `none`;

    this._commentInputElement = filmDetailsComponent.element.querySelector(`.film-details__comment-input`);
    this._commentInputElement.style.border = `1px solid black`;
    this._commentInputElement.classList.remove(`shake`);
    this._commentInputElement.disabled = true;

    this._ratingsContainerElement = filmDetailsComponent.element.querySelector(`.film-details__user-rating-score`);
    this._ratingsContainerElement.style.border = `1px solid transparent`;
    this._ratingsContainerElement.classList.remove(`shake`);
    this._ratingInputElements = filmDetailsComponent.element.querySelectorAll(`.film-details__user-rating-label`);
    for (const element of this._ratingInputElements) {
      element.style.pointerEvents = `none`;
    }
  }

  _unblockForm() {
    this._watchlistLabelElement.style.pointerEvents = `auto`;
    this._watchedLabelElement.style.pointerEvents = `auto`;
    this._favoritesLabelElement.style.pointerEvents = `auto`;

    this._commentInputElement.disabled = false;
    this._commentInputElement.classList.add(`shake`);
    this._commentInputElement.style.border = `1px solid red`;

    this._ratingsContainerElement.classList.add(`shake`);
    this._ratingsContainerElement.style.border = `1px solid red`;
    for (const element of this._ratingInputElements) {
      element.style.pointerEvents = `auto`;
    }
  }

  _bindFilmDetailsHandlers(filmDetailsComponent, filmComponent, currentFilmCardData) {
    const _updateDetails = ({newData, eventType = ``, action, newState}) => {
      Object.assign(currentFilmCardData, newData);
      this._api.updateCard({id: currentFilmCardData.id, data: currentFilmCardData.toRAW()})
        .then((newCard) => {
          const currentFilmDetails = filmDetailsComponent.element;
          filmDetailsComponent.update(currentFilmCardData);
          document.body.replaceChild(filmDetailsComponent.render(), currentFilmDetails);
          const updatedCurrentData = Object.assign(currentFilmCardData, newCard);
          this._onUpdateContainer(action, newCard.id);
          filmComponent.update(_.cloneDeep(updatedCurrentData));
          if (!newState) {
            filmComponent = null;
          }
        })
        .then(() => {
          if (eventType === `onCommentEnter`) {
            filmDetailsComponent.element.querySelector(`.film-details__watched-status`).textContent = `Comment added`;
            filmDetailsComponent.element.querySelector(`.film-details__watched-reset`).classList.remove(`visually-hidden`);
          } else if (eventType === `onCommentReset`) {
            filmDetailsComponent.element.querySelector(`.film-details__watched-status`).textContent = `Comment deleted`;
            filmDetailsComponent.element.querySelector(`.film-details__watched-reset`).classList.add(`visually-hidden`);
          }
        })
        .catch(() => {
          this._unblockForm();
        });
    };

    filmDetailsComponent.onClose = () => {
      filmDetailsComponent.unrender();
      if (filmComponent) {
        filmComponent.update(_.cloneDeep(currentFilmCardData));
        const currentFilmCard = filmComponent.element;
        document.querySelector(`.films-list__container`).replaceChild(filmComponent.render(), currentFilmCard);
      }
    };

    filmDetailsComponent.onCommentEnter = (newData) => {
      this._blockForm(filmDetailsComponent);
      _updateDetails({newData, eventType: `onCommentEnter`});
    };

    filmDetailsComponent.onUserRatingClick = (newData) => {
      this._blockForm(filmDetailsComponent);
      _updateDetails({newData});
    };

    filmDetailsComponent.onAddToWatchList = (newData) => {
      this._blockForm(filmDetailsComponent);
      Promise.resolve(_updateDetails({newData, action: `Watchlist`, newState: newData.isOnWatchlist}))
      .then(() => this._updateFilters());

    };

    filmDetailsComponent.onMarkAsWatched = (newData) => {
      this._blockForm(filmDetailsComponent);
      Promise.resolve(_updateDetails({newData, action: `History`, newState: newData.isWatched}))
      .then(() => this._updateFilters());
      if (typeof this._onUserRank === `function`) {
        this._onUserRank();
      }
    };

    filmDetailsComponent.onAddToFavorite = (newData) => {
      this._blockForm(filmDetailsComponent);
      Promise.resolve(_updateDetails({newData, action: `Favorites`, newState: newData.isFavorite}))
      .then(() => this._updateFilters());
    };

    filmDetailsComponent.onCommentReset = () => {
      this._blockForm(filmDetailsComponent);
      currentFilmCardData.comments.pop();
      _updateDetails({currentFilmCardData, eventType: `onCommentReset`});
    };
  }

  _bindFilmCardHandlers(filmComponent, currentFilmCardData) {
    const _updateData = (action) => {
      this._api.updateCard({id: currentFilmCardData.id, data: currentFilmCardData.toRAW()})
        .then((newCard) => {
          this._onUpdateContainer(action, newCard.id);
          const updatedCurrentData = Object.assign(currentFilmCardData, newCard);
          filmComponent.update(_.cloneDeep(updatedCurrentData));
        });
    };

    filmComponent.onAddToWatchList = (newState) => {
      currentFilmCardData.isOnWatchlist = newState;
      Promise.resolve(_updateData(`Watchlist`))
      .then(() => this._updateFilters());
    };
    filmComponent.onMarkAsWatched = (newState) => {
      currentFilmCardData.isWatched = newState;
      Promise.resolve(_updateData(`History`))
      .then(() => this._updateFilters());
      if (typeof this._onUserRank === `function`) {
        this._onUserRank();
      }
    };
    filmComponent.onAddToFavorite = (newState) => {
      currentFilmCardData.isFavorite = newState;
      Promise.resolve(_updateData(`Favorites`))
      .then(() => this._updateFilters());
    };
  }

  _bindDetails(filmComponent, currentFilmCardData) {
    let filmDetailsComponent;
    filmComponent.onCommentsClick = () => {
      if (typeof filmDetailsComponent !== `undefined`) {
        filmDetailsComponent.unrender();
        filmDetailsComponent = undefined;
      }
      filmDetailsComponent = new FilmDetails(_.cloneDeep(currentFilmCardData));
      const filmDetailsNode = filmDetailsComponent.render();
      this._bindFilmDetailsHandlers(filmDetailsComponent, filmComponent, currentFilmCardData);
      document.body.appendChild(filmDetailsNode);
    };
    this._bindFilmCardHandlers(filmComponent, currentFilmCardData);
  }

  render(filmCardDataList, controls = true) {
    const filmCardList = [];
    for (const currentFilmCardData of filmCardDataList) {
      const filmComponent = new FilmCard(_.cloneDeep(currentFilmCardData), controls);
      filmCardList.push(filmComponent.render());
      this._bindDetails(filmComponent, currentFilmCardData);
    }
    return filmCardList;
  }
}
