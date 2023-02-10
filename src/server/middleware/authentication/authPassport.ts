import { NextFunction, Request, Response } from "express";

import passport from 'passport';
import { Strategy as LocalStrategy} from "passport-local" ;


export function PassportAuth(res:Request,req:Response,next:NextFunction){
    passport.use(new LocalStrategy(function verify(username,password,cb){
        //TODO  get from db
    }))
}