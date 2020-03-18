import { IUser } from '../models/user-model';
import * as userService from '../services/user-service'
import { Router, Request, Response } from 'express';

export const router = Router();

router.get('/user/createuser', (req: Request, res: Response) => {
    console.log('Request at /user/createuser route received');
    const name: string = req.query.name;
    if (!name) {
        res.status(400).send('Missing URL parameter: name');
    }
    userService.createUser(name).then((user: IUser) => {
        res.status(200).send(user);
    }).catch((err) => {
        console.log(err);
        res.status(500).send(err);
    });
});

router.get('/user/getuser', (req: Request, res: Response) => {
    console.log('Request at /user/getuser route received');
    const id: string = req.query.id;
    if (!id) {
        res.status(400).send('Missing URL parameter: id');
    }
    userService.getUser(id).then((user: IUser) => {
        res.status(200).send(user);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

router.get('/user/getallusers', (_req: Request, res: Response) => {
    console.log('Request at /user/getallusers route received');
    userService.getAllUsers().then((users: IUser[]) => {
        res.status(200).send(users);
    }).catch((err) => {
        res.status(500).send(err);
    });
});