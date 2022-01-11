window.onload = () => {
  const user_agent = navigator.userAgent;

  if (!user_agent.match("MR_APP/")) {
    throw alert("Please change your user agent to MR_APP");
  }
  const mr_id = document.cookie
    .split(";")
    .find((item) => item.trim().startsWith("mr_id="))
    .trim()
    .replace("mr_id=", "");

  function via_error() {
    alert(
      "おそらくviaのバグでCookieの上書きができません。(Chromeなどではうまくいく)\n設定->一般->プライベートモードの消去->CookieでCookieを消去してください。"
    );
  }
  const account_name = Mirrativ.currentUser.name;
  if (!account_name) {
    if (mr_id) {
      via_error();
      return;
    }

    alert("you need to login first");
    const id = prompt("please enter mr_id");
    document.cookie = `mr_id=${id}; path=/;`;
    location.reload();
  }

  function promiseBlob(canvas) {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      });
    });
  }

  async function convertPNG(url) {
    const img = document.createElement("img");
    img.src = url;
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const blob = await promiseBlob(canvas);
    return blob;
  }

  function logout() {
    via_error();
    return;
    // Cookies.remove("mr_id");
    // Cookies.remove("f");
    // location.reload();
  }

  let img_file;
  async function exec() {
    const form = new FormData();
    let slot_id;
    document.querySelectorAll("[name='slot_id']").forEach((x) => {
      if (x.checked) {
        slot_id = x.value;
      }
    });
    let name = document.querySelector("#name").value;
    const img = await convertPNG(img_file);

    form.append("slot_id", slot_id);
    form.append("text", name);
    form.append("image", img);

    const responce = await fetch(
      "https://www.mirrativ.com/api/gift/update_simple_unique_emomo_gift",
      {
        method: "POST",
        body: form,
      }
    ).then((responce) => responce.text());
    if (responce.match(/^{/)) {
      const json = JSON.parse(responce);
      if (json.status.ok === 1) {
        alert("success");
      } else {
        alert("Unknown error");
      }
    } else {
      alert("failed");
    }
  }

  function imgLoad(e) {
    var reader = new FileReader();
    reader.onload = function (e) {
      const url = URL.createObjectURL(new Blob([e.target.result]));
      document.querySelector("#preview").src = url;
      img_file = url;
    };
    reader.readAsArrayBuffer(e.target.files[0]);
  }

  document.querySelector("html").innerHTML = "";

  document.body.innerHTML = `
<span class = "">
    <p>You are logged in as ${account_name} <br>
    <button id="logout">Logout</button>
    <p>
    <p>
        <b>stamp</b> <br>
        スタンプ名：<input id="name"> <br>

        
        <input type="file" name="" id="img" accept="image/*"><br>
        <img id="preview" style="width:100px;"><br>

        書換え先
        <span>
            <input type="radio" name="slot_id" value="1"
                    checked>
            <label for="1">1</label>

            <input type="radio" name="slot_id" value="2">
            <label for="2">2</label>

            <input type="radio" name="slot_id" value="3">
            <label for="3">3</label>
            
            <input type="radio" name="slot_id" value="4">
            <label for="4">4</label>
        </span>

        <br>

        <button id="exec">スタンプ書換え</button>
    </p>
</span>
`;
  document.querySelector("#img").onchange = imgLoad;
  document.querySelector("#exec").onclick = exec;
  document.querySelector("#logout").onclick = logout;
};
