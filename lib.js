
function distribution(arr, key = undefined) {
  let output = {};

  if (key == undefined) {
    console.info("key is undefined");
  }

  arr.forEach((x) => {
    if (key == undefined) {
      output[x] = 0;
    } else {
      output[x[key]] = 0;
    }
  });

  arr.forEach((x) => {
    if (key == undefined) {
      output[x]++;
    } else {
      output[x[key]]++;
    }
  });
  return output;
}


function categorize(arr, key) {
  let output = {};

  arr.forEach((x) => {
      output[x[key]] = [];
  });

  arr.forEach((x) => {
      output[x[key]].push(x);
  });
  return output;
}
