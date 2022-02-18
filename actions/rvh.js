const https = require("https");
const fs = require("fs");

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

    const latest_commit_id = commit_id[0];
    const secand_latest_commit_id = commit_id[1];

    let output = [];
    const url = (commit_id) => `https://gitlab.com/kirafan/database/-/raw/${commit_id}/database/WeaponList.json`;
    const [latest,old] = [
        await fetch(url(latest_commit_id)),
        await fetch(url(secand_latest_commit_id))
    ];
    const old_keys = JSON.parse(old).map(x => x.m_ID);
    const latest_keys = JSON.parse(latest).map(x => x.m_ID);
    latest_keys.forEach(key => {
        if (!old_keys.includes(key)) output.push(key);
    })
    output = output.filter(x => x % 10 === 3 || x % 10 === 4);
    const writeText = JSON.stringify({
        keyLength: latest_keys.length,
        keys:output
    });
    overwrite_file("diff_weapon.json", writeText);
})();
