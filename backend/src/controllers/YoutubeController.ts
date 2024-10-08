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
        try {
            let videoId = req.query.video_id as string;
            videoId = this.getYouTubeVideoId(videoId);

            if (!videoId) {
                return res.status(400).json({ message: "Please provide a valid YouTube video ID." });
            }
    
            console.log("Fetching the data for video ID:", videoId);
    
            const response = await this.youtubeService.getVideoLicense(videoId.toString());

            if (!response) {
                return res.status(404).json({ message: "Video not found. Invalid video ID." });
            }

            res.status(200).send(response);
        } catch (error: any) {
            console.error('Error fetching video license:', error.message);
    
            res.status(500).json({ message: "An error occurred while fetching the video." });
        }
    };
    getVideoLicenseByVideoName = async (req: Request, res: Response) => {
        try {
            let videoName = req.query.video_name as string;
            if (!videoName) {
                return res.status(400).json({ message: "Please provide a video name." });
            }

            console.log("Fetching the data for video name:", videoName);

            const response = await this.youtubeService.getVideoLicenseByVideoName(videoName);
            
            if (!response) {
                return res.status(404).json({ message: "Video not found. Invalid video name." });
            }

            res.status(200).send(response);
        } catch (error: any) {
            console.error('Error fetching video license:', error.message);
    
            res.status(500).json({ message: "An error occurred while fetching the video." });
        }
    }
}







