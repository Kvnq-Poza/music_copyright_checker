import MusicModel, { Music } from "../models/music";

export class MusicService {
  async getAllMusicsByUser(query: any, options: any): Promise<Music[]> {
    return await MusicModel.find(query, null, options).lean().exec();
  }

  async getAllMusics(query: any, options: any): Promise<Music[]> {
    return await MusicModel.find(query, null, options).lean().exec();
  }

  async getMusicById(musicId: string): Promise<Music | null> {
    try {
      const response = await MusicModel.findById(musicId).lean().exec();
      return response || null;
    } catch (error: any) {
      console.error("Error fetching music by ID:", error.message);
      return null;
    }
  }

  async getMuiscByUserIdVidId(
    userId: string,
    videoId: string
  ): Promise<Music | null> {
    return await MusicModel.findOne({ user_id: userId, video_id: videoId })
      .lean()
      .exec();
  }

  async getMusicByVideoId(videoId: string): Promise<Music | null> {
    return await MusicModel.findOne({ video_id: videoId }).lean().exec();
  }

  async createMusic(musicData: Music): Promise<Music> {
    const created = await MusicModel.create(musicData);
    return created.toObject();
  }

  async updateMusic(
    musicId: string,
    updatedMusicData: Partial<Music>
  ): Promise<Music | null> {
    return await MusicModel.findByIdAndUpdate(musicId, updatedMusicData, {
      new: true,
    })
      .lean()
      .exec();
  }

  async deleteMusic(musicId: string): Promise<Music | null> {
    return await MusicModel.findByIdAndDelete(musicId).lean().exec();
  }

  async deleteAll(): Promise<string> {
    const musics = await MusicModel.find({}).lean().exec();

    for (const music of musics) {
      if (!music.thumbnail || !music.title || !music.tags) {
        console.log("Deleting music:", music);
        await MusicModel.deleteOne({ _id: music._id });
      }
    }

    const response = await MusicModel.deleteMany({
      thumbnail: { $exists: false },
      title: { $exists: false },
      tags: { $exists: false },
    });

    console.log("Deleted musics:", response.deletedCount);
    return "All musics without thumbnail deleted";
  }

  async getLastCheckedMusics(n: number): Promise<Music[]> {
    try {
      return await MusicModel.find({}).sort({ _id: -1 }).limit(n).lean().exec();
    } catch (error: any) {
      console.error("Error fetching last checked musics:", error.message);
      return [];
    }
  }
}
