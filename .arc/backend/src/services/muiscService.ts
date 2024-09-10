import MusicModel from "../models/music";
import { Music } from "../models/music";

export class MusicService {
    async getAllMusics(query: any, options: any): Promise<Music[]> {
        // Prepare the filter object based on query parameters
        const result = await MusicModel.find(query, null, options);
        return result;
    }
    async getMusicById(musicId: string): Promise<Music | null> {
        return await MusicModel.findById(musicId);
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
}