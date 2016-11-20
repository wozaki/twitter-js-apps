import { ipcRenderer } from 'electron'
import _ from 'lodash';

const THRESHOLD_DELTA_X       = 70;
const THRESHOLD_LIMIT_DELTA_Y = 50;
const THRESHOLD_TIME          = 50;

export const register = (targetDOM) => {
  var tracking  = false;
  var deltaX    = 0;
  var deltaY    = 0;
  var startTime = 0;
  var time      = 0;

  targetDOM.addEventListener('wheel', _.throttle((e) => {
    if (tracking) {
      deltaX = deltaX + e.deltaX;
      deltaY = deltaY + e.deltaY;
      time   = (new Date()).getTime() - startTime;
    }
  }, 20));

  ipcRenderer.on('scroll-touch-begin', () => {
    tracking  = true;
    startTime = (new Date()).getTime();
  });

  ipcRenderer.on('scroll-touch-end', () => {
    if (time > THRESHOLD_TIME && tracking && Math.abs(deltaY) < THRESHOLD_LIMIT_DELTA_Y) {
      if (deltaX > THRESHOLD_DELTA_X) {
        // ipcRenderer.send('go-forward');
      } else if (deltaX < -THRESHOLD_DELTA_X) {
        ipcRenderer.send('go-back');
      }
    }
    tracking  = false;
    deltaX    = 0;
    deltaY    = 0;
    startTime = 0;
  })
};
