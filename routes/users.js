const router = require('express').Router();
const { userUpdateValidation } = require('../middlewares/validation');

const {
  getMyUserData,
  updateUser,
} = require('../controllers/users');

router.get(
  '/me',
  getMyUserData,
);
router.patch(
  '/me',
  userUpdateValidation,
  updateUser,
);

module.exports = router;
