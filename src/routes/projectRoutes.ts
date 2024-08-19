import { Router } from 'express'
import { ProjectController } from '../controllers/ProjectControllers'
import { body, param } from 'express-validator'
import { handdleInputErrors } from '../middleware/validation'

const router = Router()

router.get('/', ProjectController.getAllProjects)

router.get('/:id',
    param('id')
        .isMongoId().withMessage('Invalid Id!'),
    handdleInputErrors,
    ProjectController.getProjectById
)

router.post('/', 
    body('projectName')
        .notEmpty().withMessage('Project Name is required!'),
    body('clientName')
        .notEmpty().withMessage('Client Name is required!'),
    body('description')
        .notEmpty().withMessage('Description Name is required!'),
    handdleInputErrors,
    ProjectController.createProject
)

router.put('/:id',
    param('id')
        .isMongoId().withMessage('Invalid Id!'),
    body('projectName')
        .notEmpty().withMessage('Project Name is required!'),
    body('clientName')
        .notEmpty().withMessage('Client Name is required!'),
    body('description')
        .notEmpty().withMessage('Description Name is required!'),
    handdleInputErrors,
    ProjectController.updateProjectById)
 
router.delete('/:id',
    param('id')
        .isMongoId().withMessage('Invalid Id!'),
    handdleInputErrors,
    ProjectController.deleteProjectById
)

/** Routes for tasks */


export default router