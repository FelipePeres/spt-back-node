"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const axios_1 = require("axios");
class UsersRouter extends router_1.Router {
    constructor() {
        super();
        this.on('beforeRender', document => {
            document.id = undefined;
            document.node_id = undefined;
        });
    }
    applyRoutes(application) {
        application.get('/users', (req, resp, next) => {
            axios_1.default.get('https://api.github.com/users')
                .then(this.render(resp, next))
                .catch(err => {
                console.log(err);
            });
        });
        application.get('/users/:login/details', (req, resp, next) => {
            const login = req.params.login;
            axios_1.default.get(`https://api.github.com/users/${login}`)
                .then(this.render(resp, next))
                .catch(err => {
                console.log(err);
            });
        });
        application.get('/users/:login/repos', (req, resp, next) => {
            const login = req.params.login;
            axios_1.default.get(`https://api.github.com/users/${login}/repos`)
                .then(this.render(resp, next))
                .catch(err => {
                console.log(err);
            });
        });
    }
}
exports.usersRouter = new UsersRouter();
