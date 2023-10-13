const mongoose = require('mongoose');
const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const { ERROR_MESSAGE } = require('../utils/constants');

module.exports.getAllUserMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(ERROR_MESSAGE.COMMON.BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

module.exports.removeMovieById = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(ERROR_MESSAGE.MOVIE.NOT_FOUND);
      } else if (String(movie.owner) !== String(req.user._id)) {
        throw new ForbiddenError(ERROR_MESSAGE.MOVIE.FORBIDDEN);
      }
      return movie.deleteOne()
        .then((deletedMovie) => res.send({ data: deletedMovie }))
        .catch(next);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError(ERROR_MESSAGE.COMMON.BAD_REQUEST));
      } else {
        next(err);
      }
    });
};
