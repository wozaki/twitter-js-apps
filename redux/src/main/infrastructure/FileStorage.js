import fs from 'fs';

class FileStorage {

  constructor(dir, enc = 'utf-8') {
    this.dir = dir;
    this.enc = enc;
  }

  write(name, data) {
    const path = this._path(name);
    return fs.writeFileSync(path, data);
  }

  read(name) {
    const path = this._path(name);
    if (!fs.existsSync(path)) {
      return null;
    }

    return fs.readFileSync(path, this.enc);
  }

  _path(name) {
    return `${this.dir}/${name}`;
  }

}

export default FileStorage
