import * as restify from 'restify';
import { Router } from '../common/router';
import axios from 'axios';

class UsersRouter extends Router{

    constructor(){
        super();
        this.on('beforeRender', document => {   
            document.node_id = undefined;
        })
    }

    applyRoutes(application: restify.Server){

        application.get('/users', (req, resp, next)=> {
          
            axios.get('https://api.github.com/users')
                .then(this.render(resp, next))
                .catch(err => {
                    console.log(err);
                });
        });

        application.get('/users/:login/details', (req, resp, next)=>{
            const login = req.params.login;
            axios.get(`https://api.github.com/users/${login}`)
            .then(this.render(resp, next))
            .catch(err => {
                console.log(err);
            })
        })

        application.get('/users/:login/repos', (req, resp, next)=>{
            const login = req.params.login;
            axios.get(`https://api.github.com/users/${login}/repos`)
            .then(this.render(resp, next))
            .catch(err => {
                console.log(err);
            })
        })
    }
}

export const usersRouter = new UsersRouter()