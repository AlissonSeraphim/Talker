const BAD_REQUEST = 400;
// const OK = 200;

function validateSearch(req, res, next) {
  const { rate } = req.query;
  const rateInvalidMessage = 'O campo "rate" deve ser um número inteiro entre 1 e 5';

  if (rate && (!Number.isInteger(Number(rate)) || rate < 1 || rate > 5)) {
    return res.status(BAD_REQUEST).json({ message: rateInvalidMessage });
  }
  
  next();
}

module.exports = {
  validateSearch,
};