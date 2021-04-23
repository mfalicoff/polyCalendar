import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '@interfaces/auth.interface';
import ClassCrawler from '@services/crawler.service';

class SemesterController {
    crawler = new ClassCrawler();

    public scrapeClasses = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const test = await this.crawler.getClasses();
            // const userData: CreateUserDto = req.body;
            // const signUpUserData: User = await this.authService.signup(userData);
            //
            res.status(200).json({ data: test, message: 'scraped classes' });
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

export default SemesterController;
