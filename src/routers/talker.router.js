const express = require('express');
const { readTalkerData, writeNewTalkerData } = require('../utils/fsUtils');
const { 
  validateBodyObject, 
  authToken, validName, 
  validAge, 
  validTalk,
  validDate,
  validRate } = require('../middlewares/validateWriting');

const router = express.Router();

// Const Status
const OK = 200;
const NOT_FOUND = 404;
const CREATED = 201;

router.get('/talker', async (req, res) => {
  const talkers = await readTalkerData();
  return res.status(OK).json(talkers);
});

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
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

module.exports = router;