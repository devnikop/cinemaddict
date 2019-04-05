import Component from "./component";

export default class Filter extends Component {
  constructor(filterName, filmCount) {
    super();

    this._name = filterName;
    this._filmCount = filmCount;

    this._onFilter = null;

    this._onFilterClick = this._onFilterClick.bind(this);
  }

  get template() {
    return `<a href="#${this._name}" class="main-navigation__item make-navigation__item--js">${this._name}
      ${this._filmCount === 0 ? `` : `<span class="main-navigation__item-count">${this._filmCount}</span>`}
    </a>`;
  }

  set onFilter(cb) {
    this._onFilter = cb;
  }

  bind() {
    this.element.addEventListener(`click`, this._onFilterClick);
  }

  unbind() {
    this.element.removeEventListener(`click`, this._onFilterClick);
  }

  _onFilterClick(evt) {
    evt.preventDefault();
    if (typeof this._onFilter === `function`) {
      this._onFilter(this._name);
    }
  }
}
