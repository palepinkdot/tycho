"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const electron_1=require("electron"),path_1=require("path"),mobx_1=require("mobx"),environment_1=require("../../environment"),INDICATOR_TASKBAR="taskbar",FILE_EXTENSION=environment_1.isWindows?"ico":"png";let isTrayIconEnabled;function getAsset(n,e){return(0,path_1.join)(__dirname,"..","..","assets","images",n,process.platform,`${e}.${FILE_EXTENSION}`)}exports.default=n=>{(0,mobx_1.autorun)((()=>{isTrayIconEnabled=n.settings.app.get("enableSystemTray"),isTrayIconEnabled?isTrayIconEnabled&&n.trayIcon.show():n.trayIcon.hide()})),electron_1.ipcMain.on("updateAppIndicator",((e,i)=>{!n.mainWindow.isFocused()&&n.settings.app.get("notifyTaskBarOnMessage")&&(environment_1.isWindows?(n.mainWindow.flashFrame(!0),n.mainWindow.once("focus",(()=>n.mainWindow.flashFrame(!1)))):environment_1.isMac&&electron_1.app.dock.bounce("informational")),environment_1.isMac&&"string"==typeof i.indicator&&electron_1.app.dock.setBadge(i.indicator),(environment_1.isMac||environment_1.isLinux)&&"number"==typeof i.indicator&&(electron_1.app.badgeCount=i.indicator),environment_1.isWindows&&("number"==typeof i.indicator&&0!==i.indicator?n.mainWindow.setOverlayIcon(getAsset("taskbar",`taskbar-${i.indicator>=10?10:i.indicator}`),""):"string"==typeof i.indicator?n.mainWindow.setOverlayIcon(getAsset("taskbar","taskbar-alert"),""):n.mainWindow.setOverlayIcon(null,"")),n.trayIcon.setIndicator(i.indicator)}))};