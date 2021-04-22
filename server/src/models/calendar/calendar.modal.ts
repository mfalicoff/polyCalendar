import mongoose, { Document, model, Schema } from 'mongoose';
import { Week } from '@interfaces/calendar/week.interface';

const calendarSchema = new Schema({
    weeks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Week',
        },
    ],
});

calendarSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const calendarModel = model<Week & Document>('Calendar', calendarSchema, 'Calendar');

module.exports = calendarModel;
