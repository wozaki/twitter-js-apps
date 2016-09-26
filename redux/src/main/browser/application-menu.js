import { EventEmitter } from 'events'
import { Menu, shell } from 'electron'

export default class ApplicationMenu extends EventEmitter {
  constructor() {
    super();
    const self = this;
    Menu.setApplicationMenu(
      Menu.buildFromTemplate(
        [
          {
            label: 'Application',
            submenu: [
              {
                label: 'About',
                click() {
                  shell.openExternal('https://github.com/wozaki/twitter-js-apps');
                }
              },
              {
                type: 'separator'
              },
              {
                label: 'Quit',
                accelerator: 'Command+Q',
                click() {
                  self.emit('quit');
                }
              },
              {
                type: 'separator'
              },
              {
                label: 'Preferences...',
                accelerator: 'Command+,',
                click() {
                  self.emit('open-preferences');
                }
              },
            ]
          },
          {
            label: 'Tweet', //TODO: disable until login
            submenu: [
              {
                label: 'New Tweet',
                accelerator: 'Command+N',
                click() {
                  self.emit('new-tweet')
                }
              }
            ]
          },
          {
            label: 'Edit',
            submenu: [
              {
                label: 'Undo',
                accelerator: 'Command+Z',
                selector: 'undo:'
              },
              {
                label: 'Redo',
                accelerator: 'Shift+Command+Z',
                selector: 'redo:'
              },
              {
                type: 'separator'
              },
              {
                label: 'Cut',
                accelerator: 'Command+X',
                selector: 'cut:'
              },
              {
                label: 'Copy',
                accelerator: 'Command+C',
                selector: 'copy:'
              },
              {
                label: 'Paste',
                accelerator: 'Command+V',
                selector: 'paste:'
              },
              {
                label: 'Select All',
                accelerator: 'Command+A',
                selector: 'selectAll:'
              }
            ]
          },
          {
            label: 'View',
            submenu: [
              {
                label: 'Reload',
                accelerator: 'Command+R',
                click() {
                  self.emit('reload');
                }
              },
              {
                label: 'Open DevTools',
                accelerator: 'Alt+Command+I',
                click() {
                  self.emit('open-dev-tools');
                }
              }
            ]
          }
        ]
      )
    );
  }
}
