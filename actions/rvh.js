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
  const data = await fetch(
    "https://krr-prd.star-api.com/api/app/version/get?platform=1&version=3.2.4"
  ).then((res) => JSON.parse(res));
  const resourceVersionHash = data.resourceVersionHash;
  overwrite_file("rvh.txt", resourceVersionHash);
})();
