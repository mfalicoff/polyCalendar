import { Router } from 'express';
import Route from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import SemesterController from '@controllers/semester.controller';

class SemesterRoute implements Route {
    public path = '/semester';
    public router = Router();
    public semesterController = new SemesterController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/scrapeClasses`, /*authMiddleware,*/ this.semesterController.scrapeClasses);
        this.router.post(`${this.path}/createCalendar`, /*authMiddleware,*/ this.semesterController.createCalendar);
    }
}

export default SemesterRoute;
