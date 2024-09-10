import { Schema, Document, model } from "mongoose";

// Interface for a user
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  is_email_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

const UserSchema = new Schema<User>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  is_email_verified: {
    type: Boolean,
    default: true,
  },
  password: {
    type: String,
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  
});

const UserModel = model<User>("User", UserSchema);

export default UserModel;