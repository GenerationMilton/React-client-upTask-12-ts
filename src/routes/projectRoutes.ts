import { Router } from 'express'
import { ProjectController } from '../controllers/ProjectController'

const router = Router()

//Http method to call
router.get('/', ProjectController.getAllProjects )

export default router