const express = require('express');
const crypto = require('crypto');

const { readTalkerData } = require('./utils/fsUtils');

const app = express();
app.use(express.json());

// Const Status
const OK = 200;
const NOT_FOUND = 404;

// Endpoints
app.get('/talker', async (req, res) => {
  const talkers = await readTalkerData();
  return res.status(OK).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalkerData();

  const idTalker = talkers.find((talker) => talker.id === Number(id));

  if (!idTalker) {
    return res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(OK).json(idTalker);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    //  Generate random token with crypto
    const randomToken = crypto.randomBytes(8).toString('hex');

    return res.status(OK).json({ token: randomToken });
  }

  return res.status(NOT_FOUND).json({ message: 'email or password not registered' });
});

// Para os Testes
const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
