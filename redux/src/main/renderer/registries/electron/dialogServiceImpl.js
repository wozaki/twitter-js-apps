import { remote, ipcRenderer, shell } from 'electron'

export const showErrorDialog = ({ title, body }) => {
  remote.dialog.showErrorBox(title, body);
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
