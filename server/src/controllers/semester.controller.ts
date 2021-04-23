import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '@interfaces/auth.interface';

class SemesterController{

    public scrapeClasses = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            console.log(req.user, req)
            // const userData: CreateUserDto = req.body;
            // const signUpUserData: User = await this.authService.signup(userData);
            //
            // res.status(201).json({ data: signUpUserData, message: 'signup' });
        } catch (error) {
            next(error);
        }
    };

    public createCalendar = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // const userData: CreateUserDto = req.body;
            // const signUpUserData: User = await this.authService.signup(userData);
            //
            // res.status(201).json({ data: signUpUserData, message: 'signup' });
        } catch (error) {
            next(error);
        }
    };
}

export default SemesterController
