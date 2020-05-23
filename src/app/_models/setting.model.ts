import { Super } from './super.model';

export class Setting extends Super<Setting> {

    public id:number;
    public key: string;
    public value: string;
    public description: string;
}