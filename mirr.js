/*! js-cookie v3.0.1 | MIT */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self,function(){var n=e.Cookies,o=e.Cookies=t();o.noConflict=function(){return e.Cookies=n,o}}())}(this,(function(){"use strict";function e(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)e[o]=n[o]}return e}return function t(n,o){function r(t,r,i){if("undefined"!=typeof document){"number"==typeof(i=e({},o,i)).expires&&(i.expires=new Date(Date.now()+864e5*i.expires)),i.expires&&(i.expires=i.expires.toUTCString()),t=encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var c="";for(var u in i)i[u]&&(c+="; "+u,!0!==i[u]&&(c+="="+i[u].split(";")[0]));return document.cookie=t+"="+n.write(r,t)+c}}return Object.create({set:r,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var t=document.cookie?document.cookie.split("; "):[],o={},r=0;r<t.length;r++){var i=t[r].split("="),c=i.slice(1).join("=");try{var u=decodeURIComponent(i[0]);if(o[u]=n.read(c,u),e===u)break}catch(e){}}return e?o[e]:o}},remove:function(t,n){r(t,"",e({},n,{expires:-1}))},withAttributes:function(n){return t(this.converter,e({},this.attributes,n))},withConverter:function(n){return t(e({},this.converter,n),this.attributes)}},{attributes:{value:Object.freeze(o)},converter:{value:Object.freeze(n)}})}({read:function(e){return'"'===e[0]&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"})}));

window.onload = () => {
  const user_agent = navigator.userAgent;

  if (!user_agent.match("MR_APP/")) {
    throw alert("Please change your user agent to MR_APP~");
  }

  const account_name = Mirrativ.currentUser.name;
    if (!account_name) {
      Cookies.remove("mr_id");
      Cookies.remove("f");
    alert("you need to login first");
      const id = prompt("please enter mr_id");
      Cookies.set("mr_id", id);
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
        Cookies.remove("mr_id");
        Cookies.remove("f");
        location.reload();
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
