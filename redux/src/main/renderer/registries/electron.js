import { remote } from 'electron'

export const credential = remote.getGlobal('credential');
