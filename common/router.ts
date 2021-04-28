 import * as restify from 'restify';
 import { EventEmitter } from 'events';


 export abstract class Router extends EventEmitter{
    abstract applyRoutes(application: restify.Server);

    render(response: restify.Response, next: restify.Next){
       return (document: any) => {
         if(document.data){
            this.emit('beforeRender', document.data);
            response.json(document.data)
         }else{
            response.send(404);
         }
         return next();
       }
    }
 }