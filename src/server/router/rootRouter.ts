import { userCollection } from '../database/databaseInterface';
import { homepageRendererCallback } from '../render/homepage/homepageRenderer';
import { userManager } from '../user/userManager';
import { loginRouter } from './login/loginRouter.js';
import { dashboardRouter } from './dashboard/dashboardRouter';
import { schoolRouter } from './school/schoolRouter';
import { hash } from '../util/common';
import { API_Router } from './API/API_Router';

import { Express } from 'express';
import { reactRouter } from './react/reactRouter';
function setupDevRouter(app: Express) {
    console.warn('Using non production methods in rootRouter');
    app.post('/createLogin_Test', (req, res) => {
        // const { name, password } = req.body;
        const name = req.body.user;
        const password = req.body.password;
        hash(
            { password: password as string },
            function (err, pass, salt, hash) {
                userManager
                    .createUser(name as string, hash, salt)
                    .catch((err) => {
                        console.log(err);
                        res.status(401);
                        res.end();
                    })
                    .then((user) => {
                        res.end();
                    });
            }
        );
    });
}
export function setupRouter(app: Express) {
    // basic root get
    app.get('/', homepageRendererCallback);
    // router for all sub path
    app.use(...API_Router());
    app.use(...loginRouter());
    app.use(...dashboardRouter());
    app.use(...schoolRouter());
    app.use(...reactRouter());
    if (process.env.NODE_ENV === 'development') {
        setupDevRouter(app);
    }
}
