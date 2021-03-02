class RequestError extends Error {
    constructor(message, code) {
        super(message);

        this.constructor = RequestError;
        this.__proto__ = RequestError.prototype;
        this.message = message;
        this.code = code;
    }
}

export default RequestError;
