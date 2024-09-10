const apiKey = process.env.API_KEY
const BASE_URL = "https://www.googleapis.com/youtube/v3"
import { Request, Response } from "express"
import { YoutubeService } from "../services/YoutubeService"


export class YoutubeController {
    private youtubeService: YoutubeService

    constructor() {
        this.youtubeService = new YoutubeService()
    }
    getVideos = async (req: Request, res: Response) => {
        const query = req.query.search_query
        if (!query) {
            res.status(400).send({ message: "Please provide a search query" })
            return
        }
        console.log("Fetching the data...")
        const response = await this.youtubeService.getVideos(query.toString())
        res.send(response)
    }

    getVideoDetails = async (req: Request, res: Response) => {
        const videoId = req.query.video_id as string;
        if (!videoId) {
            res.status(400).send({ message: "Please provide a video id" })
            return
        }
        console.log("Fetching the data...")
        const response = await this.youtubeService.getVideoDetails(videoId)
        res.send(response)
    }
    getVideoLicense = async (req: Request, res: Response) => {
        let videoId = req.query.video_id as string;
        console.log(videoId)
        if (!videoId) {
            res.status(400).send({ message: "Please provide a video id" })
            return
        }
        // videoId = this.youtubeService.extractVideoId(videoId)
        console.log(videoId)
        console.log("Fetching the data...")
        const response = await this.youtubeService.getVideoLicense(videoId.toString())
        res.json({
            "data": response["items"][0]["contentDetails"]["licensedContent"],
            "name": "",
            "url": `https://youtube.com/embed/${videoId}`
        });
    }
} 







