import fs from 'fs';

export default class Media {

  static get IMAGE_FILE_EXTENSIONS() {
    return ['jpg', 'jpeg', 'png', 'gif'];
  }

  static build(filePath) {
    const buffer = fs.readFileSync(filePath);
    const extension = filePath.split('.').pop();
    // Media.IMAGE_FILE_EXTENSIONS.includes(extension)
    return new Media(buffer, extension);
  }

  constructor(buffer, extension, id = null ) {
    this.buffer = buffer;
    this.extension = extension;
    this.id = id;
  }

  toBase64() {
    return this.buffer.toString('base64')
  }

  /**
   * @param {string} mediaId
   * @return {Media}
   */
  uploaded(mediaId) {
    return new Media(this.buffer, this.extension, mediaId);
  }

}
