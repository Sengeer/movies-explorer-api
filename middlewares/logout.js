const { RESPONSE_MESSAGE } = require('../utils/constants');

module.exports = (req, res, next) => {
  res
    .clearCookie('jwt', {
      httpOnly: true,
      sameSite: true,
    })
    .send({ message: RESPONSE_MESSAGE.UNAUTHORIZED });
};
