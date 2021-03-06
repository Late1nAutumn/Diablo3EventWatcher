// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

var mainWindow;
// TODO: add frameless and clickthrough shortcuts
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 400,
    height: 250,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("./web/index.html");

  // Open the DevTools.
  if (process.env.npm_execpath) mainWindow.webContents.openDevTools();

  mainWindow.setAlwaysOnTop(true);

  mainWindow.removeMenu();

  return mainWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on("loadIndex", () => {
  mainWindow.setSize(400, 250); // width,height
});
ipcMain.on("loadWatch", () => {
  mainWindow.setSize(900, 250);
});
ipcMain.on("loadSetup", () => {
  mainWindow.setSize(400, 450);
});
ipcMain.on("loadIntro", () => {
  mainWindow.setSize(400, 450);
});

ipcMain.on("lockTop", () => {
  mainWindow.setAlwaysOnTop(true);
});
ipcMain.on("unlockTop", () => {
  mainWindow.setAlwaysOnTop(false);
});
