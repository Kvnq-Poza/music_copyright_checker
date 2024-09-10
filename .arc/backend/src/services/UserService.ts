import UserModel, { User } from '../models/user.model';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';


export class UserService {
    constructor() {
    }
    /**
     * Get all users from the database.
     * @returns {Promise<User[]>} A promise that resolves to an array of users.
     */
    async getAllUsers(query:any, options:any): Promise<User[]> {
        // Prepare the filter object based on query parameters
        const result = await UserModel.find(query, null, options);
        return result;
    }

    async getUserById(userId: string): Promise<User | null> {
        return await UserModel.findById(userId);
    }

    async getUserByIdentifier(identifier: string): Promise<User | null> {
        const user = await UserModel.findOne({
            $or: [{ email: identifier }, { username: identifier }],
        });
        if (user) {
            return user;
        }
        return null;
    }

    async createUser(userData: User): Promise<User | null> {
        const user = await UserModel.find({ email: userData.email });
        if (user.length > 0) {
            return null;
        }
        const { password } = userData;
        const saltRounds = 10;

        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return await UserModel.create({ ...userData, password: hashedPassword });
    }

    async updateUser(userId: string, updatedUserData: Partial<User>): Promise<User | null> {
        return await UserModel.findByIdAndUpdate(userId, updatedUserData, { new: true });
    }

    async deleteUser(userId: string): Promise<User | null> {
        return await UserModel.findByIdAndDelete(userId);
    }
    // async saveGoogleTokens(userId: string, tokens: { accessToken: string; refreshToken: string }): Promise<User | null> {
    //     try {
    //         const updatedUser = await UserModel.findByIdAndUpdate(
    //             userId,
    //             { $set: { 'oauth.google': tokens } }
    //         );

    //         if (!updatedUser) {
    //             console.error('User not found or error saving Google tokens.');
    //             return null;
    //         }

    //         return updatedUser;
    //     } catch (error) {
    //         console.error('Error saving Google Tokens:', error);
    //         return null;
    //     }
    // }
}
