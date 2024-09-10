import { MusicService } from "../services/muiscService";
import { Request, Response } from "express";
import { buildQuery } from '../utils/queryBuilder';
import { AuthRequest } from "../middleware/auth";
import MusicModel, { Music } from "../models/music";
import { YoutubeService } from "../services/YoutubeService";
import { TagService } from "../services/tagService";


function getYouTubeVideoId (url: string): string {
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
 

export class MusicController {
    private musicService: MusicService
    private youtubeService: YoutubeService
    private tagService: TagService
    // write 3 methods for getting all musics by the user, getting a single music by the user, and creating a music

    constructor() {
        this.musicService = new MusicService(),
        this.youtubeService = new YoutubeService(),
        this.tagService = new TagService()

        this.createBulkMusic = this.createBulkMusic.bind(this);
        this.getAllMusicesByUser = this.getAllMusicesByUser.bind(this);
        this.getAllMusics = this.getAllMusics.bind(this);
        this.getMusicById = this.getMusicById.bind(this);
        this.deleteMusics = this.deleteMusics.bind(this);
        this.createMusic = this.createMusic.bind(this);

    }

    async youtubeVideoData(videoId: string){
        const response =  await this.youtubeService.getVideoLicense(videoId.toString())
        return response
    }
    
    async getAllMusicesByUser (req: AuthRequest, res: Response): Promise<void> {
        try{
            const { query, options} = buildQuery(MusicModel, req.query)
        query.user_id = req.user._id

        const musics = await this.musicService.getAllMusicsByUser(query, options)
        res.status(200).json(musics)
        } catch (error) {
            res.status(500).json({ message: error })
        }
            
    }

    // get musics of all users
    async getAllMusics (req: Request, res: Response): Promise<void> {
        try {
            console.log("getting all musics")
            const { query, options } = buildQuery(MusicModel, req.query)
            const musics = await this.musicService.getAllMusics(query, options)
            res.json(musics)
        } catch (error) {
            console.log(error)
            res.json({ message: error })
        }
    }


    async getMusicById (req: AuthRequest, res: Response): Promise<void> {
        try {
            const musicId = req.params.id
            const music = await this.musicService.getMusicById(musicId)

            if (!music) {
                res.status(404).json({ message: "Music not found" })
                return
            }
            if (music.user_id.toString() !== req.user._id) {
                res.status(403).json({ message: "You are not authorized to view this music" })
                return
            }
            res.status(200).json(music)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    async createMusic (req: AuthRequest, res: Response): Promise<void> {
        try {
            console.log("creating music")
            console.log(req.body)
            const musicData = req.body
            musicData.user_id = req.user._id
            musicData.video_id = musicData.videoId

            // check if the video_id already exists in the database
            let music = await this.musicService.getMuiscByUserIdVidId(req.user._id, musicData.video_id)
            if (music) {
                console.log("Music already exists")
                res.status(400).json({ message: "Music already exists" })
                return
            }
            // update the tag count
            const tags = musicData.tags
            if  (tags) {
                try {
                    for (let i = 0; i < tags.length; i++) {
                        await this.tagService.updateTagCount(tags[i])
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            music = await this.musicService.createMusic(musicData)

            res.json(music)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error })
        }
    }

    async createBulkMusic (req: AuthRequest, res: Response): Promise<void> {
        try{
            console.log(req.body)
            let count = 0
            let repeated = []
            // data is list of youtube links
            let data = req.body
            data = data.links
            console.log(data.length)
            for (let i = 0; i < data.length; i++) {
                // get the video id from the youtube link
                if (data[i] != '') {
                    const video_id = getYouTubeVideoId(data[i])
                    const title = await this.youtubeVideoData(video_id).then((videoTitle ) => videoTitle.title)
                    const thumbnail = await this.youtubeVideoData(video_id).then((thumb) => thumb.thumbnail)
                    const tag = await this.youtubeVideoData(video_id).then((tag) => tag.tags)
                    const musicData:any = {
                        video_id: video_id,
                        url: data[i],
                        user_id: 'admin',
                        thumbnail: thumbnail,
                        title: title,
                        tags: tag
                    }
                    console.log(musicData)
                    // check if the video_id already exists in the database
                    const music = await this.musicService.getMusicByVideoId(video_id)
                    if (!music) {
                        count++
                        console.log("creating music")
                        await this.musicService.createMusic(musicData)
                    }
                    else {
                        repeated.push(data[i])
                    }
                } else {
                    console.log("empty link")
                }
                
            }
            res.json({message: 'Music created successfully', num_created: count, repeated: repeated})
        }
        catch(error){
            console.log(error)
            res.status(500).json({message: error}) 
        }
    }

    async deleteMusics (req: AuthRequest, res: Response): Promise<void> {
        try {
            const result = await this.musicService.deleteAll()
            res.json(result)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }


}