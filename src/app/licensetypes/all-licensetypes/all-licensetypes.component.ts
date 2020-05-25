import { Component, OnInit } from '@angular/core';
import { Licensetype } from 'src/app/_models/licensetype.model';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2'
import { LicensetypeService } from 'src/app/_services/licensetype.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-all-licensetypes',
  templateUrl: './all-licensetypes.component.html',
  styleUrls: ['./all-licensetypes.component.scss']
})
export class AllLicensetypesComponent implements OnInit {

  licensetypes: Licensetype[] = [];
  loading: boolean = true;
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
    private licensetypeService: LicensetypeService,
    private notifService: NotifService,
    private translate: TranslateService,
    private router: Router) {

      this.translate.get(
        ['SweetAlert.AreYouSure', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
        'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'],
        { data: 'type de permission' })
        .subscribe(val => {
          this.areYouSure = val['SweetAlert.AreYouSure'];
          this.warning = val['SweetAlert.Warning'];
          this.yes = val['SweetAlert.Yes'];
          this.no = val['SweetAlert.No'];
          this.deleted = val['SweetAlert.Deleted'];
          this.deletedMessage = val['SweetAlert.DeletedMessage'];
          this.cancelled = val['SweetAlert.Cancelled'];
          this.cancelledMessage = val['SweetAlert.CancelledMessage'];
        });
   }
  ngOnInit() {
    this.getLicenseTypes();
  }

  computeDescription(description: string): string {
    return (description.length < 100)? description: (description.substr(0,100) + '...');
  }

  getLicenseTypes() {
    this.loading = true;
    this.licensetypeService.all().then(
      response => {
        this.licensetypes = [];
        console.log(response)
        response.map( licensetype => {
          this.licensetypes.push(new Licensetype(licensetype));
        });
      }
    ).catch(
      error => {
        this.notifService.danger(error.error.message)
      }
    ).finally(
      () => {
        this.loading = false;
      }
    )
  }

  editLicensetype(licensetype: Licensetype) {
    this.router.navigate(['/licensetypes/update/'+licensetype.id])
  }

  detailsLicensetype(licensetype: Licensetype) {
    this.router.navigate(['/licensetypes/details/'+licensetype.id])
  }

  deleteLicensetype(licensetype: Licensetype) {
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
        this.licensetypeService.delete(licensetype.id).then(
          data => {
            this.blockUI.stop();
            Swal.fire(
              this.deleted,
              this.deletedMessage,
              'success'
            )
            this.getLicenseTypes();
          }
        ).catch(
          error => {
            console.log(error)
            this.blockUI.stop();
            this.translate.get('Licensetypes.'+error.error.code)
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
