import {filterRender} from './make-filter.js';
import {getRandomInt} from './util.js';

const FILM_COUNT_MIN = 2;
const FILM_COUNT_MAX = 5;

const mainNavigationContainerElement = document.querySelector(`.main-navigation`);
let tempFilterContainer = ``;
tempFilterContainer += filterRender(`All movies`);
tempFilterContainer += filterRender(`Watchlist`, getRandomInt(FILM_COUNT_MIN, FILM_COUNT_MAX));
tempFilterContainer += filterRender(`History`, getRandomInt(FILM_COUNT_MIN, FILM_COUNT_MAX));
tempFilterContainer += filterRender(`Favorites`, getRandomInt(FILM_COUNT_MIN, FILM_COUNT_MAX));

mainNavigationContainerElement.insertAdjacentHTML(`afterbegin`, tempFilterContainer);
