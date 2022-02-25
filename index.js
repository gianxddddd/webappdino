const { enable, initialize } = require("@electron/remote/main");
const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");
let window;

initialize();

function createWindow() {
  window = new BrowserWindow({
    width: 779,
    height: 406,
    minWidth: 400,
    minHeight: 100,
    maxWidth: 779,
    maxHeight: 406,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
      webViewTag: true,
    }
  });

  enable(window.webContents);
  window.loadFile(path.join(__dirname, "dino", "dino.html"));
}

function registerGlobalKeys() {
  globalShortcut.register("Control+Shift+I", () => {
    // Had to implement the keys to open DevTools because it wasn't working
    window.webContents.openDevTools();
  });
}

app.whenReady().then(() => {
  createWindow();
  registerGlobalKeys();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});