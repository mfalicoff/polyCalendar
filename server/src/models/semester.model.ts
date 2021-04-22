import mongoose, { Document, model, Schema } from 'mongoose';
import { Semester } from '@interfaces/semester.interface';

const semesterSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    calendar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Calendar',
    },

    classes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class',
        },
    ],
});

const semesterModel = model<Semester & Document>('Semester', semesterSchema, 'Semester');
module.exports = semesterModel;
