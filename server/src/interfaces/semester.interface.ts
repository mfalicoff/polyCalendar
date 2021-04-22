import { Calendar } from '@interfaces/calendar/calendar.interface';
import { Class } from '@interfaces/class/class.interface';

export interface Semester {
    name: String,
    calendar: Calendar,
    classes: Class[],
}
