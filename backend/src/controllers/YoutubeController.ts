const apiKey = process.env.API_KEY
const BASE_URL = "https://www.googleapis.com/youtube/v3"
import { Request, Response } from "express"
import { YoutubeService } from "../services/YoutubeService"
import axios from "axios"

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
    checkCopyright = async (req: Request, res: Response) => {
        try {
            const { youtube_url } = req.body;
            if (!youtube_url) {
                return res.status(400).json({ message: "Please provide a YouTube URL." });
            }

            const tubePilotUrl = process.env.TUBEPILOT_URL || 'https://tubepilot.ai/wp-json/tubepilot/v1';
            const apiKey = process.env.TUBEPILOT_API_KEY;

            const response = await axios.post(
                `${tubePilotUrl}/copyright-check`,
                { youtube_url },
                { headers: { 'X-API-Key': apiKey } }
            );

            res.status(200).json(response.data);
        } catch (error: any) {
            console.error('Error checking copyright:', error.response?.data || error.message);
            res.status(error.response?.status || 500).json({ 
                message: error.response?.data?.message || "An error occurred while checking copyright." 
            });
        }
    }

    searchMusic = async (req: Request, res: Response) => {
        try {
            const { query = '', genre = '', mood = '', channels = [], page = 1, per_page = 10, sort = 'recent' } = req.body;

            const tubePilotUrl = process.env.TUBEPILOT_URL || 'https://tubepilot.ai/wp-json/tubepilot/v1';
            const apiKey = process.env.TUBEPILOT_API_KEY;

            const response = await axios.post(
                `${tubePilotUrl}/search`,
                { query, genre, mood, channels, page, per_page, sort },
                { headers: { 'X-API-Key': apiKey } }
            );

            res.status(200).json(response.data);
        } catch (error: any) {
            console.error('Error searching music:', error.response?.data || error.message);
            res.status(error.response?.status || 500).json({ 
                message: error.response?.data?.message || "An error occurred while searching music." 
            });
        }
    }

    getGenres = async (req: Request, res: Response) => {
        try {
            const tubePilotUrl = process.env.TUBEPILOT_URL || 'https://tubepilot.ai/wp-json/tubepilot/v1';
            const apiKey = process.env.TUBEPILOT_API_KEY;

            const response = await axios.get(
                `${tubePilotUrl}/genres`,
                { headers: { 'X-API-Key': apiKey } }
            );

            res.status(200).json(response.data);
        } catch (error: any) {
            console.error('Error fetching genres:', error.response?.data || error.message);
            res.status(error.response?.status || 500).json({ 
                message: error.response?.data?.message || "An error occurred while fetching genres." 
            });
        }
    }

    getMoods = async (req: Request, res: Response) => {
        try {
            const tubePilotUrl = process.env.TUBEPILOT_URL || 'https://tubepilot.ai/wp-json/tubepilot/v1';
            const apiKey = process.env.TUBEPILOT_API_KEY;

            const response = await axios.get(
                `${tubePilotUrl}/moods`,
                { headers: { 'X-API-Key': apiKey } }
            );

            res.status(200).json(response.data);
        } catch (error: any) {
            console.error('Error fetching moods:', error.response?.data || error.message);
            res.status(error.response?.status || 500).json({ 
                message: error.response?.data?.message || "An error occurred while fetching moods." 
            });
        }
    }

    getChannels = async (req: Request, res: Response) => {
        try {
            const tubePilotUrl = process.env.TUBEPILOT_URL || 'https://tubepilot.ai/wp-json/tubepilot/v1';
            const apiKey = process.env.TUBEPILOT_API_KEY;

            const response = await axios.get(
                `${tubePilotUrl}/channels`,
                { headers: { 'X-API-Key': apiKey } }
            );

            res.status(200).json(response.data);
        } catch (error: any) {
            console.error('Error fetching channels:', error.response?.data || error.message);
            res.status(error.response?.status || 500).json({ 
                message: error.response?.data?.message || "An error occurred while fetching channels." 
            });
        }
    }
}







