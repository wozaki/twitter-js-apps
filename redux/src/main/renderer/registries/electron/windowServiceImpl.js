import { remote, ipcRenderer, shell } from 'electron'


/**
 * https://electron.atom.io/docs/api/browser-window/#winsetsizewidth-height-animate
 * @param title
 * @param body
 */
export const resize = ({ width }) => {
  const win = remote.getCurrentWindow();
  win.setSize(width, 800)
};

export const expand = (width) => {
  const win = remote.getCurrentWindow();
  const [currentWidth, currentHeight] = win.getSize();

  console.log("CALL EXPAND!!")
  win.setSize(currentWidth + width, currentHeight)
};

// export const showNewTweetDialog = () => {
//   ipcRenderer.send('open-new-tweet-window');
// };
