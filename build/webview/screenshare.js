"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.screenShareJs=exports.screenShareCss=exports.getDisplayMediaSelector=void 0;const electron_1=require("electron"),CANCEL_ID="desktop-capturer-selection__cancel";async function getDisplayMediaSelector(){return`<div class="desktop-capturer-selection__scroller">\n  <ul class="desktop-capturer-selection__list">\n    ${(await electron_1.desktopCapturer.getSources({types:["screen","window"]})).map((({id:e,name:n,thumbnail:t})=>`\n      <li class="desktop-capturer-selection__item">\n        <button class="desktop-capturer-selection__btn" data-id="${e}" title="${n}">\n          <img class="desktop-capturer-selection__thumbnail" src="${t.toDataURL()}" />\n          <span class="desktop-capturer-selection__name">${n}</span>\n        </button>\n      </li>\n    `)).join("")}\n    <li class="desktop-capturer-selection__item">\n      <button class="desktop-capturer-selection__btn" data-id="${CANCEL_ID}" title="Cancel">\n        <span class="desktop-capturer-selection__name desktop-capturer-selection__name--cancel">Cancel</span>\n      </button>\n    </li>\n  </ul>\n</div>`}exports.getDisplayMediaSelector=getDisplayMediaSelector,exports.screenShareCss="\n.desktop-capturer-selection {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100vh;\n  background: rgba(30,30,30,.75);\n  color: #fff;\n  z-index: 10000000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.desktop-capturer-selection__scroller {\n  width: 100%;\n  max-height: 100vh;\n  overflow-y: auto;\n}\n.desktop-capturer-selection__list {\n  max-width: calc(100% - 100px);\n  margin: 50px;\n  padding: 0;\n  display: flex;\n  flex-wrap: wrap;\n  list-style: none;\n  overflow: hidden;\n  justify-content: center;\n}\n.desktop-capturer-selection__item {\n  display: flex;\n  margin: 4px;\n}\n.desktop-capturer-selection__btn {\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  width: 145px;\n  margin: 0;\n  border: 0;\n  border-radius: 3px;\n  padding: 4px;\n  background: #252626;\n  text-align: left;\n  @media (prefers-reduced-motion: no-preference) {\n    transition: background-color .15s, box-shadow .15s, color .15s;\n  }\n  color: #dedede;\n}\n.desktop-capturer-selection__btn:hover,\n.desktop-capturer-selection__btn:focus {\n  background: rgba(98,100,167,.8);\n  box-shadow: 0 0 4px rgba(0,0,0,0.45), 0 0 2px rgba(0,0,0,0.25);\n  color: #fff;\n}\n.desktop-capturer-selection__thumbnail {\n  width: 100%;\n  height: 81px;\n  object-fit: cover;\n}\n.desktop-capturer-selection__name {\n  margin: 6px 0;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  text-align: center;\n  overflow: hidden;\n}\n.desktop-capturer-selection__name--cancel {\n  margin: auto 0;\n}\n",exports.screenShareJs=`\nwindow.navigator.mediaDevices.getDisplayMedia = () => new Promise(async (resolve, reject) => {\n  try {\n    const selectionElem = document.createElement('div');\n    selectionElem.classList = ['desktop-capturer-selection'];\n    selectionElem.innerHTML = await window.ferdi.getDisplayMediaSelector();\n    document.body.appendChild(selectionElem);\n\n    document\n      .querySelectorAll('.desktop-capturer-selection__btn')\n      .forEach((button) => {\n        button.addEventListener('click', async () => {\n          try {\n            const id = button.getAttribute('data-id');\n            if (id === '${CANCEL_ID}') {\n              reject(new Error('Cancelled by user'));\n            } else {\n              const stream = await window.navigator.mediaDevices.getUserMedia({\n                audio: false,\n                video: {\n                  mandatory: {\n                    chromeMediaSource: 'desktop',\n                    chromeMediaSourceId: id,\n                  },\n                },\n              });\n              resolve(stream);\n            }\n          } catch (err) {\n            reject(err);\n          } finally {\n            selectionElem.remove();\n          }\n        });\n      });\n  } catch (err) {\n    reject(err);\n  }\n});\n`;