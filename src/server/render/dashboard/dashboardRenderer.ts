import { Request, Response } from 'express';
import path from 'path';
import { userCollection } from '../../database/databaseInterface';
import { viewPath } from '../../util/common';
import { generateNavBarItemList } from '../navBar/navBarGenerator';
export async function dashboardRenderer(req: Request, res: Response) {
    // TODO get from req, should be included when auth middleware auth successfully
    const user = await userCollection.findDocument({
        loginToken: req.cookies.loginToken,
    });
    //TODO redirect to unknown???
    if (!user) return res.redirect('/login');
    const pugObject = {
        navBarList: generateNavBarItemList(req),
        userName: user.name,
    };
    res.render(path.join(viewPath, 'dashboard', 'dashboard.pug'), pugObject);
}
