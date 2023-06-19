const express = require('express');
const { readTalkerData } = require('../utils/fsUtils');

const router = express.Router();

// Const Status
const OK = 200;
const NOT_FOUND = 404;

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

module.exports = router;