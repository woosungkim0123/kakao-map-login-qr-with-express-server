export default class responseBody {
  constructor (statusCode, statusText, message, data) {
    this.statusCode = statusCode;
    this.statusText = statusText;
    this.message = message;
    this.data = data;
  }
}
