// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

// window.addEventListener('DOMContentLoaded', () => {
//   const replaceText = (selector, text) => {
//     const element = document.getElementById(selector)
//     if (element) element.innerText = text
//   }

//   for (const type of ['chrome', 'node', 'electron']) {
//     replaceText(`${type}-version`, process.versions[type])
//   }
// })

window.gkm = require("../src/lib/gkm"); // IMPORTANT: jar file from gkm needs to be move to root on unpack
// window.gkm = require("gkm"); // won't work on dist build
window.emiter = () => {};

// Listen to all key events (pressed, released, typed, *)
window.gkm.events.on("key.pressed", function (data) {
  window.emiter("k", data[0], this.event);
  // console.log(this.event + " " + data);
});

// Listen to all mouse events (click, pressed, released, moved, dragged, *)
window.gkm.events.on("mouse.pressed", function (data) {
  window.emiter("m", data[0], this.event);
  // console.log(this.event + ' ' + data);
});
