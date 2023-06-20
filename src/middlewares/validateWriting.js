const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;

function validateWritingObject(req, res, next) {
  const talkerWrite = req.body;
  const requiredProperties = ['name', 'age', 'talk'];
  const talkProperties = ['watchedAt', 'rate'];

  requiredProperties.forEach((property) => {
    if (!(property in talkerWrite)) {
      return res.status(BAD_REQUEST).send({ message: `O campo "${property}" é obrigatório` });
    }
  })

  const { talk } = talkerWrite;

  talkProperties.forEach((property) => {
    if (!(property in talk)) {
      return res.status(BAD_REQUEST).send({ message: `O campo "${property}" é obrigatório` });
    }
  })

  next();
}

function validParams(req, res, next) {
  const { name, age, talk } = req.body;

  // name
  const minNameLength = 3;
  if (!name) return res.status(BAD_REQUEST).send({ message: 'O campo "name" é obrigatório' });  
  if (name && name.length < minNameLength) {
    return res.status(BAD_REQUEST).send({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
  }

  // Age
  const minAge = 18;
  const ageNumberMessage = 'O campo "age" deve ser um número inteiro igual ou maior que 18'
  if (!age) return res.status(BAD_REQUEST).send({ message: 'O campo "age" é obrigatório' })
  if (typeof age !== 'number' || age < minAge || !Number.isInteger(age)) { 
    return res.status(BAD_REQUEST).send({ message: ageNumberMessage }); 
  }

  // Talk
  if (!talk) return res.status(BAD_REQUEST).send({ message: 'O campo "talk" é obrigatório' })
  if (!talk.watchedAt) return res.status(BAD_REQUEST).send({ message: 'O campo "watchedAt" é obrigatório' })
  if (!talk.rate) return res.status(BAD_REQUEST).send({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' })

  const dateRegex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  const dateIsValid = dateRegex.test(talk.watchedAt);
  const dateInvalidMessage = 'O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\"';

  if (!dateIsValid) return res.status(BAD_REQUEST).send({ message: dateInvalidMessage })
  const invalidRateMessage = 'O campo "rate" deve ser um número inteiro entre 1 e 5';
  if (talk.rate < 1 || talk.rate > 5 || !Number.isInteger(talk.rate)) return res.status(BAD_REQUEST).send({ message: invalidRateMessage })

  next();
} 

function authToken(req, res, next) {
  const { authorization } = req.headers;

  if(!authorization) {
    return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
  } if (authorization && authorization.length !== 16) {
    return res.status(UNAUTHORIZED).json({ message: 'Token inválido' });
  }
  next();
}

module.exports = {
  validateWritingObject,
  authToken,
  validParams
}