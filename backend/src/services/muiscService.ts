import MusicModel from "../models/music";
import { Music } from "../models/music";

export class MusicService {
    async getAllMusicsByUser(query: any, options: any): Promise<Music[]> {
        // Prepare the filter object based on query parameters
        const result = await MusicModel.find(query, null, options);
        return result;
    }
    //  get all musics
    async getAllMusics(query:any, options:any): Promise<Music[]> {
        const result = await MusicModel.find(query, null, options);
        return result;
    }
    async getMusicById(musicId: string): Promise<Music | null> {
        try {
            let response = await MusicModel.findById(musicId);
            // check the length of the response
            if (response === null) {
                return null;
            }
            return response;
        } catch (error:any) {
            console.error("Error fetching music by ID:", error.message);
            return null;
        }
        
    }
    async getMuiscByUserIdVidId(userId: string, videoId: string): Promise<Music | null> {
        return await MusicModel.findOne({ user_id: userId, video_id: videoId });
    }
    async getMusicByVideoId(videoId: string): Promise<Music | null> {
        return await MusicModel.findOne({ video_id: videoId });
    }
    async createMusic(musicData: Music): Promise<Music | null> {
        return await MusicModel.create(musicData);
    }
    async updateMusic(musicId: string, updatedMusicData: Partial<Music>): Promise<Music | null> {
        return await MusicModel.findByIdAndUpdate(musicId, updatedMusicData, { new: true });
    }
    async deleteMusic(musicId: string): Promise<Music | null> {
        return await MusicModel.findById(musicId);
    }
    // delete all without thumbnail
    async deleteAll(): Promise<string> {
        await MusicModel.deleteMany({ thumbnail: { $exists: false } });
        return "All musics without thumbnail deleted";
        
    }

}