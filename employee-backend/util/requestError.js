module.exports = class extends Error {
  constructor (name ,messsage,status) {
    super(messsage);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.status = status || 400;
  }
};