import { Calendar } from '@interfaces/calendar/calendar.interface';
import { Class } from '@interfaces/class/class.interface';

export interface Semester {
    _id: String;
    name: String;
    calendar: Calendar;
    classes: Class[];
}
