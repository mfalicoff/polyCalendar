import mongoose, { Document, model, Schema } from 'mongoose';
import { Day } from '@interfaces/calendar/day.typescript';
import { Week } from '@interfaces/calendar/week.interface';

const weekSchema = new Schema({
    weekDays: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Day',
        },
    ],
});

weekSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const weekModel = model<Week & Document>('Calendar', weekSchema, 'Week');
module.exports = weekModel;
