import { Router } from 'express'
import { ProjectController } from '../controllers/ProjectControllers'
import { body, param } from 'express-validator'
import { handdleInputErrors } from '../middleware/validation'
import { TaskController } from '../controllers/TaskController'
import { validateProjectExists } from '../middleware/project'
import { taskBelongsToProject, validateTaskExists } from '../middleware/task'

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
router.param('projectId', validateProjectExists)
router.param('taskId', validateTaskExists)
router.param('taskId', taskBelongsToProject)

router.post('/:projectId/tasks',
    body('name')
        .notEmpty().withMessage('Task Name is required!'),
    body('description')
        .notEmpty().withMessage('Description Name is required!'),
    handdleInputErrors,
    TaskController.createTask
)

router.get('/:projectId/tasks',
    TaskController.getTask
)

router.get('/:projectId/tasks/:taskId',
    param('taskId')
    .isMongoId().withMessage('Invalid Id!'),
    TaskController.getTaskById
)

router.put('/:projectId/tasks/:taskId',
    param('taskId')
        .isMongoId().withMessage('Invalid Id!'),
    body('name')
        .notEmpty().withMessage('Task Name is required!'),
    body('description')
        .notEmpty().withMessage('Description Name is required!'),
    handdleInputErrors,
    TaskController.updateTask
)

router.delete('/:projectId/tasks/:taskId',
    param('taskId')
        .isMongoId().withMessage('Invalid Id!'),
    TaskController.deleteTaskById
)

router.post('/:projectId/tasks/:taskId/status',
    param('taskId')
        .isMongoId().withMessage('Invalid Id!'),
    body('status')
        .notEmpty().withMessage('Status is required!'),
    handdleInputErrors,
    TaskController.updateTaskStatus
)

export default router