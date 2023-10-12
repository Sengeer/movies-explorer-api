const router = require('express').Router();
const { errors } = require('celebrate');
const {
  userCreateValidation,
  loginValidation,
} = require('../middlewares/validation');
const {
  createUser,
  login,
} = require('../controllers/users');
const logout = require('../middlewares/logout');
const auth = require('../middlewares/auth');
const { errorLogger } = require('../middlewares/logger');
const NotFoundError = require('../errors/not-found-err');

router.post(
  '/signup',
  userCreateValidation,
  createUser,
);
router.post(
  '/signin',
  loginValidation,
  login,
);

router.use(auth);

router.post(
  '/signout',
  logout,
);

router.use('/movies', require('./movies'));
router.use('/users', require('./users'));

router.all('*', (req, res, next) => {
  next(new NotFoundError('Некорректный путь'));
});

router.use(errorLogger);

router.use(errors());

module.exports = router;
