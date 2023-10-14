const router = require('express').Router();
const {
  movieCreateValidation,
  movieRemoveValidation,
} = require('../middlewares/validation');

const {
  getAllUserMovies,
  createMovie,
  removeMovieById,
} = require('../controllers/movies');

router.get(
  '/',
  getAllUserMovies,
);
router.post(
  '/',
  movieCreateValidation,
  createMovie,
);
router.delete(
  '/:movieId',
  movieRemoveValidation,
  removeMovieById,
);

module.exports = router;
