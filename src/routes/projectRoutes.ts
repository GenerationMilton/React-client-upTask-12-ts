import { Router } from 'express'
import { ProjectController } from '../controllers/ProjectController'
import { body } from 'express-validator'
import { handleInputErrors } from '../middleware/validation'

const router = Router()

//Http method to call
router.get('/',ProjectController.getAllProjects

)
router.post('/', 
    body('projectName')
        .notEmpty().withMessage('El nombre del Proyecto es Obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El nombre del Cliente es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripción del Proyecto es Obligatoria'),
    handleInputErrors,    
    ProjectController.createProject
)

export default router