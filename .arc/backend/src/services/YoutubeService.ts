let apiKey = process.env.API_KEY
const BASE_URL = "https://www.googleapis.com/youtube/v3"
import axios from "axios"


export class YoutubeService {
    async getVideos(query: string): Promise<any> {
        const url = `${BASE_URL}/search?part=snippet&type=video&q=${query}&key=${apiKey}`
        console.log(url)
        const response = await axios.get(url)
        return response.data
    }

    async getVideoDetails(videoId: string): Promise<any> {
        const url = `${BASE_URL}/videos?part=snippet&id=${videoId}&key=${apiKey}`
        const response = await axios.get(url)
        return response.data
    }
    async getVideoLicense(videoId: string): Promise<any> {
        const url = `${BASE_URL}/videos?part=contentDetails&id=${videoId}&key=${apiKey}`
        const response = await axios.get(url)
        return response.data
    }
    extractVideoId(url: string): string {
        const videoId = url.split("v=")[1]
        return videoId 
    }
    // async getVideoInfo(video_id:string): Promise <any> {
    //     const url = `${BASE_URL}/videos?`
    // }
}