export default class ModelCard {
  constructor(data) {
    this.id = data[`id`];

    this.actorCast = data[`film_info`][`actors`];
    this.ageLimit = data[`film_info`][`age_rating`];
    this.titleOriginal = data[`film_info`][`alternative_title`];
    this.description = data[`film_info`][`description`];
    this.director = data[`film_info`][`director`];
    this.genre = data[`film_info`][`genre`];
    this.poster = data[`film_info`][`poster`];
    this.premiereDate = data[`film_info`][`release`][`date`];
    this.country = data[`film_info`][`release`][`release_country`];
    this.duration = data[`film_info`][`runtime`];
    this.title = data[`film_info`][`title`];
    this.averageRating = data[`film_info`][`total_rating`];
    this.writers = data[`film_info`][`writers`];

    this.comments = [];
    this.comments.push(data[`comments`].map((comment) => {
      return {
        author: comment.author,
        comment: comment.comment,
        date: comment.date,
        emotion: comment.emotion,
      };
    }));
    this.comments = this.comments[0];

    this.isWatched = data[`user_details`][`already_watched`];
    this.isFavorite = data[`user_details`][`favorite`];
    this.isOnWatchlist = data[`user_details`][`watchlist`];
    this.userRating = data[`user_details`][`personal_rating`];
  }

  toRAW() {
    return {
      'id': this.id,

      'film_info': {
        'actors': this.actorCast,
        'age_rating': this.ageLimit,
        'alternative_title': this.titleOriginal,
        'description': this.description,
        'director': this.director,
        'genre': this.genre,
        'poster': this.poster,
        'release': {
          'date': this.premiereDate,
          'release_country': this.country,
        },
        'runtime': this.duration,
        'title': this.title,
        'total_rating': this.averageRating,
        'writers': this.writers,
      },

      'comments': this.comments,
      'user_details': {
        'already_watched': this.isWatched,
        'favorite': this.isFavorite,
        'watchlist': this.isOnWatchlist,
        'personal_rating': this.userRating,
      },
    };
  }

  static parseCard(data) {
    return new ModelCard(data);
  }

  static parseCards(data) {
    return data.map(ModelCard.parseCard);
  }
}
