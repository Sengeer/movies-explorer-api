const router = require('express').Router();
const {
  movieCreateValidation,
  movieRemoveValidation,
} = require('../middlewares/validation');

const {
  getAllMovies,
  createMovie,
  removeMovieById,
} = require('../controllers/movies');

router.get(
  '/',
  getAllMovies,
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
