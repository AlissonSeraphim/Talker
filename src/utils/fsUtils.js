// Acessando o JSON
const fs = require('fs').promises;
const path = require('path');

const TALKER_DATA_PATH = '../talker.json';

async function readTalkerData() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, TALKER_DATA_PATH), 'utf-8');
    const talkers = JSON.parse(data);

    return talkers;
  } catch (err) {
    console.error(`Erro: ${err.message}`);
    return null;
  }
}

async function writeNewTalkerData(newTalker) {
  try {
    const talkersData = await readTalkerData();
    const newTalkersData = JSON.stringify([...talkersData, newTalker], null, 2);

    await fs.writeFile(path.resolve(__dirname, TALKER_DATA_PATH), newTalkersData);
  } catch (err) {
    console.error(`Erro na escrita do arquivo JSON: ${err.message}`);
    return null;
  }
}

module.exports = {
  readTalkerData,
  writeNewTalkerData,
};
