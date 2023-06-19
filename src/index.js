const express = require('express');

const app = express();
app.use(express.json());

const { readTalkerData } = require('./utils/fsUtils');

console.log(readTalkerData);

// Const Status
const OK = 200;

// Endpoints

app.get('/talker', async (req, res) => {
  const talkers = await readTalkerData();
  return res.status(OK).json(talkers);
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
