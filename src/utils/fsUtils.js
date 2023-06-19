// Acessando o JSON
const fs = require('fs').promises;
const path = require('path');

async function readTalkerData() {
  try{
    const data = await fs.readFile(path.resolve(__dirname, '../talker.json'))
    const talkers = JSON.parse(data);
    console.log(talkers);

    return talkers
  } catch (err) {
    console.log(`Erro: ${err.message}`)
  }
}

module.exports = {
  readTalkerData
}