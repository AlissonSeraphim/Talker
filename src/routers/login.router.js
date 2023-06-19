const express = require('express');
const crypto = require('crypto');

const { validateLogin } = require('../middlewares/validateLogin');

const router = express.Router();

// Const Status
const OK = 200;

router.post('/login', validateLogin, (req, res) => {  
  //  Generate random token with crypto
  const randomToken = crypto.randomBytes(8).toString('hex');

  return res.status(OK).json({ token: randomToken });
});

module.exports = router;