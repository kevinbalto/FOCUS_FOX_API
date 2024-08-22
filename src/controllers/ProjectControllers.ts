import type { Request, Response } from "express"
import Project from "../models/Project"

export class ProjectController {
    
    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({})
            res.json(projects)
        } catch (error) {
            res.status(500).json({error: 'There was an error!'})
        }
    }

    static getProjectById = async (req: Request, res: Response) => { 
        const { id } = req.params
        try {
            const project = await Project.findById(id).populate('tasks')

            if (!project) {
                const error = new Error('Project not found!')
                return res.status(404).json({error: error.message})
            }

            res.json(project)
        } catch (error) {
            res.status(500).json({error: 'There was an error!'})
        }
    }

    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body)
        try {
            await project.save()
            res.send('Project created sucessfully!')
        } catch (error) {
            res.status(500).json({error: 'There was an error!'})
        }        
    }

    static updateProjectById = async (req: Request, res: Response) => { 
        const { id } = req.params
        try {
            const project = await Project.findById(id)
            if (!project) {
                const error = new Error('Project not found!')
                return res.status(404).json({error: error.message})
            }
            project.projectName = req.body.projectName
            project.clientName = req.body.clientName
            project.description = req.body.description
            await project.save()
            res.json(project)
        } catch (error) {
            res.status(500).json({error: 'There was an error!'})
        }
    }

    static deleteProjectById = async (req: Request, res: Response) => { 
        const { id } = req.params
        try {
            const project = await Project.findById(id)

            if (!project) {
                const error = new Error('Project not found!')
                return res.status(404).json({error: error.message})
            }

            await project.deleteOne()
            res.json('Project deleted!')
        } catch (error) {
            res.status(500).json({error: 'There was an error!'})
        }
    }
}