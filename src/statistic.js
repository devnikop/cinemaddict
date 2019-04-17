import Component from './component';
import Chart from '../node_modules/chart.js';
import ChartDataLabels from '../node_modules/chartjs-plugin-datalabels';
import moment from '../node_modules/moment';
import {setUserRank} from './util';

const BAR_HEIGHT = 50;

const FilterMap = new Map([
  [`all-time`, `_allList`],
  [`today`, `_todayList`],
  [`week`, `_weekList`],
  [`month`, `_monthList`],
  [`year`, `_yearList`],
]);

export default class Statistic extends Component {
  constructor(data) {
    super();

    this._data = data;
    this._userRank = ``;
    this._genres = {};
    this._watchedCount = 0;
    this._totalDuration = 0;
    this._topGenre = 0;
    this._currentTarget = `all-time`;

    this._statisticButtonElement = null;
    this._filtersContainerElement = null;

    this._onStatisticClick = this._onStatisticClick.bind(this);
    this._onFiltersChange = this._onFiltersChange.bind(this);
  }

  get template() {
    return `
    <section class="statistic visually-hidden">
      <p class="statistic__rank">Your rank <span class="statistic__rank-label">${this._userRank}</span></p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>
        ${[...FilterMap.keys()].map((currentFilter) => `
          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter"
            id="statistic-${currentFilter}" value="${currentFilter}" ${currentFilter === this._currentTarget ? `checked` : ``}>
          <label for="statistic-${currentFilter}" class="statistic__filters-label">${currentFilter.replace(`-`, ` `)}</label>
        `.trim()).join(` `)}
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${this._watchedCount} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">
            ${Math.floor(moment.duration(this._totalDuration, `m`).asHours())}<span class="statistic__item-description">h</span>
            ${moment.duration(this._totalDuration, `m`).minutes()}<span class="statistic__item-description">m</span>
          </p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${this._topGenre}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`.trim();
  }

  get _allList() {
    return this._data;
  }

  get _todayList() {
    return this._data.filter((currentCard) => moment().isSame(currentCard.watchingDate, `day`));
  }

  get _weekList() {
    return this._data.filter((currentCard) => moment().isSame(currentCard.watchingDate, `week`));
  }

  get _monthList() {
    return this._data.filter((currentCard) => moment().isSame(currentCard.watchingDate, `month`));
  }

  get _yearList() {
    return this._data.filter((currentCard) => moment().isSame(currentCard.watchingDate, `year`));
  }

  calculateUserRank(data) {
    this._userRank = setUserRank(data);
  }

  countSimilarGenres(data = this._data) {
    this._genres = {};
    data.forEach((currentCard) => {
      currentCard.genre.forEach((currentGenre) => {
        this._genres[currentGenre] = (this._genres[currentGenre] || 0) + 1;
      });
    });
  }

  getStatistic(data = this._data) {
    this._watchedCount = 0;
    this._totalDuration = 0;
    data.forEach((currentCard) => {
      if (currentCard.isWatched) {
        this._watchedCount++;
        this._totalDuration += +currentCard.duration;
      }

      const genreMax = Math.max(...Object.values(this._genres));
      this._topGenre = Object.keys(this._genres).find((key) => this._genres[key] === genreMax);
    });
  }

  _createStatistics() {
    const statisticCtxElement = this.element.querySelector(`.statistic__chart`);
    statisticCtxElement.height = BAR_HEIGHT * [...Object.keys(this._genres)].length;
    return new Chart(statisticCtxElement, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: [...Object.keys(this._genres)],
        datasets: [{
          data: [...Object.values(this._genres)],
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 24
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });
  }

  bind() {
    this._statisticButtonElement = document.querySelector(`.main-navigation__item--additional`);
    this._filtersContainerElement = this.element.querySelector(`.statistic__filters`);

    this._statisticButtonElement.addEventListener(`click`, this._onStatisticClick);
    this._filtersContainerElement.addEventListener(`change`, this._onFiltersChange);
  }

  unbind() {
    this._statisticButtonElement.removeEventListener(`click`, this._onStatisticClick);
    this._filtersContainerElement.removeEventListener(`change`, this._onFiltersChange);
  }

  _onStatisticClick(evt) {
    evt.preventDefault();
    document.querySelector(`.films`).classList.add(`visually-hidden`);
    this.element.classList.remove(`visually-hidden`);
    this.countSimilarGenres();
    this._createStatistics();
  }

  _onFiltersChange(evt) {
    this._currentTarget = evt.target.value;
    this._action = FilterMap.get(this._currentTarget);
    this._dataRange = this[this._action];
    this.countSimilarGenres(this._dataRange);
    this.getStatistic(this._dataRange);
    this.calculateUserRank(this._dataRange);
    const currentStatistic = this.element;
    document.querySelector(`main`).replaceChild(this.render(), currentStatistic);
    this.element.classList.remove(`visually-hidden`);
    this._createStatistics();
  }
}
