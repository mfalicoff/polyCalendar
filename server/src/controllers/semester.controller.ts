import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '@interfaces/auth.interface';
import ClassCrawler from '@services/crawler.service';
import { Class } from '@interfaces/class/class.interface';
import ClassService from '@services/class.service';

class SemesterController {
    crawler = new ClassCrawler();
    classService = new ClassService();

    public scrapeClasses = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const allClassesScraped = await this.crawler.getClasses();
            console.log(allClassesScraped);
            const superclasses = await this.saveClasses(allClassesScraped);
            res.status(201).json({ data: superclasses, message: 'scraped classes' });
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

    public getAllClasses = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const allClasses = await this.classService.getAllClasses();
            res.status(200).json({ data: allClasses, message: 'all classes' });
        } catch (error) {
            next(error);
        }
    };

    private saveClasses = async (scrapedClasses: Class[]): Promise<Class[]> => {
        const returnClass: Class[] = [];
        await Promise.all(
            scrapedClasses.map(async singleClass => {
                const savedClass = await this.classService.createClass(singleClass);
                console.log(savedClass);
                returnClass.push(savedClass);
            }),
        );
        return returnClass;
    };
}

export default SemesterController;
