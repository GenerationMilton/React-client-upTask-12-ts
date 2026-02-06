import { request, type Request, type Response } from 'express';
import Project from '../models/Project';

export class ProjectController {

    //execute the controler method calling from routes

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

      static getAllProjects = async(req: Request, res: Response) =>{
        try {
            const projects = await Project.find({})
            res.json(projects)

        } catch (error) {
            
        }
    }

    static getProjectById = async(req: Request, res: Response) =>{
        const { id } = req.params;
        console.log(id)
        try {
            const project = await Project.findById(id)
            if(!project){
                const error = new Error('Proyecto no encontrado')
                return res.status(404).json({error: error.message})
            }
            res.json(project)

        } catch (error) {
            
        }
    }

}