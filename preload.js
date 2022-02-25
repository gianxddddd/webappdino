const { dialog, getCurrentWindow, Menu, MenuItem } = require("@electron/remote");
const { platform } = require("process");
const Titlebar = require("@6c65726f79/custom-titlebar");
const currentWindow = getCurrentWindow();
let titlebar;

currentWindow.webContents.once("dom-ready", () => {
  const menuRestart = new MenuItem({
    role: "reload",
    type: "normal",
    label: "Restart"
  });
  const menuQuit = new MenuItem({
    role: "quit",
    type: "normal"
  });
  const menuAbout = new MenuItem({
    type: "normal",
    label: "About",
    click: () => {
      dialog.showMessageBox(currentWindow, {
        type: "info",
        title: "About",
        detail: "(c) GianXD, 2022 all rights reserved."
          + "\nOriginal work is made by The Chromium Authors.",
        message: "Dino in a Webapp"
      });
    }
  });

  const menu = new Menu();
  menu.append(menuRestart);
  menu.append(menuQuit);
  menu.append(menuAbout);
  Menu.setApplicationMenu(menu);

  titlebar = new Titlebar({
    menu: Menu.getApplicationMenu(),
    backgroundColor: "#fff",
    platform: platform,
    browserWindow: currentWindow,
    maximizable: false,
    onMinimize: () => currentWindow.minimize(),
    onClose: () => currentWindow.close(),
  });
});

