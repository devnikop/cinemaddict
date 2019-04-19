import {objectToArray} from "./util";
import ModelCard from "./model_card";

export default class Provider {
  constructor({api, store, cardId}) {
    this._api = api;
    this._store = store;
    this._cardId = cardId;
    this._needSync = false;
  }

  createCard({card}) {
    if (Provider.isOnline()) {
      return this._api.createCard({card})
      .then((currentCard) => {
        this._store.setItem({key: currentCard.id, item: currentCard.toRAW()});
        return currentCard;
      });
    } else {
      card.id = this._cardId;
      this._needSync = true;

      this._store.setItem({key: card.id, item: card});
      return Promise.resolve(ModelCard.parseCard(card));
    }
  }

  getCards() {
    if (Provider.isOnline()) {
      return this._api.getCards()
      .then((cards) => {
        cards.map((it) => this._store.setItem({key: it.id, item: it.toRAW()}));
        return cards;
      });
    } else {
      const rawCardsMap = this._store.getAll();
      const rawCards = objectToArray(rawCardsMap);
      const cards = ModelCard.parseCards(rawCards);

      return Promise.resolve(cards);
    }
  }

  updateCard({id, data}) {
    if (Provider.isOnline()) {
      return this._api.updateCard({id, data})
      .then((card) => {
        this._store.setItem({key: card.id, item: card.toRAW()});
        return card;
      });
    } else {
      const card = data;
      this._needSync = true;
      this._store.setItem({key: card.id, item: card});
      return Promise.resolve(ModelCard.parseCard(card));
    }
  }

  deleteCard({id}) {
    if (Provider.isOnline()) {
      return this._api.deleteCard({id})
      .then(() => {
        this._store.removeItem({key: id});
      });
    } else {
      this._needSync = true;
      this._store.removeItem({key: id});
      return Promise.resolve(true);
    }
  }

  syncCards() {
    return this._api.syncCards({cards: objectToArray(this._store.getAll())});
  }

  static isOnline() {
    return window.navigator.onLine;
  }
}
