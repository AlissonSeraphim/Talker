const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;

function validateBodyObject(req, res, next) {
  const talkerWrite = req.body;
  const requiredProperties = ['name', 'age', 'talk'];
  const talkProperties = ['watchedAt', 'rate'];

  requiredProperties.forEach((property) => {
    if (!(property in talkerWrite)) {
      return res.status(BAD_REQUEST).send({ message: `O campo "${property}" é obrigatório` });
    }
  });

  const { talk } = talkerWrite;
  talkProperties.forEach((property) => {
    if (!(property in talk)) {
      return res.status(BAD_REQUEST).send({ message: `O campo "${property}" é obrigatório` });
    }
  });

  next();
}

function validName(req, res, next) {
  const { name } = req.body;

  // name
  const minNameLength = 3;
  if (!name) return res.status(BAD_REQUEST).send({ message: 'O campo "name" é obrigatório' });  
  if (name && name.length < minNameLength) {
    return res.status(BAD_REQUEST).send({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
  }

  next();
}

function validAge(req, res, next) {
  const { age } = req.body;

  const minAge = 18;
  const ageNumberMessage = 'O campo "age" deve ser um número inteiro igual ou maior que 18';
  if (!age) return res.status(BAD_REQUEST).send({ message: 'O campo "age" é obrigatório' });
  if (typeof age !== 'number' || age < minAge || !Number.isInteger(age)) { 
    return res.status(BAD_REQUEST).send({ message: ageNumberMessage }); 
  }

  next();
}

function validTalk(req, res, next) {
  const { talk } = req.body; 
  if (!talk) return res.status(BAD_REQUEST).send({ message: 'O campo "talk" é obrigatório' });
  
  next();
}

function validDate(req, res, next) {
  const { talk } = req.body;
  const { watchedAt } = talk;

  const dateRegex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  const dateIsValid = dateRegex.test(watchedAt);

  const dateInvalidMessage = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
  const watchedNeededMessage = 'O campo "watchedAt" é obrigatório';
  
  if (!dateIsValid) {
    return res.status(BAD_REQUEST).send({ message: dateInvalidMessage });
  }
  if (!watchedAt) {
    return res.status(BAD_REQUEST).send({ message: watchedNeededMessage });
  }
  next();
}

function validRate(req, res, next) {
  const { talk } = req.body;
  const { rate } = talk;

  const invalidRateMessage = 'O campo "rate" deve ser um número inteiro entre 1 e 5';
  const rateValidation = rate && rate >= 1 && rate <= 5 && Number.isInteger(rate);
  if (!rateValidation) {
    return res.status(BAD_REQUEST).send({ message: invalidRateMessage });
  }
  next();
}

function authToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
  } if (authorization && authorization.length !== 16) {
    return res.status(UNAUTHORIZED).json({ message: 'Token inválido' });
  }
  next();
}

module.exports = {
  validateBodyObject,
  authToken,
  validName,
  validAge,
  validTalk,
  validDate,
  validRate,
};