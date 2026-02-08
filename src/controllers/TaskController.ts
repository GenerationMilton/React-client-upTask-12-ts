import Project from "../models/Project"
import type { Request, Response } from "express"
import Task from "../models/Task"

export class TaskController {
    static createTask = async (req: Request, res: Response) => {

        const { projectId } = req.params
        //console.log(projectId)
        const project = await Project.findById(projectId)
        if(!project){
            const error = new Error('Proyecto no encontrado')
            return res.status(404).json({error: error.message})
        }
        console.log(project)
        try {
            const task = new Task(req.body)
            console.log(task)
            task.project = project._id
            project.tasks.push(task._id)
            await task.save()
            await project.save()
            res.send('Tarea creada correctamente')
            console.log(task);
        } catch (error) {
            console.log(error)
        }

    }
}