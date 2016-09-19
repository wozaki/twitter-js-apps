import BaseWindow from './base-window'

class PreferencesWindow extends BaseWindow {
  constructor(parentWindow) {
    super(
      `file://${__dirname}/../renderer/preferences-window.html`,
      { width: 800, height: 500, parent: parentWindow })
    ;
  }
}

export default PreferencesWindow
