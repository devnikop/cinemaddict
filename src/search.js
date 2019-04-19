import Component from "./component";

export default class Search extends Component {
  constructor() {
    super();

    this._searchInputElement = null;

    this._onSearchInput = this._onSearchInput.bind(this);
  }

  get template() {
    return `<input type="text" name="search" class="search__field" placeholder="Search">`;
  }

  set onSearch(cb) {
    this._onSearch = cb;
  }

  bind() {
    this._searchInputElement = this.element;

    this._searchInputElement.addEventListener(`input`, this._onSearchInput);
  }

  unbind() {
    this._searchInputElement.removeEventListener(`input`, this._onSearchInput);
  }

  _onSearchInput(evt) {
    if (typeof this._onSearch === `function`) {
      this._onSearch(evt.target.value);
    }
  }
}
