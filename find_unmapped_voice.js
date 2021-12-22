vue.$db.NamedListArray.map(n => 

vue.$db.TweetList.filter((tweet) => tweet.m_NamedType === n.m_NamedType)
        .map((x) => [
         vue.$db.RoomObjectListArray.find(
            (item) => x.m_ID === item.m_ObjEventArgs[1]
          ),
          x,
        ])
        .filter((x) => String(x[1].m_ID).length === 9)



).filter(x => x.filter(y => y[0] == undefined).length > 0)
