import { app } from 'electron'
import FileStorage from './FileStorage'
import AccountRepository from './account-repository'

const dir = app.getPath('userData');
const storage = new FileStorage(dir);

export const accountRepository = new AccountRepository(storage);
