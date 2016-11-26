import { app } from 'electron'
import FileStorage from '../infrastructure/FileStorage'

const dir = app.getPath('userData');
const storage = new FileStorage(dir);
