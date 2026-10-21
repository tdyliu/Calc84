const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 1100, height: 760, minWidth: 360, minHeight: 560,
    title: 'Calc 84', autoHideMenuBar: true, backgroundColor: '#edf1ec', show: false,
    icon: path.join(__dirname, '..', 'build', 'icon.png'),
  });
  win.once('ready-to-show', () => win.show()); // no blank white frame while the page paints
  win.loadFile(path.join(__dirname, '..', 'www', 'index.html'));
  // links open in the real browser, never inside the calculator window
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' } });
});
app.on('window-all-closed', () => app.quit());
