c_ls = {}
b_ls = vue.$db.EventQuestDropExt
.filter(x => Boolean((x.m_CharaID + 1) % 2) )
.map(x => x.m_CharaID)
.map(x => vue.$db.CharacterList[x])
.map(x => "星" + (x.m_Rare + 1) + "_" + x.m_Name + "_" + x.year)
.forEach(x => c_ls[x] = (c_ls[x] || 0) + 1)

arr = Object.entries(c_ls)
arr.sort((a,b)=>{
    if(a[1] > b[1]) return -1;
    if(a[1] < b[1]) return 1;
    return 0;
})


c_fn = (x) => "星" + (x.m_Rare + 1) + "_" + x.m_Name + "_" + x.year
c_ls = {}
vue.$db.CharacterListArray
.filter(x => !Boolean((x.m_CharaID) % 2) )
.filter(x =>  x.m_Rare === 4)
.filter(x => x.year === 2017 || x.year === 2018)
.forEach(x => {c_ls[c_fn(x)] = 0})

b_ls = vue.$db.EventQuestDropExt
.filter(x => !Boolean((x.m_CharaID) % 2) )
.map(x => x.m_CharaID)
.map(x => vue.$db.CharacterList[x])
.filter(x =>  x.m_Rare === 4)
.filter(x => x.year === 2017 || x.year === 2018)
.map(x => c_fn(x))
.forEach(x => c_ls[x] += 1)

arr = Object.entries(c_ls)
arr.sort((a,b)=>{
    if(a[1] > b[1]) return -1;
    if(a[1] < b[1]) return 1;
    return 0;
}).reverse()
