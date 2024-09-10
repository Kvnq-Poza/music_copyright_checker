import { Schema, Document, model } from "mongoose";


export interface Music extends Document {
    youtube_id: string;
    user_id: string;
    url: string;
}

const MusicSchema = new Schema<Music>({
    youtube_id: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
});

const MusicModel = model<Music>("Music", MusicSchema);
export default MusicModel;