import type { Request, Response, NextFunction } from 'express'
import Task, { ITask } from '../models/Task'

declare global {
    namespace Express {
        interface Request {
            task: ITask
        }
    }
}

export async function taskExists(req: Request, res: Response, next: NextFunction){
    try {
        
        const { taskId } = req.params
        console.log(taskId)
        const task = await Task.findById(taskId)

        if(!task){
            const error = new Error('Tarea no encontrada')
                return res.status(404).json({error: error.message})
            }
            console.log(task)
            req.task = task
            next()

    } catch (error) {
        res.status(500).json({error: 'Hubo un error'})
    }
}