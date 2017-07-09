import { remote, ipcRenderer, shell } from 'electron'

export const showErrorDialog = ({ title, body }) => {
  remote.dialog.showErrorBox(title, body);
};

/**
 * https://github.com/electron/electron/blob/master/docs/api/dialog.md#methods
 */
const chooseFile = ({ title, filters }, callback) => {
  const win = remote.getCurrentWindow();
  remote.dialog.showOpenDialog(
    win, {
      title,
      properties: ['openFile'],
      filters,
    },
    callback
  )
};

export const chooseImageFile = ({ title, extensions }, callback) => {
  chooseFile({ title, filters: [{ name: 'Images', extensions }] }, callback)
};

/**
 * @callback onAddedAccount
 * @param {Credential} credential
 */
/**
 * @param {onAddedAccount} onAddedAccount
 */
export const addAccount = (onAddedAccount) => {
  ipcRenderer.send('add-account');
  ipcRenderer.on('added-account', (event, credential) => {
    onAddedAccount(credential);
  });
};

export const showNewTweetDialog = () => {
  ipcRenderer.send('open-new-tweet-window');
};

export const openUrl = (url) => {
  shell.openExternal(url);
};
