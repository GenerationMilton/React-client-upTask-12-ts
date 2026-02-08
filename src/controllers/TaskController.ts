
import type { NextFunction, Request, Response } from "express"
import Task from "../models/Task"
import { ValidationChain } from "express-validator"

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
           const tasks = await Task.find({project: req.project._id}).populate('project')
           res.json(tasks) 
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static getTaskById = async (req: Request, res: Response) =>{
        try {
            const { taskId } = req.params
            const task = await Task.findById(taskId)
            if(!task){
                const error =new Error('Tarea no encontrada')
                return res.status(404).json({error: error.message})
            }
            if(task.project.toString() !== req.project._id.toString()){
                const error = new Error('Acción no válida')
                return res.status(400).json({error: error.message})
            }
            res.json(task)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

     static updateTask = async(req: Request, res: Response) => {
       try {
            const { taskId } = req.params
            const task = await Task.findById(taskId)
            if(!task){
                const error = new Error('Tarea no encontrada')
                return res.status(404).json({error: error.message})
            }
            if(task.project.toString() !== req.project._id.toString()){
                const error = new Error('Accion no válida')
                return res.status(400).json({error: error.message})
            }
            task.name = req.body.name
            task.description = req.body.description
            await task.save()
            res.send("Tarea Actualizada Correctamente")
       } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
       }
    }

     static deleteTask = async(req: Request, res: Response) => {
       try {
            const { taskId } = req.params
            const task = await Task.findById(taskId, req.body)
            if(!task){
                const error = new Error('Tarea no encontrada')
                return res.status(404).json({error: error.message})
            }
    
            req.project.tasks = req.project.tasks.filter( task => task.toString() !== taskId )
            await Promise.allSettled([task.deleteOne(), req.project.save()])

            res.send("Tarea Eliminada Correctamente")
       } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
       }
    }

}