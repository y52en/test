
function distribution(arr, key = undefined) {
  let output = {};

  if (key == undefined) {
    console.info("key is undefined");
  }

  arr.forEach((x) => {
    if (key == undefined) {
      output[x] = 0;
    } else {
      output[x[key]] = 0;
    }
  });

  arr.forEach((x) => {
    if (key == undefined) {
      output[x]++;
    } else {
      output[x[key]]++;
    }
  });
  return output;
}


function categorize(arr, key) {
  let output = {};

  arr.forEach((x) => {
      output[x[key]] = [];
  });

  arr.forEach((x) => {
      output[x[key]].push(x);
  });
  return output;
}

function searchEnemy(id){
	return vue.$db.QuestWaveListArray.filter(x => x.m_QuestEnemyIDs.includes(id)).map(x => x.m_ID)
		.map(waveID => vue.$db.QuestListArray.filter(x => x.waveIDs.includes(waveID)))
		.map(x => [x,vue.$db.QuestLibraryList[x[0].questLibraryID]])
}
