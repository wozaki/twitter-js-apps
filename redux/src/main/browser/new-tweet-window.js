import BaseWindow from './base-window'

class NewTweetWindow extends BaseWindow {
  constructor(url) {
    super(url, { width: 300, height: 200 });
  }
}

export default NewTweetWindow
