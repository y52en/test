a = {}
q = vue.$db.CharacterListArray.filter(x => 
x.m_CharaID % 2 === 0)
q.forEach(x => {
   a[x.m_NamedType] = 0
})
q.forEach(x => {
   a[x.m_NamedType] +=1
})
s = Object.entries(a).sort((a,b)=>{
if (a[1]>b[1]) return 1
if (a[1]<b[1]) return -1
return 0
}).map(x => {
x[0] = vue.$db.NamedList[x[0]].m_FullName
return x
})


d = {}
s.forEach(x=> 
    d[x[1]] = 0
)
s.forEach(x => {
    d[x[1]]++
});
console.log(s,d)
