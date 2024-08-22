import type { Request, Response } from "express"
import Task from "../models/Task"
import { ValidationChain } from "express-validator"

export class TaskController {
    static createTask = async (req: Request, res: Response) => {
        try {
            const task = new Task(req.body)
            task.project = req.project.id
            req.project.tasks.push(task.id)
            await Promise.allSettled([task.save(), req.project.save()])
            res.send('Task created succesfully!')
        } catch (error) {
            res.status(500).json({error: 'There was an error!'})
        }
    }

    static getTask = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({project: req.project.id}).populate('project')
            res.json(tasks)
        } catch (error) {
            res.status(500).json({error: 'There was an error!'})
        }
    }

    static getTaskById = async (req: Request, res: Response) => {
        try {
            res.json(req.task)
        } catch (error) {
            res.status(500).json({error: 'There was an error!'})
        }
    }

    static updateTask = async (req: Request, res: Response) => {
        try {
            req.task.name = req.body.name
            req.task.description = req.body.description 
            await req.task.save()
            res.json(req.task)
        } catch (error) {
            res.status(500).json({error: 'There was an error!'})
        }
    }

    static deleteTaskById = async (req: Request, res: Response) => {
        try {
            req.project.tasks = req.project.tasks.filter(
                (task) => task.toString() !== req.task.id.toString()
            );

            await Promise.allSettled([req.task.deleteOne(), req.project.save()])

            res.json('Task deleted')
        } catch (error) {
            res.status(500).json({error: 'There was an error!'})
        }
    }

    static updateTaskStatus = async (req: Request, res: Response) => {
        try {
            const { status } = req.body
            req.task.status = status
            await req.task.save()
            res.send(req.task)
        } catch (error) {
            res.status(500).json({error: 'There was an error!'})
        }
    }
}