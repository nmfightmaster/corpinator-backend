export class AppException extends Error {
  public status: number;
  public retryAfter?: number;

  constructor(status: number, message: string, retryAfter?: number) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.message = message;
    this.retryAfter = retryAfter;
  }
}
