import { app } from 'electron'
import FileStorage from '../infrastructure/FileStorage'
import CredentialRepository from '../domain/models/CredentialRepository'

const dir = app.getPath('userData');
const storage = new FileStorage(dir);

export const credentialRepository = new CredentialRepository(storage);
