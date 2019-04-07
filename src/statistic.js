import Component from './component';
import Chart from '../node_modules/chart.js';
import ChartDataLabels from '../node_modules/chartjs-plugin-datalabels';
import moment from '../node_modules/moment';

const BAR_HEIGHT = 50;

export default class Statistic extends Component {
  constructor(data) {
    super();

    this._data = data;
    this._genres = {};
    this._watchedCount = 0;
    this._totalDuration = 0;
    this._topGenre = 0;

    this._statisticButtonElement = null;

    this._onStatisticClick = this._onStatisticClick.bind(this);
  }

  get template() {
    this._createGenresObject();
    this._getStatistic();
    return `
    <section class="statistic visually-hidden">
      <p class="statistic__rank">Your rank <span class="statistic__rank-label">Sci-Fighter</span></p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters visually-hidden">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${this._watchedCount} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${moment.duration(this._totalDuration, `m`).hours()}<span class="statistic__item-description">h</span> ${moment.duration(this._totalDuration, `m`).minutes()} <span class="statistic__item-description">m</span></p>
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

  _createGenresObject() {
    this._genres = {};
    this._data.forEach((currentCard) => {
      currentCard.genre.forEach((currentGenre) => {
        this._genres[currentGenre] = (this._genres[currentGenre] || 0) + 1;
      });
    });
  }

  _getStatistic() {
    this._data.forEach((currentCard) => {
      if (currentCard.isWatched) {
        this._watchedCount++;
        this._totalDuration += +currentCard.duration;
      }

      const genreMax = Math.max(...Object.values(this._genres));
      this._topGenre = Object.keys(this._genres).find((key) => this._genres[key] === genreMax);
    });
  }

  _createStatistics() {
    this._createGenresObject();
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
    this._statisticButtonElement.addEventListener(`click`, this._onStatisticClick);
  }

  unbind() {
    this._statisticButtonElement.removeEventListener(`click`, this._onStatisticClick);
  }

  _onStatisticClick(evt) {
    evt.preventDefault();
    document.querySelector(`.films`).classList.add(`visually-hidden`);
    this.element.classList.remove(`visually-hidden`);
    this._createStatistics();
  }
}
