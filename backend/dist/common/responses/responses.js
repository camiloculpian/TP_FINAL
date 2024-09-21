"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = exports.responseStatus = void 0;
var responseStatus;
(function (responseStatus) {
    responseStatus["OK"] = "OK";
    responseStatus["ERROR"] = "ERROR";
    responseStatus["WARN"] = "WARN";
    responseStatus["INFO"] = "INFO";
    responseStatus["UNAUTH"] = "UNAUTH";
})(responseStatus || (exports.responseStatus = responseStatus = {}));
class Response {
    constructor(options) {
        this.statusCode = options.statusCode;
        this.status = options.status;
        this.message = options.message;
        this.data = options.data;
    }
}
exports.Response = Response;
//# sourceMappingURL=responses.js.map