import ModelCard from "./model_card";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

const checkStatus = (responce) => {
  if (responce.status >= 200 && responce.status < 300) {
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

  getCards() {
    return this._load({url: `movies`})
      .then(toJSON)
      .then(ModelCard.parseCards);
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
        // eslint-disable-next-line no-console
        console.error(`fetch error: ${error}`);
        throw error;
      });
  }

  deleteCard({id}) {
    return this._load({
      url: `movies/${id}`,
      method: Method.DELETE
    });
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(`fetch error: ${error}`);
        throw error;
      });
  }
}

