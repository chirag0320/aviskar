export class RequestException extends Error {
    statusCode: number = 0
    body: any | undefined = undefined
    constructor(status: number, statusText: string, body: any) {
      super(statusText)
      this.statusCode = status
      this.body = body
      Object.setPrototypeOf(this, RequestException.prototype)
    }
  
    static getMessage({
      error,
      index = 0,
    }: {
      error: RequestException
      index: number
    }) {
      return (error?.body[index] && error.body[index].message) || error.message
    }
  }
  