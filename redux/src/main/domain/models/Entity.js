class Entity {
  constructor(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  equals(that) {
    if (that == null) {
      return false;
    }

    if (this.constructor.name != that.constructor.name) {
      return false
    }

    return this._id === that.id;
  }

}

export default Entity;
