
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

function searchWhoUseSkill(id){
    return vue.$db.QuestEnemyListArray.filter(x => x.m_SkillIDs.includes(id) || x.m_CharageSkillIDs.includes(id))
}


function getCancatSkillDB(owner){
    const output = {};
    const output2 = Object.keys(vue.$db[`SkillContentList_${owner}`]).map(x => {
        output[x] = {};
        Object.assign(output[x],vue.$db[`SkillList_${owner}`][x], vue.$db[`SkillContentList_${owner}`][x])
        return output[x];
    })
    return [output, output2];
}

function diff_obj(obj1,obj2){
    const output = {}
    Object.keys(obj1).forEach(x =>{
        if(obj1[x] !== obj2[x]){
            output[x] = [obj1[x], obj2[x]]
        }   
    })
    return output;
}

function skill_finder(obj,fn){
  return obj.filter(x => x.m_Datas.filter(fn).length > 0)
}
