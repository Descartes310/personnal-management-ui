import { Super } from './super.model';

export class VacationType extends Super<VacationType> {
    public name: string;
    public slug: string;
    public description: string;
    public days: number;
}
