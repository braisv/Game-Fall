"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusCode = exports.StatusError = void 0;
var StatusError;
(function (StatusError) {
    StatusError["fail"] = "fail";
    StatusError["error"] = "error";
})(StatusError || (exports.StatusError = StatusError = {}));
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["ok"] = 200] = "ok";
    // The request succeeded. The result and meaning of "success" depends on the HTTP method:
    StatusCode[StatusCode["created"] = 201] = "created";
    // The request succeeded, and a new resource was created as a result. This is typically the response sent after POST requests, or some PUT requests.
    StatusCode[StatusCode["accepted"] = 202] = "accepted";
    // The request has been received but not yet acted upon. It is noncommittal, since there is no way in HTTP to later send an asynchronous response indicating the outcome of the request. It is intended for cases where another process or server handles the request, or for batch processing.
    StatusCode[StatusCode["nonAuthoritative"] = 203] = "nonAuthoritative";
    // This response code means the returned metadata is not exactly the same as is available from the origin server, but is collected from a local or a third-party copy. This is mostly used for mirrors or backups of another resource. Except for that specific case, the 200 OK response is preferred to this status.
    StatusCode[StatusCode["noContent"] = 204] = "noContent";
    // There is no content to send for this request, but the headers are useful. The user agent may update its cached headers for this resource with the new ones.
    StatusCode[StatusCode["reset"] = 205] = "reset";
    // Tells the user agent to reset the document which sent this request.
    StatusCode[StatusCode["partialContent"] = 206] = "partialContent";
    // This response code is used in response to a range request when the client has requested a part or parts of a resource.
    StatusCode[StatusCode["badRequest"] = 400] = "badRequest";
    // The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
    StatusCode[StatusCode["unauthorized"] = 401] = "unauthorized";
    // Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
    StatusCode[StatusCode["forbidden"] = 403] = "forbidden";
    // The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server.
    StatusCode[StatusCode["notFound"] = 404] = "notFound";
    // The server cannot find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 Forbidden to hide the existence of a resource from an unauthorized client. This response code is probably the most well known due to its frequent occurrence on the web.
    StatusCode[StatusCode["serverError"] = 500] = "serverError";
    // The server has encountered a situation it does not know how to handle. This error is generic, indicating that the server cannot find a more appropriate 5XX status code to respond with.
})(StatusCode || (exports.StatusCode = StatusCode = {}));
//# sourceMappingURL=types.js.map