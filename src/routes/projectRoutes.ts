import { Router } from 'express'
import { ProjectController } from '../controllers/ProjectController'

const router = Router()

//Http method to call
router.get('/', ProjectController.getAllProjects)
router.post('/', ProjectController.createProject)

export default router