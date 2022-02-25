const { clipboard, dialog, getCurrentWindow, Menu, MenuItem } = require("@electron/remote");
const { platform } = require("process");
const Titlebar = require("@6c65726f79/custom-titlebar");
const path = require("path");
const currentWindow = getCurrentWindow();

let titlebar;

currentWindow.webContents.once("dom-ready", () => {
  const submenuGame = new MenuItem({
    type: "submenu",
    label: "Game",
    sublabel: "Game options",
    submenu: [{
      // Restart
      type: "normal",
      role: "reload",
      label: "Restart",
      accelerator: "CmdOrCtrl+R"
    }, {
      // Force restart
      type: "normal",
      role: "forceReload",
      label: "Force restart",
      accelerator: "CmdOrCtrl+Shift+R"
    }, {
      type: "separator"
    }, {
      // About
      type: "normal",
      label: "About",
      accelerator: "CmdOrCtrl+I",
      click: () => {
        dialog.showMessageBoxSync(currentWindow, {
          type: "info",
          title: "About",
          detail: "(c) GianXD, 2022 all rights reserved."
            + "\nOriginal work is made by The Chromium Authors.",
          message: "Dino in a Webapp"
        });
      }
    }, {
      // Quit
      type: "normal",
      label: "Quit",
      accelerator: "CmdOrCtrl+W",
      click: () => {
        const response = dialog.showMessageBoxSync(currentWindow, {
          type: "question",
          title: "Exit",
          detail: "Your score will be lost!",
          message: "Do you want to exit Dino?",
          buttons: ["Yes", "No"],
          cancelId: 1
        });

        if (response == 0) {
          currentWindow.close();
        }
      }
    }]
  });
  const submenuView = new MenuItem({
    type: "submenu",
    label: "View",
    sublabel: "Game view options",
    submenu: [{
      type: "normal",
      role: "zoomIn",
      accelerator: "CmdOrCtrl+numadd"
    }, {
      type: "normal",
      role: "zoomOut",
      accelerator: "CmdOrCtrl+numsub"
    }, {
      type: "normal",
      role: "resetZoom",
      label: "Reset Zoom",
      accelerator: "CmdOrCtrl+nummult"
    }, {
      type: "separator"
    }, {
      type: "normal",
      label: "Take screenshot",
      accelerator: "CmdOrCtrl+PrintScreen",
      click: () => {
        if (currentWindow.webContents.isBeingCaptured()) {
          dialog.showMessageBoxSync(currentWindow, {
            type: "error",
            title: "Unable to take screenshot",
            message: "Game is still taking a screenshot!"
          });
          return;
        }

        currentWindow.webContents.capturePage().then((image) => {
          clipboard.writeImage(image);
        }).catch((error) => {
          console.log("Failed to take a screenshot due to: %s", error);
        });
      }
    }]
  });
  const submenuSettings = new MenuItem({
    type: "submenu",
    label: "Settings",
    sublabel: "Game setting options",
    submenu: [{
      type: "normal",
      label: "Show developer tools",
      accelerator: "CmdOrCtrl+Shift+I",
      click: () => {
        if (currentWindow.webContents.isDevToolsOpened()) {
          currentWindow.webContents.closeDevTools();
          return;
        }

        currentWindow.webContents.openDevTools();
      }
    }]
  });

  const menu = new Menu();
  menu.append(submenuGame);
  menu.append(submenuView);
  menu.append(submenuSettings);
  Menu.setApplicationMenu(menu);

  titlebar = new Titlebar({
    menu: Menu.getApplicationMenu(),
    platform: platform,
    browserWindow: currentWindow,
    backgroundColor: "#fff",
    icon: "https://cdn.discordapp.com/attachments/844193986254995456/946801623844405258/icon.png",
    maximizable: false,
    onMinimize: () => currentWindow.minimize(),
    onClose: () => {
      const response = dialog.showMessageBoxSync(currentWindow, {
        type: "question",
        title: "Exit",
        detail: "Your score will be lost!",
        message: "Do you want to exit Dino?",
        buttons: ["Yes", "No"],
        cancelId: 1
      });

      if (response == 0) {
        currentWindow.close();
      }
    }
  });
});