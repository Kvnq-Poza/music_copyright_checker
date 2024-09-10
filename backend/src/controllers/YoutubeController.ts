const apiKey = process.env.API_KEY
const BASE_URL = "https://www.googleapis.com/youtube/v3"
import { Request, Response } from "express"
import { YoutubeService } from "../services/YoutubeService"

export class YoutubeController {
    private youtubeService: YoutubeService

    constructor() {
        this.youtubeService = new YoutubeService()
    }
     getYouTubeVideoId = (url: string): string => {
        let videoId: string = '';
    
        // Check if the URL is a shortened youtu.be URL
        if (url.includes('youtu.be/')) {
            const parts = url.split('youtu.be/');
            if (parts.length > 1) {
                videoId = parts[1];
            }
        }
        // Check if the URL is a standard youtube.com URL
        else if (url.includes('youtube.com/watch')) {
            const parts = url.split('v=');
            if (parts.length > 1) {
                videoId = parts[1].split('&')[0]; // Handle additional query parameters
            }
        }
    
        return videoId;
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
        videoId = this.getYouTubeVideoId(videoId)
        
        console.log(videoId)
        if (!videoId) {
            res.status(400).send({ message: "Please provide a video id" })
            return
        }
        // videoId = this.youtubeService.extractVideoId(videoId)
        console.log(videoId)
        console.log("Fetching the data...")
        const response = await this.youtubeService.getVideoLicense(videoId.toString())
        res.send(response);
    }
    getVideoLicenseByVideoName = async (req: Request, res: Response) => {
        const videoName = req.query.video_name as string;
        if (!videoName) {
            res.status(400).send({ message: "Please provide a video name" })
            return
        }
        console.log("Fetching the data...")
        const response = await this.youtubeService.getVideoLicenseByVideoName(videoName)
        res.send(response)
    }
} 







