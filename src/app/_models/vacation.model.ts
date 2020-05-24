import { Super } from './super.model';

export class Vacation extends Super<Vacation> {

  user_id: number;
  vacation_type_id: number;
  description: string;
  raison: string;
  requested_start_date: Date;
  requested_days: number;
  is_active: boolean;
  accorded_start_date: number;
  accorded_days: Date ;

  file: string;
  status: string;

}
