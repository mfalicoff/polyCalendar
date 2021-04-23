import { AllSections } from '@interfaces/class/sections.interface';

export interface Class {
    _id?: string;
    name: string;
    schedule: AllSections;
}
