const config = require("../config.js");
const fs = require("fs");

const readFile = path => {
  try {
    return JSON.parse(fs.readFileSync(path, "utf-8"));
  } catch (err) {
    console.log(err);
  }
};

const writeFile = (path, file) => {
  try {
    fs.writeFileSync(path, JSON.stringify(file), "utf-8");
  } catch (err) {
    console.log(err);
  }
};

function parseXp(level){
	   return (Math.pow(level , 3) * 4) + 65;
}

function loadItems(){
   let items = fs.readdirSync(config.DB + '/armory/');
   let _items = {};
   for(let item of items){
     if(item != 'test.json'){
        let _item = readFile(config.DB + '/armory/' + item);
        _items[item.replace('.json', '')] = _item;
     }
   }
   return _items;
}

function loadClans(){
  let clans = fs.readdirSync(config.DB + '/clans/');
  let _clans = {};
  for(let clan of clans){
    if(clan != 'test.json'){
      let _clan = readFile(config.DB + '/clans/' + clan);
      _clans[clan.replace('.json', '')] = _clan;
    }
  }
  return _clans;
}

module.exports = {
  readFile,
  writeFile,
  parseXp,
  loadItems,
  loadClans
};
