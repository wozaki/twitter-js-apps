import { remote, ipcRenderer } from 'electron'

export const showErrorDialog = ({ title, body }) => {
  remote.dialog.showErrorBox(title, body);
};

export const addAccount = (onAddedAccount) => {
  ipcRenderer.send('add-account');
  ipcRenderer.on('added-account', (event, credential) => {
    onAddedAccount(credential);
  });
};
