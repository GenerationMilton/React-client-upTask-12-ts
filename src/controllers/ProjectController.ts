import type { Request, Response } from 'express';

export class ProjectController {

    //execute the controler method calling from routes
    static getAllProjects = async(req: Request, res: Response) =>{
        res.send('Todos los proyectos');
    }
}