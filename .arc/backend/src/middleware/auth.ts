import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: any;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token: any = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
        return
    }

    try {
        const secretKey = process.env.SECRET_KEY || 'SECRET_KEY';
        const decoded = jwt.verify(token, secretKey) as any;
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
