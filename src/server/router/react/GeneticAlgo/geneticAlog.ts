import { Request, Response } from 'express';
import path from 'path';
import { config } from '../../../../config/config';

export function geneticAlgoRenderer(req: Request, res: Response) {
    res.sendFile(path.join(config.reactPath, 'geneticAlgo', 'index.html'));
}
