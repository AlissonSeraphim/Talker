const express = require('express');
const { readTalkerData, writeNewTalkerData, changeAllTalkerData } = require('../utils/fsUtils');
const { 
  validateBodyObject, 
  authToken, 
  validName, 
  validAge, 
  validTalk,
  validDate,
  validRate } = require('../middlewares/validateWriting');

const router = express.Router();

// Const Status
const OK = 200;
const NOT_FOUND = 404;
const CREATED = 201;
const NO_CONTENT = 204;

router.get('/talker', async (req, res) => {
  const talkers = await readTalkerData();
  return res.status(OK).json(talkers);
});

router.get('/talker/search', authToken, async (req, res) => {
  const talkersData = await readTalkerData();
  const { q } = req.query;

  if (!q) {
    return res.status(OK).send(talkersData);
  }
  
  const filteredTalkers = talkersData.filter((talker) =>
    talker.name.toLowerCase().includes(q.toLowerCase())
  );

  return res.status(OK).send(filteredTalkers);
});

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  console.log('qualquer coisa teste', id);
  const talkers = await readTalkerData();

  const idTalker = talkers.find((talker) => talker.id === Number(id));

  if (!idTalker) {
    return res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(OK).json(idTalker);
});

router.post(
  '/talker', 
  validateBodyObject, 
  authToken, 
  validName, 
  validAge, 
  validTalk,
  validDate,
  validRate, 
  async (req, res) => {
  const talker = req.body;
  const talkerData = await readTalkerData();
  const { id } = talkerData[talkerData.length - 1];

  const newId = talkerData.length > 0 ? id + 1 : 1;

  const newTalker = { name: talker.name, id: newId, ...talker };

  await writeNewTalkerData(newTalker);

  return res.status(CREATED).json(newTalker);
},
);

router.put('/talker/:id',
validateBodyObject, 
authToken, 
validName, 
validAge, 
validTalk,
validDate,
validRate,  
async (req, res) => {
  const { id } = req.params;
  const newTalker = req.body;
  const talkers = await readTalkerData();

  const idTalker = talkers.find((talker) => talker.id === Number(id));
  if (!idTalker) {
    return res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
  }
  const changeTalker = { ...idTalker, ...newTalker };

  const idTalkerIndex = talkers.findIndex((talker) => talker.id === Number(id));
  talkers[idTalkerIndex] = changeTalker;

  changeAllTalkerData(talkers);

  return res.status(OK).json(changeTalker);
});

router.delete('/talker/:id', authToken, async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalkerData();

  const deletedTalkerData = talkers.filter((talker) => talker.id !== Number(id));

  changeAllTalkerData(deletedTalkerData);

  return res.status(NO_CONTENT).send();
});

module.exports = router;