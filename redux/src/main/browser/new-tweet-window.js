import BaseWindow from './base-window'

const key = 'NewTweetWindow';

class NewTweetWindow extends BaseWindow {
  static KEY = key;

  constructor(url) {
    super(url, { width: 300, height: 200 });
  }

  get key() {
    return key;
  }
}

export default NewTweetWindow
