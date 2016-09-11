class WindowCycler {
  constructor(windowConstructor) {
    this.windowConstructor = windowConstructor;
    this.isRunning = true;
  }

  prepare() {
    this.window = this.windowConstructor();
    this.window.hide();
    this.window.setClosedHandler(() => {
      if (this.isRunning) {
        this.prepare();
      }
    });
  }

  showWindow() {
    this.window.show();
  }

  stop() {
    this.isRunning = false;
  }

}

export default WindowCycler
