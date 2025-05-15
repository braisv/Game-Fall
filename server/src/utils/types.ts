export enum StatusError {
  fail = 'fail',
  error = 'error',
}

export enum StatusCode {
  ok = 200,
  // The request succeeded. The result and meaning of "success" depends on the HTTP method:
  created = 201,
  // The request succeeded, and a new resource was created as a result. This is typically the response sent after POST requests, or some PUT requests.
  accepted = 202,
  // The request has been received but not yet acted upon. It is noncommittal, since there is no way in HTTP to later send an asynchronous response indicating the outcome of the request. It is intended for cases where another process or server handles the request, or for batch processing.
  nonAuthoritative = 203,
  // This response code means the returned metadata is not exactly the same as is available from the origin server, but is collected from a local or a third-party copy. This is mostly used for mirrors or backups of another resource. Except for that specific case, the 200 OK response is preferred to this status.
  noContent = 204,
  // There is no content to send for this request, but the headers are useful. The user agent may update its cached headers for this resource with the new ones.
  reset = 205,
  // Tells the user agent to reset the document which sent this request.
  partialContent = 206,
  // This response code is used in response to a range request when the client has requested a part or parts of a resource.
  badRequest = 400,
  // The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
  unauthorized = 401,
  // Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
  forbidden = 403,
  // The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.
  notFound = 404,
  // The server cannot find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 Forbidden to hide the existence of a resource from an unauthorized client. This response code is probably the most well known due to its frequent occurrence on the web.
  serverError = 500,
  // The server has encountered a situation it does not know how to handle. This error is generic, indicating that the server cannot find a more appropriate 5XX status code to respond with.
}

export interface AppError extends Error {
  statusCode: number;
  status: keyof typeof StatusError;
  isOperational: boolean;
}

export interface MongoError extends AppError {
  path: string;
  value: string;
  code: number;
  keyValue: Error;
  errors: Error[];
}
