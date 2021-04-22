import { Document, model, Schema } from 'mongoose';
import { Day } from '@interfaces/calendar/day.typescript';

const daySchema = new Schema({
    date: Date,
    value: Number,
    alternation: String,
});

daySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const dayModel = model<Day & Document>('Day', daySchema);
export default dayModel;
