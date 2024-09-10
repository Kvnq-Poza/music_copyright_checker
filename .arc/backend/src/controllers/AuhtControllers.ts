import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { UserService } from "../services/UserService";
import { AuthService } from "../services/authService";


export class AuthController {
  private authService: AuthService;
  private userService: UserService;

  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
  }

  login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    console.log(email, password)
    try {
      const user = await this.userService.getUserByIdentifier(email);
      if (!user) {
        res.json({ message: "User doesn't exist" })
        return;
      }
      if (!user.is_email_verified) {
        res.json({ message: "Email not verified" })
        return;
      }
      const token = await this.authService.login(email, password);
      
      if (token) {
        res.json({ token });
        return;
      } else {
        res.json({ message: "Invalid credentials" });
        return;
      }
    } catch (error) {
      console.error(error);
      res.json({ message: "Internal server error" });
      return
    }
  };

}