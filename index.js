const { enable, initialize } = require("@electron/remote/main");
const { app, BrowserWindow, dialog, globalShortcut } = require("electron");
const path = require("path");

let window;
let loadWindow;

initialize();

function createWindows() {
  window = new BrowserWindow({
    width: 779,
    height: 406,
    minWidth: 400,
    minHeight: 100,
    titleBarStyle: "hidden",
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  loadWindow = new BrowserWindow({
    parent: window,
    width: window.getSize()[0],
    height: window.getSize()[1],
    x: window.getPosition[0],
    y: window.getPosition[1],
    transparent: true,
    frame: false
  });

  window.on("resize", () => {
    const width = window.getSize()[0];
    const height = window.getSize()[1];
    loadWindow.setSize(width, height);
  });
  window.on("move", () => {
    const x = window.getPosition()[0];
    const y = window.getPosition()[1];
    loadWindow.setPosition(x, y);
  });
  window.webContents.on("did-navigate", () => {
    if (loadWindow.isVisible()) return;
    loadWindow.show();
  });
  window.webContents.on("did-finish-load", () => {
    if (!loadWindow.isVisible()) return;
    loadWindow.hide();
  });

  window.maximize();
  loadWindow.hide();
  enable(window.webContents);
  window.loadFile(path.join(__dirname, "dino", "index.html"));
  loadWindow.loadFile(path.join(__dirname, "app", "loading", "index.html"));
}

app.whenReady().then(() => {
  createWindows();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length !== 0) {
      return;
    }

    createWindows();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});