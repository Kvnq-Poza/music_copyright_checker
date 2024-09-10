import { TagService } from "../services/tagService";
import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";


export class TagController {
    private tagService: TagService

    constructor() {
        this.tagService = new TagService()
        this.getAllTags = this.getAllTags.bind(this)
        this.getTagByName = this.getTagByName.bind(this)
        this.updateTagCount = this.updateTagCount.bind(this)
        this.getTopTags = this.getTopTags.bind(this)
        this.deleteAll = this.deleteAll.bind(this)
    }

    async getAllTags(req: Request, res: Response): Promise<void> {
        try {
            const tags = await this.tagService.getAllTags()
            res.status(200).json(tags)
        } catch (error:any) {
            res.json({ message: error.message })
        }
    }

    async getTagByName(req: Request, res: Response): Promise<void> {
        try {
            const tagName = req.params.tagName
            const tag = await this.tagService.getTagByName(tagName)
            if (tag) {
                res.status(200).json(tag)
            } else {
                res.status(404).json({ message: "Tag not found" })
            }
        } catch (error:any) {
            res.json({ message: error.message })
        }
    }

    async updateTagCount(req: Request, res: Response): Promise<void> {
        try {
            const tagName = req.params.tagName
            const tag = await this.tagService.updateTagCount(tagName)
            if (tag) {
                res.status(200).json(tag)
            } else {
                res.status(404).json({ message: "Tag not found" })
            }
        } catch (error:any) {
            res.json({ message: error.message })
        }
    }

    async getTopTags(req: Request, res: Response): Promise<void> {
        try {
            const topN = parseInt(req.params.topN)
            const topTags = await this.tagService.getTopTags(topN)
            res.status(200).json(topTags)
        } catch (error:any) {
            res.json({ message: error.message })
        }
    }

    async deleteAll(req: Request, res: Response): Promise<void> {
        try {
            const message = await this.tagService.deleteAll()
            res.status(200).json({ message: message })
        } catch (error:any) {
            res.status(500).json({ message: error.message })
        }
    }
}