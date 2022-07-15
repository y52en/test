const https = require("https");
const fs = require("fs");

const db_url = (commit_id, file_name) => `https://gitlab.com/kirafan/database/-/raw/${commit_id}/${file_name}`;

function fetch(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = "";
            res.on("data", (chunk) => {
                data += chunk;
            });
            res.on("end", () => {
                resolve(data);
            });
        });
    });
}

function overwrite_file(p, content) {
    fs.writeFileSync(p, content);
}

function assetbundle_key(assetbundle_item) {
    return assetbundle_item.path + "/" + assetbundle_item.hash;
}

function assetbundle_to_obj(assetbundle) {
    const obj = {};
    assetbundle.forEach(x => {
        let key = assetbundle_key(x);
        obj[key] = x;
    })
    return obj;
}

function is_equal_asset_bundle(a, b) {
    if (a.length !== b.length) return false;
    const b_obj = assetbundle_to_obj(b);

    for (let i = 0; i < a.length; i++) {
        const x = a[i];
        if (!b_obj[assetbundle_key(x)]) return false;
        if (x.hash !== b_obj[assetbundle_key(x)].hash) return false;
    }

    return true;
}

// [old,new]
// return [[commit_id,file],[commit_id,file]]
async function find_changed_asset_bundle(commit_ids) {
    const assetbundle_path = "assetBundle.json";
    const new_asset_bundle = await fetch(db_url(commit_ids[0], assetbundle_path));

    for (let i = 1; i < commit_ids.length; i++) {
        const old_asset_bundle = await fetch(db_url(commit_ids[i], assetbundle_path));
        if (!is_equal_asset_bundle(JSON.parse(new_asset_bundle), JSON.parse(old_asset_bundle))) {
            return [
                [commit_ids[i], old_asset_bundle], 
                [commit_ids[0], new_asset_bundle]
            ];
        }
    }


}


(async () => {
    //   rvh
    const data = await fetch(
        "https://krr-prd.star-api.com/api/app/version/get?platform=1&version=3.2.4"
    ).then((res) => JSON.parse(res));
    const resourceVersionHash = data.resourceVersionHash;
    overwrite_file("rvh.txt", resourceVersionHash);

    //   diff_weapon


    const html = await fetch("https://gitlab.com/kirafan/database/-/commits/master")
    const commit_id = [...html.matchAll(/\/kirafan\/database\/-\/commit\/([\w]{40})\//g)].map(x => x[1])
    // https://gitlab.com/kirafan/database/-/raw/:commit_id/database/WeaponList.json
    // console.log('commit_id :>> ', commit_id);

    const old_new_ids = await find_changed_asset_bundle(commit_id);

    overwrite_file("assetBundle.old.json", old_new_ids[0][1]);

    const old_commit_id = old_new_ids[0][0];
    const latest_commit_id = old_new_ids[1][0];

    let output = [];
    const wpn_path = "database/WeaponList.json";
    const [latest, old] = [
        await fetch(db_url(latest_commit_id, wpn_path)),
        await fetch(db_url(old_commit_id, wpn_path))
    ];
    const old_keys = JSON.parse(old).map(x => x.m_ID);
    const latest_keys = JSON.parse(latest).map(x => x.m_ID);
    latest_keys.forEach(key => {
        if (!old_keys.includes(key)) output.push(key);
    })
    output = output.filter(x => x % 10 === 3 || x % 10 === 4);
    const writeText = JSON.stringify({
        keyLength: latest_keys.length,
        keys: output
    });
    overwrite_file("diff_weapon.json", writeText);
})();
