// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import path from 'path';
export const hash: (
    passwordHash_Salt: { password: string; salt?: string },
    callback: (
        err: unknown,
        password: string,
        salt: string,
        hash: string
    ) => void
    // eslint-disable-next-line @typescript-eslint/no-var-requires
) => void = require('pbkdf2-password')({ digest: 'sha256' });
//
export const rootPath: string = path.join(__dirname, '..', '..');
//
export const port: number = Number(process.env.PORT) || 80;
export const mongodbUrl = 'mongodb://localhost:27017';
//
export const viewPath: string = path.join(rootPath, 'client', 'html', 'view');
export const cssPath: string = path.join(rootPath, 'client', 'static', 'css');
export const publicJSPath: string = path.join(
    rootPath,
    'client',
    'static',
    'javascript'
);
export const htmlStructurePath: string = path.join(
    rootPath,
    'client',
    'static',
    'html',
    'structure'
);
//
export enum AvailableSchool {
    HKUST = 'HKUST',
}
export const SchoolList: string[] = Object.keys(AvailableSchool);
//
export const errorPath: string = path.join(rootPath, 'client', 'html', 'error');
//
