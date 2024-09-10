import { Schema, Document, model } from "mongoose";

export interface Tag extends Document {
    tagName: string;
    count: number;
}

const TagSchema = new Schema<Tag>({
    tagName: {
        type: String,
        required: true,
        unique: true,
    },
    count: {
        type: Number,
        default: 0,
    }
});

TagSchema.index({count: -1});

const TagModel = model<Tag>("Tag", TagSchema);
export default TagModel;