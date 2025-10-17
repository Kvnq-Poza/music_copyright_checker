import { Schema, model, HydratedDocument } from "mongoose";

export interface Tag {
  _id?: string;
  tagName: string;
  count: number;
}

export type TagDocument = HydratedDocument<Tag>;

const TagSchema = new Schema<Tag>(
  {
    tagName: {
      type: String,
      required: true,
      unique: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false }
);

TagSchema.index({ count: -1 });

const TagModel = model<Tag>("Tag", TagSchema);
export default TagModel;
