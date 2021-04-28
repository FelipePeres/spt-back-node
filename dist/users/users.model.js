"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const users = [
    { id: '1', name: 'Peter parker', email: 'peter@marvel.com' },
    { id: '2', name: 'Bruce wayne', email: 'bruce@dc.com' }
];
class User {
    static findAll() {
        axios_1.default.get('https://api.github.com/users')
            .then((users) => {
            return users;
        })
            .catch((error) => {
            console.log(error);
        });
    }
    static findById(id) {
        return new Promise(resolve => {
            const filtered = users.filter(user => user.id === id);
            let user = undefined;
            if (filtered.length > 0) {
                user = filtered[0];
            }
            resolve(user);
        });
    }
}
exports.User = User;
