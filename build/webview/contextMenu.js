"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const remote_1=require("@electron/remote"),contextMenuBuilder_1=require("./contextMenuBuilder"),webContents=(0,remote_1.getCurrentWebContents)();async function setupContextMenu(e,t,n,o,u){const r=new contextMenuBuilder_1.ContextMenuBuilder(webContents);webContents.on("context-menu",((s,c)=>{r.showPopupMenu({...c,searchEngine:o(),clipboardNotifications:u()},e(),t(),n())}))}exports.default=setupContextMenu;