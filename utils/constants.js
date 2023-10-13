module.exports.ERROR_MESSAGE = {
  MOVIE: {
    NOT_FOUND: 'Передан несуществующий id фильма',
    FORBIDDEN: 'Данный фильм отсутствует в вашем профиле',
  },
  USER: {
    NOT_FOUND: 'Пользователь по указанному id не найден',
    CONFLICT: 'Пользователь с таким e-mail уже существует',
    UNAUTHORIZED: 'Неправильные почта или пароль',
  },
  COMMON: {
    BAD_REQUEST: 'Переданы некорректные данные',
    UNAUTHORIZED: 'Необходима авторизация',
    INTERNAL_SERVER: 'На сервере произошла ошибка',
    NOT_FOUND: 'Некорректный путь',
  },
};

module.exports.RESPONSE_MESSAGE = {
  AUTHORIZED: 'Пользователь авторизован',
  UNAUTHORIZED: 'Пользователь деавторизован',
};
