import { app } from 'electron'
import Storage from './storage'
import AccountRepository from './account-repository'

const dir = app.getPath('userData');
const storage = new Storage(dir);

export const accountRepository = new AccountRepository(storage);
