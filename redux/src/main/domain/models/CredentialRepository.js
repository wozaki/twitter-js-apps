import Credential from './Credential'

const NAME = 'credential';

class CredentialRepository {

  constructor(storage) {
    this.storage = storage;
  }

  store(credential) {
    const json = credential.toJson;
    const data = JSON.stringify(json);

    return this.storage.write(NAME, data);
  }

  restore() {
    const raw = this.storage.read(NAME);
    const json = JSON.parse(raw);

    if (json == null) {
      return null
    }

    return Credential.fromJson(json);
  }

  existsAtLeastOne() {
    const credential = this.restore();
    return credential != null;
  }

}

export default CredentialRepository
