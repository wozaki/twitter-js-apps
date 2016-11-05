import _ from "lodash"

class WindowManager {
  constructor() {
    this._windows = {};
  }

  /**
   * @param window {BaseWindow}
   */
  register(...window) {
    _.each(window, (w) => {
      this._windows[w.key] = w;
    });
  }

  /**
   * @param key {string}
   * @return {BaseWindow}
   */
  find(key) {
    return this._windows[key];
  }

  /**
   * @param key {string}
   */
  ensure(key) {
    const window = this.find(key);
    window.show();
    window.focus();
  }

  toggleDevTools() {
    this._toAllWindows((window) => window.toggleDevTools());
  }

  reload() {
    this._toAllWindows((window) => window.reload());
  }

  stopHotLoading() {
    this._toAllWindows((w) => w.stopHotLoading())
  }

  _toAllWindows(fn) {
    _.each(this._windows, (window) => {
      fn(window);
    });
  }

}

export default WindowManager
