import Project from "../models/Project"
import type { Request, Response } from "express"

export class TaskController {
    static createProject = async (req: Request, res: Response) => {

        const { projectId } = req.params
        console.log(projectId)
        // const project = await Project
        try {
            
        } catch (error) {
            console.log(error)
        }

    }
}