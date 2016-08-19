const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const EvdevReader = require('evdev')

let mainWindow

function createWindow () {
  var reader = new EvdevReader();
  reader.search('/dev/input/by-path', 'event-kbd', function(err,files){
    if(err){
      console.log('node-evdev search stream : ', err);
    }
    else if(files[0]){
      var device = reader.open(files[0]);
    }
  });

  mainWindow = new BrowserWindow({width: 1024, height: 768, resizable: true, autoHideMenuBar: true })
  mainWindow.loadURL('https://www.curse.com/login')

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  var called = false;
  mainWindow.webContents.on('did-stop-loading', () => {
    if(!called) {
      called = true;
      reader.on('EV_KEY', function(data) {
        if(data.code === 'KEY_LEFTCTRL') {
          if(data.value === 1) {
            mainWindow.webContents.sendInputEvent({
              type: 'keyDown',
              modifiers: [ 'control' ],
              keyCode: 'X'
            })
          }
          else if(data.value === 0) {
            mainWindow.webContents.sendInputEvent({
              type: 'keyUp',
              modifiers: [ 'control' ],
              keyCode: 'X'
            })
          }
        }
      });
    }
  });
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

