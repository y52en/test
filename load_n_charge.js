// paste console in wiki.kirafan.moe 
// 書き捨てなのでコードは汚いです

a = vue.$db.SkillList_PLArray.concat(vue.$db.SkillList_WPNArray).map(x => Object.assign(x,Object.assign(vue.$db.SkillContentList_PL,vue.$db.SkillContentList_WPN)[x.m_ID])   )
.filter(x => x.m_Datas != undefined && x.m_LoadFactors != undefined)
.map(skill => 
[skill.m_Datas
          .map(data => vue.$db.TogetherChargeDefine[data.m_Type].m_Value)
          .reduce((x, y) => (x > y ? x : y)) , skill.m_LoadFactors[0] ] )
s = {}

a.forEach(x => {
const g = x[0]
const l = x[1]
if(s[l] == undefined){
 s[l] = g
} else if (s[l] > g){
     s[l] = g
}
})
s
