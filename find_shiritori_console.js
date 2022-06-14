finish = "終了";
get_data = async (txt) => (await (await fetch("http://siritori-battle.net:26666/t?w=" + txt)).json()).t ?? [];

hiragana = ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と', 'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ', 'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 'る', 'れ', 'ろ', 'わ', 'ゐ', 'ゑ', 'を', 'ん', 'が', 'ぎ', 'ぐ', 'げ', 'ご', 'ざ', 'じ', 'ず', 'ぜ', 'ぞ', 'だ', 'ぢ', 'づ', 'で', 'ど', 'ば', 'び', 'ぶ', 'べ', 'ぼ', 'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ',"ゃ","ゅ","ょ","っ"]

types =  ['ノーマル', '感情', '食べ物', '植物', '社会', '時間', '工作', '芸術', '機械', '遊び', '暴力', '服飾', '動物', '地名', '人物', '人体', '理科', '暴言', '虫', '数学', '医療', '宗教', 'スポーツ', '物語', '天気']
promise_async = (callback) =>  Promise.all( hiragana.map((x,i) => callback(x,i)) )


base_string = "あ"
base = 0;
want = "食べ物";

(await promise_async(async (y,i) =>{ 
        const tmp = base_string + y;
        const val =  await get_data(tmp);
        if ( val.some(x => x === want)) console.log(tmp,val)    
        
        return await promise_async(async x => {
            if (!(base <= i && i < base + 10)) return;
            const tmp = base_string + y + x;
            const val = await get_data(tmp);
            if ( val.some(x => x === want)) console.log(tmp,val)
        })   
    })
)
finish
