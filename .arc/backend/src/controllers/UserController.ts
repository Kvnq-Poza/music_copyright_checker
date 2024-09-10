import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { buildQuery } from '../utils/queryBuilder';
import UserModel from '../models/user.model';


export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    getAllUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const { query, options } = buildQuery(UserModel, req.query);
            const users = await this.userService.getAllUsers(query, options);
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    getUserById = async (req: Request, res: Response): Promise<void> => {
        const userId = req.params.id;
        try {
            const user = await this.userService.getUserById(userId);
            if (user) {
                res.json(user);
            } else {
                res.json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    createUser = async (req: Request, res: Response): Promise<void> => {
        const userData = req.body;
        try {
            // check if user already exists
            let user = await this.userService.getUserByIdentifier(userData.email);
            if (user) {
                res.status(409).json({ message: 'User already exists' });
                return;
            }
            user = await this.userService.getUserByIdentifier(userData.username);
            if (user) {
                res.status(409).json({ message: 'User already exists' });
                return;
            }
            
            const newUser = await this.userService.createUser(userData);
            if (!newUser) {
                res.status(400).json({ message: 'User already exists' });
            } else {
                res.status(201).json(newUser);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    updateUser = async (req: Request, res: Response): Promise<void> => {
        const userId = req.params.id;
        const updatedUserData = req.body;

        try {
            const updatedUser = await this.userService.updateUser(userId, updatedUserData);
            if (updatedUser) {
                res.json(updatedUser);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    deleteUser = async (req: Request, res: Response): Promise<void> => {
        const userId = req.params.id;
        try {
            const deletedUser = await this.userService.deleteUser(userId);
            if (deletedUser) {
                res.json(deletedUser);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
