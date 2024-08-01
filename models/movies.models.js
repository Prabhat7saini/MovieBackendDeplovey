const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema
const movieSchema = new Schema({
  Title: { type: String, required: true },
  Year: { type: String, required: true },
  Rated: { type: String },
  Released: { type: String },
  Runtime: { type: String },
  Genre: { type: String },
  Director: { type: String },
  Writer: { type: String },
  Actors: { type: String },
  Plot: { type: String },
  Language: { type: String },
  Country: { type: String },
  Awards: { type: String },
  Poster: { type: String },
  commentIds: [{

    type: Schema.Types.ObjectId,
    ref: 'Comment',
    required: true

  }],
  Ratings: {
    type: Map,
    of: new Schema({
      Metascore: { type: String },
      imdbRating: { type: String },
      imdbVotes: { type: String },
      imdbID: { type: String },
      Type: { type: String },
      DVD: { type: String },
      BoxOffice: { type: String },
      Production: { type: String },
      Website: { type: String },
     
    }, { _id: false })
  }
});


const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
