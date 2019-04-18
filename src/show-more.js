import Component from "./component";

export class ShowMore extends Component {
  constructor() {
    super();

    this._showMoreButtonElement = null;

    this._onShowMore = null;

    this._onShowMoreClick = this._onShowMoreClick.bind(this);
  }

  get template() {
    return `<button class="films-list__show-more">Show more</button>`;
  }

  set onShowMore(cb) {
    this._onShowMore = cb;
  }

  bind() {
    this._showMoreButtonElement = this.element;

    this._showMoreButtonElement.addEventListener(`click`, this._onShowMoreClick);
  }

  unbind() {
    this._showMoreButtonElement.removeEventListener(`click`, this._onShowMoreClick);
  }

  _onShowMoreClick() {
    if (typeof this._onShowMore === `function`) {
      this._onShowMore();
    }
  }
}
