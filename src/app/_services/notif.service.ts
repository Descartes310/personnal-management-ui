import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotifService {

  constructor(
    private toastr: ToastrService
    ) { }

    public success(message: string): void{
        this.toastr.success(message, 'Message');
    }

    public warning(message: string): void{
        this.toastr.warning(message, 'Message');
    }

    public danger(message: string): void{
        this.toastr.error(message, 'Message');
    }

}