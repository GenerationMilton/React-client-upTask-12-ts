import type { Request, Response } from 'express';
import Project from '../models/Project';

export class ProjectController {

    //execute the controler method calling from routes
    static getAllProjects = async(req: Request, res: Response) =>{
        res.send('Todos los proyectos');
    }

     static createProject = async(req: Request, res: Response) =>{
        console.log(req.body)
        const project = new Project(req.body);

        try {
            await project.save()
            res.send('Proyecto Creado Correctamente')
        } catch (error) {
            console.log(error)
        }

    }
}