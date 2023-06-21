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
const { validateSearch } = require('../middlewares/validateSearch');

const router = express.Router();

// Const Status
const OK = 200;
const NOT_FOUND = 404;
const CREATED = 201;
const NO_CONTENT = 204;
// const BAD_REQUEST = 400;

router.get('/talker', async (req, res) => {
  const talkers = await readTalkerData();
  return res.status(OK).json(talkers);
});

router.get('/talker/search', authToken, validateSearch, async (req, res) => {
  let talkersData = await readTalkerData();
  const { q, rate } = req.query;

  if (q && q.length < 1) return res.status(OK).send(talkersData);

  if (q) {
    talkersData = talkersData.filter((talker) => (
      talker.name.toLowerCase().includes(q.toLowerCase())
    ));
  }

  if (rate) {
    talkersData = talkersData.filter((talker) => talker.talk.rate === Number(rate));
  }

  return res.status(OK).send(talkersData);
});

// router.get('/talker/search', authToken, async (req, res) => {
//   const talkersData = await readTalkerData();
//   const { date } = req.query;

//   if (!date) {
//     return res.status(OK).send(talkersData);
//   }
  
//   const filteredByDate = talkersData.filter((talker) =>
//     talker.talk.watchedAt === date
//   );

//   return res.status(OK).send(filteredByDate);
// });

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