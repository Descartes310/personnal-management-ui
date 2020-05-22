import { Component, OnInit } from '@angular/core';
import { NotifService } from 'src/app/_services/notif.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';
import { License } from 'src/app/_models/license.model';
import { LicenseService } from 'src/app/_services/license.service';
import * as Routes from '../../Routes';

@Component({
  selector: 'app-all-licenses',
  templateUrl: './all-licenses.component.html',
  styleUrls: ['./all-licenses.component.scss']
})
export class AllLicensesComponent implements OnInit {

  licenses: License[] = [];
  loading: boolean = true;
  file_existing: boolean = true;
  server:string = Routes.SERVER; 
  @BlockUI() blockUI: NgBlockUI;

  //SweetAlert Text
  areYouSure = '';
  warning = ''
  yes = '';
  no = '';
  deleted = '';
  deletedMessage = '';
  cancelled = '';
  cancelledMessage = '';

  constructor(
    private license_service:LicenseService,
    private notifService: NotifService,
    private translate: TranslateService,
    private router: Router
  ) { 
    this.translate.get(
      ['SweetAlert.AreYouSure', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
      'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'], 
      { data: 'role' })
      .subscribe(val => {
        this.areYouSure = val['SweetAlert.AreYouSure'];
        this.warning = val['SweetAlert.Warning'];
        this.yes = val['SweetAlert.Yes'];
        this.no = val['SweetAlert.No'];
        this.deleted = val['SweetAlert.Deleted'];
        this.deletedMessage = val['SweetAlert.DeletedMessagePro'];
        this.cancelled = val['SweetAlert.Cancelled'];
        this.cancelledMessage = val['SweetAlert.CancelledMessage'];
      });
  }

  ngOnInit() {
    this.getLicenses();
  }

  getLicenses() {
    this.loading = true;
    this.file_existing = false;
    this.license_service.all().then(
      response => {
        console.log(response)
        this.licenses = [];
        this.licenses=response;
        this.licenses.forEach(license => {
          console.log(license['file'])
          if(license['file'] != null ){
            this.file_existing=true;
          }
        });
      }
    ).catch(
      error => {
        console.log(error)
        this.notifService.danger(error.error.message)
      }
    ).finally(
      () => {
        this.loading = false;
      }
    )
  }
  
  editLicenses(license:License) {
    this.router.navigate(['/licenses/update/'+license.id])
  }

  detailsLicenses(license: License) {
    this.router.navigate(['/licenses/details/'+license.id])
  }

  deleteLicenses(license:License) {
    Swal.fire({
      title: this.areYouSure,
      text: this.warning,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.yes,
      cancelButtonText: this.no
    }).then((result) => {
      if (result.value) {
        this.blockUI.start('Loading...');
        this.license_service.delete(license.id).then(
          data => {
            this.blockUI.stop();
            Swal.fire(
              this.deleted,
              this.deletedMessage,
              'success'
            )
            this.getLicenses();
          }
        ).catch(
          error => {
            console.log(error)
            this.blockUI.stop();
            this.translate.get('Role.'+error.error.code)
            .subscribe(val => this.notifService.danger(val));
          }
        )
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          this.cancelled,
          this.cancelledMessage,
          'error'
        )
      }
    })
  }

}