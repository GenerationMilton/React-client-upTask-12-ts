
import type { Request, Response } from "express"
import Task from "../models/Task"

export class TaskController {

    static createTask = async (req: Request, res: Response) => {

        
        try {
            const task = new Task(req.body)
            console.log(task)
            task.project = req.project._id
            req.project.tasks.push(task._id)

            // Execute the two promises allSettled
            await Promise.allSettled([task.save(), req.project.save()])
            res.send('Tarea creada correctamente')
            console.log(task);
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }

    }

    static getProjectTasks = async(req: Request, res: Response) =>{
        try {
           const tasks = await Task.find({project: req.project._id})
           res.json(tasks) 
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

}