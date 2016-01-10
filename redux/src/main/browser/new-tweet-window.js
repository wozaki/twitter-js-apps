import BrowserWindow from 'browser-window'

export default class NewTweetWindow {
    constructor() {
        this.win = new BrowserWindow({width: 300, height: 200}); //TODO: avoid to open in front of another NewTweetWindow
        this.win.loadURL(`file://${__dirname}/../renderer/new-tweet-window.html`);
        this.win.on('closed', () => {
            this.win = null;
        });
    }
}
