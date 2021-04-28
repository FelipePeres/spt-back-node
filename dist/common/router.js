"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class Router extends events_1.EventEmitter {
    render(response, next) {
        return (document) => {
            if (document.data) {
                this.emit('beforeRender', document.data);
                response.json(document.data);
            }
            else {
                response.send(404);
            }
            return next();
        };
    }
}
exports.Router = Router;
