class WindowCycler {
  constructor(windowConstructor) {
    this.windowConstructor = windowConstructor;
    this.isRunning = true;
  }

  prepare() {
    this.window = this.windowConstructor();
    this.window.browserWindow.hide();
    this.window.browserWindow.on('closed', () => {
      if (this.isRunning) {
        this.prepare();
      }
    });
  }

  showWindow() {
    this.window.browserWindow.show();
  }

  stop() {
    this.isRunning = false;
  }

}

export default WindowCycler
