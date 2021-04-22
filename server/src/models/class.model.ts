import mongoose, { Document, model, Schema } from 'mongoose';
import { Class } from '@interfaces/class/class.interface';

mongoose.set('useFindAndModify', false);

const classSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    schedule: {
        type: [],
        required: true,
    },
});

classSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const classModel = model<Class & Document>('Class', classSchema);
export default classModel;
