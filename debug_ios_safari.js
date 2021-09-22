// for extension "Web inspector"
(() => {
  const useragent = window.navigator.userAgent.toLowerCase();

  if (useragent.indexOf('iphone') !== -1) {
      const cache = [];
      Object.keys(console).forEach(i => {
          console[i] = (x) => cache.push([i,x])
      })
      setTimeout(() => {
          cache.forEach(x => {
              let [name,value] = x;
              console[name](value)
          })
      },4000)
  }
})()
