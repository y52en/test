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