module.exports = (req, res, next) => {
  res
    .clearCookie('jwt', {
      httpOnly: true,
      sameSite: true,
    })
    .send({ message: 'Пользователь деавторизован' });
};
