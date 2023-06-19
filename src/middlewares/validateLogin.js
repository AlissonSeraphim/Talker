  const BAD_REQUEST = 400;
  
  function validateLogin(req, res, next) {
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = emailRegex.test(email);
    const minLength = 6;
    if (!email) {
      return res.status(BAD_REQUEST).send({ message: 'O campo "email" é obrigatório' });
    }
    if (!validEmail) {
      const invalidEmailMessage = 'O "email" deve ter o formato "email@email.com"';
      return res.status(BAD_REQUEST).send({ message: invalidEmailMessage });
    }
    if (!password) {
      return res.status(BAD_REQUEST).send({ message: 'O campo "password" é obrigatório' });
    } if (password.length < minLength) {
      const lengthMessage = 'O "password" deve ter pelo menos 6 caracteres';
      return res.status(BAD_REQUEST).send({ message: lengthMessage });
    }
    next();
  }

  module.exports = {
    validateLogin,
  };