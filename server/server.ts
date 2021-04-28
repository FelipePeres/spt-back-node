import * as restify from 'restify';
import * as corsMiddleware from 'restify-cors-middleware';
import { environment } from '../common/environment';
import {Router} from '../common/router';
import { mergePatchBodyParser } from './merge-patch.parser';

export class Server{

    application : restify.Server;

    initRoutes(routers: Router[]):Promise<any>{

        return new Promise((resolve, reject)=>{
            try {
                this.application = restify.createServer({
                    name:"meat-api",
                    version: "1.0.0"
                });

                const corsOptions: corsMiddleware.Options ={
                    preflightMaxAge: 86400,
                    origins:['*'],
                    allowHeaders:null,
                    exposeHeaders:null,
                } 
                const cors: corsMiddleware.CorsMiddleware = corsMiddleware(corsOptions);

                this.application.pre(cors.preflight);

                this.application.use(cors.actual);
                this.application.use(restify.plugins.bodyParser());
                this.application.use(mergePatchBodyParser);

                for(let router of routers){
                    router.applyRoutes(this.application)
                }
                this.application.listen(environment.server.port, () => {
                    resolve(this.application); 
                });

            } catch (error) {
                reject(error);
                
            }            
        })
    }

    async bootstrap(routers: Router[] = []): Promise<Server>{
        await this.initRoutes(routers);
        return this;
    }
}