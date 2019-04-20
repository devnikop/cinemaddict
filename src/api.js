import ModelCard from "./model_card";

const HttpStatus = {
  OK: 200,
  MultipleChoice: 300,
};

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

const checkStatus = (responce) => {
  if (responce.status >= HttpStatus.OK && responce.status < HttpStatus.MultipleChoice) {
    return responce;
  } else {
    throw new Error(`${responce.status}: ${responce.statusText}`);
  }
};

const toJSON = (responce) => responce.json();

export default class API {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  createCard({card}) {
    return this._load({
      url: `movies`,
      method: Method.POST,
      body: JSON.stringify(card),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON);
  }

  getCards() {
    return this._load({url: `movies`})
      .then(toJSON)
      .then(ModelCard.parseCards)
      .catch((error) => {
        throw error;
      });
  }

  updateCard({id, data}) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON)
      .then(ModelCard.parseCard)
      .catch((error) => {
        throw error;
      });
  }

  deleteCard({id}) {
    return this._load({
      url: `movies/${id}`,
      method: Method.DELETE
    });
  }

  syncCards(object) {
    return this._load({
      url: `movies/sync`,
      method: Method.POST,
      body: JSON.stringify(object.cards),
      headers: new Headers({'Content-Type': `application/json`})
    })
    .then(toJSON);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((error) => {
        throw error;
      });
  }
}


