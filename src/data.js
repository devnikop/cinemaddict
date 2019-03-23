import {getRandomInt} from './util';
import moment from '../node_modules/moment';

const FilmCardMap = new Map([
  [`TITLE_COUNT`, 15],
  [`ORIGINAL_TITLE_COUNT`, 3],
  [`RATING_MIN`, 1],
  [`RATING_MAX`, 9],
  [`DURATION_MIN`, 60],
  [`DURATION_MAX`, 300],
  [`GENRE_COUNT`, 12],
  [`DESCRIPTION_COUNT`, 11],
  [`COMMENTS_MIN`, 0],
  [`COMMENTS_MAX`, 20],
]);


export const filmCard = {
  title: [
    `Avengers: Infinity War`,
    `Black Panther`,
    `Spider-Man: Homecoming`,
    `Captain America: Civil War`,
    `Venom`,
    `Aquaman`,
    `Spider-Man: Into the Spider-Verse`,
    `Wonder Woman`,
    `Logan`,
    `John Wick`,
    `Deadpool`,
    `The Hunger Games`,
    `The Hobbit: The Battle of the Five Armies`,
    `Batman v Superman: Dawn of Justice`,
    `Man of Steel`,
  ][Math.floor(Math.random() * FilmCardMap.get(`TITLE_COUNT`))],
  titleOriginal: [
    `Originaltitle`,
    `Originaltitle2`,
    `Originaltitle3`,
  ][Math.floor(Math.random() * FilmCardMap.get(`ORIGINAL_TITLE_COUNT`))],
  averageRating: getRandomInt(FilmCardMap.get(`RATING_MIN`), FilmCardMap.get(`RATING_MAX`)),
  userRating: getRandomInt(FilmCardMap.get(`RATING_MIN`), FilmCardMap.get(`RATING_MAX`)),
  country: `USA`,
  actorCast: [
    `Samuel L. Jackson`,
    `Catherine Keener`,
    `Sophia Bush`,
    `Somebody`,
    `Something`
  ],
  premiereDate: moment(`2015-05-14`).format(`YYYY-MM-DD`),
  duration: `${moment.duration(getRandomInt(FilmCardMap.get(`DURATION_MIN`), FilmCardMap.get(`DURATION_MAX`)), `m`).asMinutes()}`,
  genre: [
    `Action`,
    `Adventure`,
    `Animation`,
    `Comedy`,
    `Crime`,
    `Drama`,
    `Fantasy`,
    `History`,
    `Horror`,
    `Music`,
    `Sci-Fi`,
    `Sport`,
    `Thriller`
  ],
  ageLimit: 18,
  poster: `images/posters/blackmail.jpg`,
  description: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. `,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`,
  ][Math.floor(Math.random() * FilmCardMap.get(`DESCRIPTION_COUNT`))],
  comments: [
    {
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      author: `Tim Macoveev`,
      date: moment(`2019-03-18`).format(`YYYY-MM-DD`)
    },
    {
      text: `LCras aliquet varius magna, non porta ligula feugiat eget.`,
      author: `Nikolay`,
      date: moment(`2019-03-21`).format(`YYYY-MM-DD`)
    },
  ],
  isOnWatchlist: false,
  isWatched: true,
  isFavorite: false,
};
