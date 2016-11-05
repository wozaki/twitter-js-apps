import BaseWindow from './base-window'

const key = 'PreferencesWindow';

class PreferencesWindow extends BaseWindow {
  static KEY = key;

  constructor(parentWindow) {
    super(
      `file://${__dirname}/../renderer/preferences-window.html`,
      { width: 800, height: 500, parent: parentWindow })
    ;
  }

  get key() {
    return key;
  }
}

export default PreferencesWindow
