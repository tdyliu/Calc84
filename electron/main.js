const { app, BrowserWindow, shell, screen } = require('electron');
const fs = require('fs');
const path = require('path');

// window size, position and maximized state survive a relaunch
const boundsFile = path.join(app.getPath('userData'), 'window.json');
function savedBounds() {
  try {
    const b = JSON.parse(fs.readFileSync(boundsFile, 'utf8'));
    const area = screen.getDisplayMatching(b).workArea; // monitor may be gone: only reuse a position that's still on screen
    const onScreen = b.x < area.x + area.width - 100 && b.x + b.width > area.x + 100 && b.y >= area.y - 10 && b.y < area.y + area.height - 100;
    return onScreen ? b : {width: b.width, height: b.height, maximized: b.maximized};
  } catch { return {width: 1100, height: 760} }
}

app.whenReady().then(() => {
  const b = savedBounds();
  const win = new BrowserWindow({
    x: b.x, y: b.y, width: b.width, height: b.height, minWidth: 360, minHeight: 560,
    title: 'Calc 84', autoHideMenuBar: true, backgroundColor: '#edf1ec', show: false,
    icon: path.join(__dirname, '..', 'build', 'icon.png'),
  });
  win.once('ready-to-show', () => { if (b.maximized) win.maximize(); win.show() }); // no blank white frame while the page paints
  win.on('close', () => {
    try { fs.writeFileSync(boundsFile, JSON.stringify({...win.getNormalBounds(), maximized: win.isMaximized()})) } catch {}
  });
  win.loadFile(path.join(__dirname, '..', 'www', 'index.html'));
  // links open in the real browser, never inside the calculator window
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' } });
});
app.on('window-all-closed', () => app.quit());
