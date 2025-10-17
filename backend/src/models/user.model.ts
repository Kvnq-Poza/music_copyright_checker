import { Schema, model, Document, HydratedDocument } from "mongoose";

// Define the plain User type (no Mongoose fields)
export interface User {
  _id?: string;
  username: string;
  email: string;
  password: string;
  is_email_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

// Define the Mongoose-hydrated type
export type UserDocument = HydratedDocument<User>;

const UserSchema = new Schema<User>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    is_email_verified: { type: Boolean, default: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const UserModel = model<User>("User", UserSchema);
export default UserModel;
